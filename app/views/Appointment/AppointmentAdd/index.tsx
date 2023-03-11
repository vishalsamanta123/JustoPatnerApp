import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import { addEditAppointmntRemove, editAppointment } from "app/Redux/Actions/AppointmentActions";
import { addFollowUp } from "app/Redux/Actions/FollowUpActions";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentAddView from "./components/AppointmentAdd";
import strings from "app/components/utilities/Localization";

const AppointmentAddScreen = ({ navigation, route }: any) => {
    const appointmentId = route?.params || {}
    const [value, setValue] = useState(null)
    const [isloading, setIsloading] = useState(false)
    const editAddAppointmentData = useSelector((state: any) => state.editAddAppointment)
    const [formData, setFormData] = useState({
        appointment_id: appointmentId?._id ? appointmentId?._id : '',
        status: '',
        appointment_date: appointmentId?.appointment_date ? appointmentId?.appointment_date : '',
        appointment_time: appointmentId?.appointment_time ? appointmentId?.appointment_time :  '',
        remark: '',
        visit_status: strings.warm
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
        else if (formData?.status === "1") {
            if (formData.appointment_date == undefined || formData.appointment_date == '') {
                isError = false;
                errorMessage = "Date is require. Please Choose Date"
            }
            else if (formData.appointment_time == undefined || formData.appointment_time == '') {
                isError = false;
                errorMessage = "Time is require. Please Choose Time"
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
    useEffect(() => {
        if (editAddAppointmentData?.response?.status === 200) {
            navigation.goBack(null)
            dispatch(addEditAppointmntRemove())
            ErrorMessage({
                msg: editAddAppointmentData?.response?.message,
                backgroundColor: GREEN_COLOR
            })
        }
    }, [editAddAppointmentData])
    const handleUpdateStatus = () => {
        if (validation()) {
            dispatch(editAppointment(formData))
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