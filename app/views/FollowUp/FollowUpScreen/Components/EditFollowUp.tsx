import { View, Text, StatusBar, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Styles'
import { DATE_FORMAT, GREEN_COLOR, Isios, PRIMARY_THEME_COLOR_DARK, TIME_FORMAT, WHITE_COLOR } from '../../../../components/utilities/constant';
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
import { addEditFollowupRemove, getAllFollowUpDetails, updateFollowUp } from 'app/Redux/Actions/FollowUpActions';
import Loader from 'app/components/CommonScreen/Loader';
import DropdownInput from 'app/components/DropDown';
import { getAllMaster } from 'app/Redux/Actions/MasterActions';
import Styles from '../../../../components/DropDown/styles'
import ErrorMessage from 'app/components/ErrorMessage';

const EditFollowUp = ({ navigation, route }: any) => {
    const followUpId = route?.params || {}
    const insets = useSafeAreaInsets();
    const { response = {}, detail = "" } = useSelector((state: any) => state.followUp)
    const dispatch: any = useDispatch()
    const [formData, setFormData] = useState<any>({})
    const [masterDatas, setMasterDatas] = useState<any>([])
    const masterData = useSelector((state: any) => state.masterData) || {}
    const editAddFollowupData = useSelector((state: any) => state.editAddFollowup) || {}

    useEffect(() => {
        if (masterData?.response?.status === 200) {
            setMasterDatas(masterData?.response?.data?.length > 0 ? masterData?.response?.data : [])
        }
    }, [masterData])

    useFocusEffect(
        React.useCallback(() => {
            if (followUpId?._id) {
                dispatch(getAllFollowUpDetails({ followup_id: followUpId?._id }))
            }
            return () => { };
        }, [navigation, detail]))
    useEffect(() => {
        if (response?.status === 200) {
            if (response?.data?.length > 0) {
                setFormData(response.data[0])
            }
        }
    }, [response])

    const handleMasterDatas = (data: any) => {
        dispatch(getAllMaster({
            type: data
        }))
    }
    useEffect(() => {
        if (editAddFollowupData?.response?.status === 200) {
            dispatch(addEditFollowupRemove())
            navigation.goBack(null)
            ErrorMessage({
                msg: editAddFollowupData?.response?.message,
                backgroundColor: GREEN_COLOR
            })
        }
    }, [editAddFollowupData])
    const handleUpdateStatus = () => {
        if (followUpId?._id) {
            dispatch(updateFollowUp({
                followup_id: followUpId?._id,
                followup_status: formData?.followup_status,
                next_followup_date: formData?.followup_date,
                followup_time: formData?.followup_time,
                remark: formData?.remark,
            }))
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
            <ScrollView 
            keyboardShouldPersistTaps={"handled"}
            automaticallyAdjustKeyboardInsets={Isios ? true : false}
            contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.editInputView}>
                    <View style={styles.inputWarp}>
                        <DropdownInput
                            headingText={'Status'}
                            placeholder={
                                formData?.followup_status_title === '' ||
                                    formData?.followup_status_title === undefined ||
                                    formData?.followup_status_title === null ?
                                    strings.status : formData?.followup_status_title}
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
                                        <View style={Styles.item}>
                                            <Text style={Styles.textItem}>{item.title}</Text>
                                        </View>
                                    </>
                                );
                            }}
                        />
                    </View>
                    {formData?.followup_status === '6360c6d52ca46e9d3636fbf4' ? (
                        <>
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
                                            followup_time: '',
                                            followup_date: moment(data).format(DATE_FORMAT)
                                        })
                                    }}
                                    setDateshow={(data: any) => {
                                        setFormData({
                                            ...formData,
                                            followup_time: '',
                                            followup_date: moment(data).format(DATE_FORMAT)
                                        })
                                    }}
                                    value={
                                        formData?.followup_date === '' ||
                                            formData?.followup_date === undefined ||
                                            formData?.followup_date === null ? "" :
                                            moment(formData?.followup_date).format(DATE_FORMAT)}
                                />
                            </View>
                            <View style={styles.inputWarp}>
                                <InputCalender
                                    headingText={'Time'}
                                    mode={"time"}
                                    dateValue={formData?.next_followup_date}
                                    leftIcon={images.timer}
                                    placeholderText={"Time"}//can edit
                                    editable={false}
                                    // onChangeText={() => { }}
                                    dateData={(data: any) => {
                                        setFormData({
                                            ...formData,
                                            followup_time: data,
                                        })
                                    }}
                                    setDateshow={(data: any) => {
                                        setFormData({
                                            ...formData,
                                            followup_time: data,
                                        })
                                    }}
                                    value={formData?.followup_time}
                                />
                            </View>
                        </>
                    )
                        : null
                    }
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
            </ScrollView>
        </View>
    )
}

export default EditFollowUp