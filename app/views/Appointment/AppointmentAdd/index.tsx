import ErrorMessage from "app/components/ErrorMessage";
import { RED_COLOR } from "app/components/utilities/constant";
import { editAppointment } from "app/Redux/Actions/AppointmentActions";
import { addFollowUp } from "app/Redux/Actions/FollowUpActions";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentAddView from "./components/AppointmentAdd";

const AppointmentAddScreen = ({ navigation, route }: any) => {
    const appointmentId = route?.params || ''
    const [value, setValue] = useState(null)
    const [isloading, setIsloading] = useState(false)
    const [formData, setFormData] = useState({
        appointment_id: appointmentId?._id ? appointmentId?._id : '',
        status: '',
        appointment_date: '',
        appointment_time: '',
        remark: ''
    })
    const dispatch: any = useDispatch()
   
    const handleBackPress = () => {
        navigation.goBack(null)
    }

    const validation = () => {
        let isError = true;
        let errorMessage: any = ''
        if (formData.status == undefined || formData.status == '') {
            isError = false;
            errorMessage = "Followup Status is require. Please Choose Followup Status"
        }

        if (errorMessage !== '') {
            ErrorMessage({
                msg: errorMessage,
                backgroundColor: RED_COLOR
            })
        }
        return isError;
    }

    const handleUpdateStatus = () => {
        if (validation()) {
            dispatch(editAppointment(formData))
            navigation.goBack(null)
        }
    }
    const handleAllFollowUp = () => {
        navigation.navigate('AllFollowUpScreen', appointmentId)
    }
    return (
        <>
            <AppointmentAddView
                value={value}
                setValue={setValue}
                handleBackPress={handleBackPress}
                isloading={isloading}
                setFormData={setFormData}
                formData={formData}
                handleUpdateStatus={handleUpdateStatus}
                handleAllFollowUp={handleAllFollowUp}
            />
        </>
    )
}
export default AppointmentAddScreen