import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './Styles'
import Styles from '../../../../components/DropDown/styles'
import InputField from '../../../../components/InputField'
import DropdownInput from '../../../../components/DropDown'
import strings from '../../../../components/utilities/Localization'
import images from '../../../../assets/images'
import { RadioButton } from 'react-native-paper'
import { PRIMARY_THEME_COLOR, BLACK_COLOR, DATE_FORMAT, TIME_FORMAT } from '../../../../components/utilities/constant'
import Button from '../../../../components/Button'
import InputCalender from 'app/components/InputCalender'
import moment from 'moment'

const AddAppointmentItem = (props: any) => {
    return (
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={styles.wrap}>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={strings.selectLead}
                        placeholder={strings.selectLead}
                        data={props.visitorList}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        onFocus={() => props.getVisitorsList()}
                        labelField="first_name"
                        valueField={'_id'}
                        value={props.addAppointmentForm?.lead_name}
                        onChange={(item: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                lead_id: item._id, property_id: item.property_id, lead_name: item.first_name
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <View style={Styles.item}>
                                    <Text style={Styles.textItem}>{item.first_name}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                {/* <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={strings.selectproperty}
                        placeholder={strings.selectproperty}
                        data={[]}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        // onFocus={() => handleMasterDatas()}
                        labelField="title"
                        valueField={'_id'}
                        // value={formData?.sourcing_manager}
                        onChange={(item: any) => {
                            props.setFormData({
                                ...props.formData,
                                sourcing_manager: item._id,
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <>
                                    {props.isloading === false &&
                                        <View style={Styles.item}>
                                            <Text style={Styles.textItem}>{item.user_name}</Text>
                                        </View>
                                    }
                                </>
                            );
                        }}
                    />
                </View> */}
                <View style={styles.inputWrap}>
                    <InputCalender
                        mode={'date'}
                        leftIcon={images.event}
                        placeholderText={strings.appointmentDate}
                        headingText={strings.appointmentDate}
                        editable={false}
                        // onChangeText={() => { }}
                        dateData={(data: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                appointment_date: moment(data).format(DATE_FORMAT)
                            })
                        }}
                        setDateshow={(data: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                appointment_date: moment(data).format(DATE_FORMAT)
                            })
                        }}
                        value={moment(props.addAppointmentForm?.appointment_date).format(DATE_FORMAT)}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputCalender
                        mode={'time'}
                        leftIcon={images.timer}
                        placeholderText={strings.appointmentTime}
                        headingText={strings.appointmentTime}
                        editable={false}
                        // onChangeText={() => { }}
                        dateData={(data: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                appointment_time: moment(data).format(TIME_FORMAT)
                            })
                        }}
                        setDateshow={(data: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                appointment_time: moment(data).format(TIME_FORMAT)
                            })
                        }}
                        value={props.addAppointmentForm?.appointment_time}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <Text style={styles.genderTxt}>{strings.pickupAppointment}</Text>
                </View>
                <View style={styles.genderView}>
                    <View style={styles.radioView}>
                        <RadioButton
                            value={strings.yes}
                            status={props.addAppointmentForm?.pickup === strings.yes ? "checked" : "unchecked"}
                            onPress={() => {
                                props.setAddAppointmentForm({
                                    ...props.addAppointmentForm,
                                    pickup: strings.yes
                                })
                            }}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text
                            style={[
                                styles.radioTxt,
                                {
                                    color:
                                        props.addAppointmentForm?.pickup === strings.yes ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                },
                            ]}
                        >
                            {strings.yes}
                        </Text>
                    </View>
                    <View style={styles.radioView}>
                        <RadioButton
                            value={strings.no}
                            status={props.addAppointmentForm?.pickup === strings.no ? "checked" : "unchecked"}
                            onPress={() => {
                                props.setAddAppointmentForm({
                                    ...props.addAppointmentForm,
                                    pickup: strings.no
                                })
                            }}
                            color={PRIMARY_THEME_COLOR}
                        />
                        <Text
                            style={[
                                styles.radioTxt,
                                {
                                    color:
                                        props.addAppointmentForm?.pickup === strings.no ? PRIMARY_THEME_COLOR : BLACK_COLOR,
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
                        headingText={strings.location}
                        valueshow={props.addAppointmentForm?.pickup_location}
                        inputType={'location'}
                        onPressSelect={(data: any, detail: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                pickup_location: data?.description,
                            })
                        }}
                        onChangeText={(data: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                pickup_location: data?.description,
                            })
                        }}

                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        placeholderText={strings.noofguest}
                        handleInputBtnPress={() => { }}
                        headingText={strings.noofguest}
                        valueshow={props.addAppointmentForm?.number_of_guest}
                        onChangeText={(val: any) => {
                            props.setAddAppointmentForm({
                                ...props.addAppointmentForm,
                                number_of_guest: val
                            })
                        }}
                    />
                </View>
                <View style={styles.btnView}>
                    <Button
                        handleBtnPress={() => props.handleBtnPress()}
                        buttonText={props.type == strings.edit ? strings.editNewappointment : strings.addNewappointment}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default AddAppointmentItem