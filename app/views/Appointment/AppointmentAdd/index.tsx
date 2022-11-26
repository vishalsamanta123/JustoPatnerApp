import ErrorMessage from "app/components/ErrorMessage";
import { RED_COLOR } from "app/components/utilities/constant";
import { addFollowUp } from "app/Redux/Actions/FollowUpActions";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentAddView from "./components/AppointmentAdd";

const AppointmentAddScreen = ({ navigation, route }: any) => {
    const followUpId = route?.params || ''
    const [value, setValue] = useState(null)
    const [isloading, setIsloading] = useState(false)
    const [masterDatas, setMasterDatas] = useState<any>([])
    const [formData, setFormData] = useState({
        lead_id: followUpId?.lead_id ? followUpId?.lead_id : '',
        appointment_id: followUpId?.appointment_id ? followUpId?.appointment_id : '',
        followup_status: '',
        next_followup_date: '',
        remark: '',
        followup_time: ''
    })
    console.log('formData: ', formData);
    const dispatch: any = useDispatch()
    const masterData = useSelector((state: any) => state.masterData) || {}

    useEffect(() => {
        if (masterData?.response?.status === 200) {
            setIsloading(false)
            setMasterDatas(masterData?.response?.data?.length > 0 ? masterData?.response?.data : [])
        }
    }, [masterData])


    const handleMasterDatas = (data: any) => {
        setIsloading(true)
        dispatch(getAllMaster({
            type: data
        }))
    }
    const handleBackPress = () => {
        navigation.goBack(null)
    }

    const validation = () => {
        let isError = true;
        let errorMessage: any = ''
        if (formData.followup_status == undefined || formData.followup_status == '') {
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
            dispatch(addFollowUp(formData))
            navigation.goBack(null)
        }
    }
    const handleAllFollowUp = () => {
        navigation.navigate('AllFollowUpScreen', followUpId)
    }
    return (
        <>
            <AppointmentAddView
                value={value}
                setValue={setValue}
                handleBackPress={handleBackPress}
                masterDatas={masterDatas}
                handleMasterDatas={handleMasterDatas}
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