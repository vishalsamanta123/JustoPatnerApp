import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, RED_COLOR } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import AddAppointmentItem from './AddAppointmentItem';
import { useNavigation } from '@react-navigation/native';
import Loader from 'app/components/CommonScreen/Loader';
import ErrorMessage from 'app/components/ErrorMessage';
import { useSelector } from 'react-redux';

const AddAppointmentView = (props: any) => {
    const insets = useSafeAreaInsets();
    const navigation: any = useNavigation()
    const [value, setValue] = useState(null)
    const [gender, setGender] = useState("Male");
    const [checked, setChecked] = React.useState("first");
    const {response={}} = useSelector((state: any) => state.appointment)
    console.log('response: ', response?.data?.pickup_location);
    useEffect(() => {
setAddAppointmentForm({
    ...addAppointmentForm, 
    pickup_location: response?.data?.pickup_location,number_of_guest: response?.data?.number_of_guest
    
})
    }, [response])
    
    const [addAppointmentForm, setAddAppointmentForm] = useState<any>({
        lead_id: props?.data?.lead_id,
        property_id: props?.data?.property_id,
        appointment_date: props?.data?.appointment_date,
        appointment_time: props?.data?.appointment_time,
        type: 1,
        pickup: props?.data?.pickup,
    })
    console.log('addAppointmentForm: ', addAppointmentForm);
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
        // navigation.navigate('AppointmentScreen')
    }
    return (
        <View style={styles.mainContainer}>
            {props.isloading ? <Loader /> : null}
            <View
                style={{
                    backgroundColor: PRIMARY_THEME_COLOR_DARK,
                    height: insets.top,
                }}
            />
            <StatusBar backgroundColor={PRIMARY_THEME_COLOR} barStyle={"light-content"} />
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
                    setValue={setValue}
                    value={value}
                    setChecked={setChecked}
                    checked={checked}
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