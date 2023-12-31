import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { BLACK_COLOR, Isios, PRIMARY_THEME_COLOR, WHITE_COLOR } from 'app/components/utilities/constant'
import InputField from 'app/components/InputField'
import DropdownInput from 'app/components/DropDown'
import Button from 'app/components/Button'
import { normalize } from 'app/components/scaleFontSize'
import PicturePickerModal from 'app/components/Modals/PicturePicker'

const AddTicketForm = (props: any) => {
    const [visible, setVisible] = useState(false)
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={props.type === strings.edit ? strings.editticket : strings.addticket}
                handleOnLeftIconPress={props.handleBackPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                leftImageIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <ScrollView
                keyboardShouldPersistTaps={"handled"}
                automaticallyAdjustKeyboardInsets={Isios ? true : false}
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.topItemsVw}>
                    <View style={styles.inputWrap}>
                        <DropdownInput
                            require={true}
                            headingText={strings.issue}
                            placeholder={strings.issue}
                            data={props?.masterData}
                            inputWidth={'100%'}
                            paddingLeft={16}
                            maxHeight={300}
                            labelField="title"
                            valueField={'_id'}
                            value={props?.addTicketData?.reason}
                            onChange={(item: any) => {
                                props.setAddTicketData({
                                    ...props.addTicketData,
                                    reason: item._id,
                                })
                            }}
                            newRenderItem={(item: any) => {
                                return (
                                    <View style={styles.item}>
                                        <Text style={styles.textItem}>{item.title}</Text>
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            require={true}
                            headingText={strings.title}
                            placeholderText={strings.description}
                            handleInputBtnPress={() => { }}
                            onChangeText={(val: any) => {
                                props.setAddTicketData({
                                    ...props.addTicketData,
                                    title: val,
                                })
                            }}
                            valueshow={props.addTicketData.title}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            headingText={strings.description}
                            placeholderText={strings.description}
                            handleInputBtnPress={() => { }}
                            onChangeText={(val: any) => {
                                props.setAddTicketData({
                                    ...props.addTicketData,
                                    remark: val,
                                })
                            }}
                            require={true}
                            multiline={true}
                            inputheight={100}
                            valueshow={props.addTicketData.remark}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.attachView}>
                            <Text style={styles.attachTxt}>{strings.imagecontentHeader}</Text>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={styles.attachbtn}
                                    onPress={() => {
                                        setVisible(true)
                                    }}
                                >
                                    <Text style={{ color: WHITE_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
                                </TouchableOpacity>
                                {props.addTicketData?.image?.uri ? (<Text style={styles.attachTxt1}>{strings.imagecontentHeader + " " + strings.added}</Text>) : null}
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Button
                        buttonText={props.type === strings.edit ? strings.editticket : strings.addticket}
                        handleBtnPress={() => { props.onPressAddTicket() }}
                    />
                </View>
            </ScrollView>
            <PicturePickerModal
                Visible={visible}
                setVisible={setVisible}
                imageData={(data: any) => {
                    setVisible(false)
                    props.setAddTicketData({
                        ...props.addTicketData,
                        image: data,
                    })
                }}
            />
        </View>
    )
}

export default AddTicketForm