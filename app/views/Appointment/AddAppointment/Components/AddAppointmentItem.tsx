import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './Styles'
import InputField from '../../../../components/InputField'
import DropdownInput from '../../../../components/DropDown'
import strings from '../../../../components/utilities/Localization'
import images from '../../../../assets/images'
import { RadioButton } from 'react-native-paper'
import { PRIMARY_THEME_COLOR, BLACK_COLOR } from '../../../../components/utilities/constant'
import Button from '../../../../components/Button'

const AddAppointmentItem = (props: any) => {
    return (
        <ScrollView>
            <View style={styles.wrap}>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={strings.selectLead}
                        placeholder={strings.selectLead}
                        value={props.value}
                        setValue={props.setValue}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={strings.selectproperty}
                        placeholder={strings.selectproperty}
                        value={props.value}
                        setValue={props.setValue}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={strings.appointmentDate}
                        handleInputBtnPress={() => { }}
                        onChangeText={() => { }}
                        headingText={strings.appointmentDate}
                        rightImgSrc={images.event}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={strings.appointmentTime}
                        handleInputBtnPress={() => { }}
                        onChangeText={() => { }}
                        headingText={strings.appointmentTime}
                        rightImgSrc={images.timer}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <Text style={styles.genderTxt}>{strings.pickupAppointment}</Text>
                </View>
                <View style={styles.genderView}>
                    <View style={styles.radioView}>
                        <RadioButton
                            value="first"
                            status={props.checked === "first" ? "checked" : "unchecked"}
                            onPress={() => props.setChecked("first")}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text
                            style={[
                                styles.radioTxt,
                                {
                                    color:
                                        props.checked === "first" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                },
                            ]}
                        >
                            {strings.yes}
                        </Text>
                    </View>
                    <View style={styles.radioView}>
                        <RadioButton
                            value="second"
                            status={props.checked === "second" ? "checked" : "unchecked"}
                            onPress={() => props.setChecked("second")}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text
                            style={[
                                styles.radioTxt,
                                {
                                    color:
                                        props.checked === "second" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                },
                            ]}
                        >
                            {strings.no}
                        </Text>
                    </View>
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={strings.location}
                        handleInputBtnPress={() => { }}
                        onChangeText={() => { }}
                        headingText={strings.location}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={strings.noofguest}
                        handleInputBtnPress={() => { }}
                        onChangeText={() => { }}
                        headingText={strings.noofguest}
                    />
                </View>
                <View style={styles.btnView}>
                    <Button handleBtnPress={() => props.handleBtnPress()}  buttonText={strings.addNewappointment} />
                </View>
            </View>
        </ScrollView>
    )
}

export default AddAppointmentItem