import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RED_COLOR } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import AddAppointmentItem from './AddAppointmentItem';
import ErrorMessage from 'app/components/ErrorMessage';
import { useSelector } from 'react-redux';

const AddAppointmentView = (props: any) => {
    const insets = useSafeAreaInsets();
    const { response = {} } = useSelector((state: any) => state.appointment)
    useEffect(() => {
        if (props?.type === strings.edit) {
            setAddAppointmentForm({
                ...addAppointmentForm,
                pickup_location: response?.data[0]?.pickup_location,
                number_of_guest: response?.data[0]?.number_of_guest,
                pickup_address: response?.data[0]?.pickup_address,
                lead_name: response?.data[0]?.first_name,
                pickup_latitude: response?.data[0]?.pickup_latitude,
                pickup_longitude: response?.data[0]?.pickup_longitude,
            })
        }
    }, [response])

    const [addAppointmentForm, setAddAppointmentForm] = useState<any>({
        lead_id: props?.data?.lead_id,
        property_id: props?.data?.property_id,
        appointment_date: props?.data?.appointment_date,
        appointment_time: props?.data?.appointment_time,
        type: 1,
        pickup: props?.data?.pickup,
    })
    const validation = () => {
        let isError = true;
        let errorMessage: any = ''
        if (addAppointmentForm.lead_id == undefined || addAppointmentForm.lead_id == '') {
            isError = false;
            errorMessage = "Lead is require. Please Select the lead Status"
        }
        else if (addAppointmentForm.appointment_date == undefined || addAppointmentForm.appointment_date == '') {
            isError = false;
            errorMessage = "Appointment Date is require. Please Select the Appointment Date Status"
        }
        else if (addAppointmentForm.appointment_time == undefined || addAppointmentForm.appointment_time == '') {
            isError = false;
            errorMessage = "Appointment Time is require. Please Select the Appointment Time Status"
        } else if (addAppointmentForm.pickup === strings.yes) {
            if (addAppointmentForm.pickup_location === '' || addAppointmentForm.pickup_location === undefined) {
                isError = false;
                errorMessage = "Pickup Location is require. Please Select the Pickup Location"
            } else if (addAppointmentForm.pickup_address === '' || addAppointmentForm.pickup_address === undefined) {
                isError = false;
                errorMessage = "Pickup Area is require. Please Select the Pickup Area"
            } else if (addAppointmentForm.number_of_guest === '' || addAppointmentForm.number_of_guest === undefined) {
                isError = false;
                errorMessage = "Number Of Guest is require. Please Enter the Number Of Guest"
            }
        }
        if (errorMessage !== '') {
            ErrorMessage({
                msg: errorMessage,
                backgroundColor: RED_COLOR
            })
        }
        return isError;
    }
    const handleBtnPress = () => {
        if (validation()) {
            props.handleAddAppointment(addAppointmentForm)
        }
    }
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={props?.type == strings.edit ? strings.editNewappointment : strings.addNewappointment}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={() => props.handleBackPress()}
                headerStyle={styles.headerStyle}
            />
            <View style={styles.AddAppointmentView}>
                <AddAppointmentItem
                    handleBtnPress={handleBtnPress}
                    setAddAppointmentForm={setAddAppointmentForm}
                    addAppointmentForm={addAppointmentForm}
                    getVisitorsList={props.getVisitorsList}
                    visitorList={props.visitorList}
                    isloading={props.isloading}
                    type={props?.type}
                />
            </View>
        </View>
    )
}

export default AddAppointmentView