import { View, Text, StatusBar, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Styles'
import { DATE_FORMAT, PRIMARY_THEME_COLOR_DARK, TIME_FORMAT, WHITE_COLOR } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InputField from '../../../../components/InputField';
import Button from '../../../../components/Button';
import InputCalender from 'app/components/InputCalender';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFollowUpDetails, updateFollowUp } from 'app/Redux/Actions/FollowUpActions';
import Loader from 'app/components/CommonScreen/Loader';
import DropdownInput from 'app/components/DropDown';
import { getAllMaster } from 'app/Redux/Actions/MasterActions';
import Styles from '../../../../components/DropDown/styles'

const EditFollowUp = ({ navigation, route }: any) => {
    const followUpId = route?.params || ''
    const [isloading, setIsloading] = useState(false)
    const { response = {}, detail = "" } = useSelector((state: any) => state.followUp)

    const dispatch: any = useDispatch()
    const insets = useSafeAreaInsets();
    const [formData, setFormData] = useState<any>({
    })
    const [masterDatas, setMasterDatas] = useState<any>([])
    const masterData = useSelector((state: any) => state.masterData) || {}

    useEffect(() => {
        if (masterData?.response?.status === 200) {
            setIsloading(false)
            setMasterDatas(masterData?.response?.data?.length > 0 ? masterData?.response?.data : [])
        }
    }, [masterData])

    useFocusEffect(
        React.useCallback(() => {
            if (followUpId?._id) {
                setIsloading(true)
                dispatch(getAllFollowUpDetails({ followup_id: followUpId?._id }))
                toGetDatas()
                setFormData(response.data)
            }
            return () => { };
        }, [navigation, detail]))

    const toGetDatas = () => {
        if (response?.status) {
            setIsloading(false)
            setFormData(response.data)
        }
    }

    const handleMasterDatas = (data: any) => {
        setIsloading(true)
        dispatch(getAllMaster({
            type: data
        }))
    }
    const handleUpdateStatus = () => {
        if (followUpId?._id) {
            dispatch(updateFollowUp({
                followup_id: followUpId?._id,
                followup_status: formData?.followup_status,
                next_followup_date: formData?.next_followup_date,
                followup_time: formData?.followup_time,
                remark: formData?.remark,
            }))
            navigation.goBack(null)
        }
    }
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.editfollowup}
                handleOnLeftIconPress={() => navigation.goBack()}
                leftImageIconStyle={styles.RightFirstIconStyle}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
            />
            <View style={styles.editInputView}>
                <View style={styles.inputWarp}>
                    <DropdownInput
                        headingText={'Status'}
                        placeholder={strings.status}
                        data={masterDatas}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        onFocus={() => handleMasterDatas(5)}
                        labelField="title"
                        valueField={'_id'}
                        value={formData?.followup_status}
                        onChange={(item: any) => {
                            setFormData({
                                ...formData,
                                followup_status: item._id,
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <>
                                    {isloading === false &&
                                        <View style={Styles.item}>
                                            <Text style={Styles.textItem}>{item.title}</Text>
                                        </View>
                                    }
                                </>
                            );
                        }}
                    />
                </View>
                <View style={styles.inputWarp}>
                    <InputCalender
                        headingText={'Date'}
                        mode={'date'}
                        leftIcon={images.event}
                        placeholderText={"Date"}//can edit
                        editable={false}
                        // onChangeText={() => { }}
                        dateData={(data: any) => {
                            setFormData({
                                ...formData,
                                next_followup_date: moment(data).format(DATE_FORMAT)
                            })
                        }}
                        setDateshow={(data: any) => {
                            setFormData({
                                ...formData,
                                next_followup_date: moment(data).format(DATE_FORMAT)
                            })
                        }}
                        value={formData?.next_followup_date}
                    />
                </View>
                <View style={styles.inputWarp}>
                    <InputCalender
                        headingText={'Time'}
                        mode={'time'}
                        leftIcon={images.timer}
                        placeholderText={"Time"}//can edit
                        editable={false}
                        // onChangeText={() => { }}
                        dateData={(data: any) => {
                            setFormData({
                                ...formData,
                                followup_time: moment(data).format(TIME_FORMAT)
                            })
                        }}
                        setDateshow={(data: any) => {
                            setFormData({
                                ...formData,
                                followup_time: moment(data).format(TIME_FORMAT)
                            })
                        }}
                        value={formData?.followup_time}
                    />
                </View>
                <View style={styles.inputWarp}>
                    <InputField
                        placeholderText={"Description"}
                        handleInputBtnPress={() => { }}
                        headingText={"Description"}
                        multiline={true}
                        inputheight={200}
                        valueshow={formData?.remark}
                        onChangeText={(val: any) => {
                            setFormData({
                                ...formData, remark: val
                            })
                        }}
                    />
                </View>
            </View>
            <View style={styles.editBtnContainer}>
                <Button
                    buttonText={strings.update}
                    width={250}
                    bgcolor={PRIMARY_THEME_COLOR_DARK}
                    btnTxtcolor={WHITE_COLOR}
                    btnTxtsize={18}
                    textTransform={"uppercase"}
                    handleBtnPress={() => handleUpdateStatus()}
                />
            </View>
        </View>
    )
}

export default EditFollowUp