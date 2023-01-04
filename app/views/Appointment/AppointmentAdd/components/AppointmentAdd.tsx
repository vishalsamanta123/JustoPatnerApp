import React from "react";
import { View, Text, Image, FlatList } from 'react-native';
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import { DATE_FORMAT, PRIMARY_THEME_COLOR, TIME_FORMAT } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import Styles from "../../../../components/DropDown/styles";
import InputCalender from "app/components/InputCalender";
import moment from "moment";

const AppointmentAddView = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.appointmnet}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.leftImageIconStyle}
                leftImageIconStyle={styles.leftImageIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <View style={styles.topItemsVw}>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={'Status'}
                        placeholder={strings.status}
                        data={[
                            { label: "Rescheduled", value: "1" },
                            { label: "Confirm", value: "2" },
                            { label: "Appointment cancel", value: "4" },
                        ]}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        labelField="label"
                        valueField={'value'}
                        value={props?.formData?.status}
                        onChange={(item: any) => {
                            props.setFormData({
                                ...props.formData,
                                status: item.value,
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <>
                                    <View style={Styles.item}>
                                        <Text style={Styles.textItem}>{item.label}</Text>
                                    </View>
                                </>
                            );
                        }}
                    />
                </View>
                {props?.formData?.status === "1" ?
                    (
                        <>
                            <View style={styles.inputWrap}>
                                <InputCalender
                                    headingText={'Date'}
                                    mode={'date'}
                                    leftIcon={images.event}
                                    placeholderText={"Date"}//can edit
                                    editable={false}
                                    minimumDate={new Date()}
                                    // onChangeText={() => { }}
                                    dateData={(data: any) => {
                                        props.setFormData({
                                            ...props.formData,
                                            appointment_date: moment(data).format(DATE_FORMAT)
                                        })
                                    }}
                                    setDateshow={(data: any) => {
                                        props.setFormData({
                                            ...props.formData,
                                            appointment_date: moment(data).format(DATE_FORMAT)
                                        })
                                    }}
                                    value={props?.formData?.appointment_date}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <InputCalender
                                    headingText={'Time'}
                                    mode={'time'}
                                    leftIcon={images.timer}
                                    placeholderText={"Time"}//can edit
                                    editable={false}
                                    // onChangeText={() => { }}
                                    dateData={(data: any) => {
                                        props.setFormData({
                                            ...props.formData,
                                            appointment_time: moment(data).format(TIME_FORMAT)
                                        })
                                    }}
                                    setDateshow={(data: any) => {
                                        props.setFormData({
                                            ...props.formData,
                                            appointment_time: moment(data).format(TIME_FORMAT)
                                        })
                                    }}
                                    value={props?.formData?.appointment_time}
                                />
                            </View>
                        </>
                    ) : null}
                <View style={styles.inputWrap}>
                    <InputField
                        headingText={'Description'}
                        placeholderText={"Description"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(val: any) => {
                            props.setFormData({
                                ...props.formData,
                                remark: val,
                            })
                        }}
                        multiline={true}
                        inputheight={100}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <Button
                        width={320}
                        btnTxtsize={18}
                        buttonText={strings.update + " " + strings.appointmnet}
                        handleBtnPress={() => props.handleUpdateStatus()}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <Button
                        width={320}
                        btnTxtsize={18}
                        buttonText={strings.allfollowup}
                        handleBtnPress={() => props.handleAllFollowUp()}
                    />
                </View>
            </View>
        </View>
    )
}
export default AppointmentAddView