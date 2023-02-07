import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { GREEN_COLOR, PRIMARY_THEME_COLOR } from 'app/components/utilities/constant'
import Button from 'app/components/Button'
import InputField from 'app/components/InputField'
import DropdownInput from 'app/components/DropDown'
import { normalizeSpacing } from 'app/components/scaleFontSize'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicket, updateTicketStatus } from 'app/Redux/Actions/SupportActions'
import ErrorMessage from 'app/components/ErrorMessage'

const TicketStatusUpdate = ({ route }: any) => {
    const data = route?.params || {}
    const [statusUpdate, setStatusUpdate] = useState<any>([])
    const navigation: any = useNavigation()
    const dispatch: any = useDispatch()
    const { response = {} } = useSelector((state: any) => state.SupportAdd)

    useEffect(() => {
        if (response?.status === 200) {
            navigation.goBack()
            dispatch(RemoveTicket())
            ErrorMessage({
                msg: response?.message,
                backgroundColor: GREEN_COLOR
            })
        }
    }, [response])


    const handleBackPress = () => {
        navigation.goBack()
    }

    const handleUpdateStaus = () => {
        dispatch(updateTicketStatus({
            ticket_id: data?._id,
            status: statusUpdate?.status,
            remark: statusUpdate?.remark
        }))
    }


    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.ticketStatusUpdate}
                handleOnLeftIconPress={() => handleBackPress()}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                leftImageIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <View style={styles.topItemsVw}>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        require={true}
                        headingText={'Status'}
                        placeholder={'Status'}
                        data={[
                            { value: 1, lable: 'Open' },
                            { value: 2, lable: 'Close' },
                        ]}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        labelField="lable"
                        valueField={'value'}
                        value={statusUpdate?.status}
                        onChange={(item: any) => {
                            setStatusUpdate({
                                ...statusUpdate,
                                status: item.value,
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <View style={styles.item}>
                                    <Text style={styles.textItem}>{item.lable}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        headingText={'Description'}
                        placeholderText={"Description"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(val: any) => {
                            setStatusUpdate({
                                ...statusUpdate,
                                remark: val,
                            })
                        }}
                        multiline={true}
                        inputheight={100}
                        valueshow={statusUpdate.remark}
                    />
                </View>
                <View style={{ marginTop: normalizeSpacing(20) }}>
                    <Button
                        buttonText={strings.updateStatus}
                        handleBtnPress={() => { handleUpdateStaus() }}
                    />
                </View>

            </View>
        </View >
    )
}

export default TicketStatusUpdate