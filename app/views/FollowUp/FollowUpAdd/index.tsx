import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import {
  addEditFollowupRemove,
  addFollowUp,
} from "app/Redux/Actions/FollowUpActions";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FollowUpAddView from "./components/FollowUpAdd";

const FollowUpAddScreen = ({ navigation, route }: any) => {
  const followUpId = route?.params || "";
  const [value, setValue] = useState(null);
  const [masterDatas, setMasterDatas] = useState<any>([]);
  const [formData, setFormData] = useState({
    lead_id: followUpId?.lead_id ? followUpId?.lead_id : "",
    appointment_id: followUpId?.appointment_id
      ? followUpId?.appointment_id
      : "",
    followup_status: "",
    next_followup_date: "",
    remark: "",
    followup_time: "",
  });
  const dispatch: any = useDispatch();
  const masterData = useSelector((state: any) => state.masterData) || {};
  const editAddFollowupData =
    useSelector((state: any) => state.editAddFollowup) || {};
  useEffect(() => {
    if (masterData?.response?.status === 200) {
      setMasterDatas(
        masterData?.response?.data?.length > 0 ? masterData?.response?.data : []
      );
    }
  }, [masterData]);

  useEffect(() => {
    dispatch(
      getAllMaster({
        type: 5,
      })
    );
  }, []);
  const handleBackPress = () => {
    navigation.goBack(null);
  };

  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (
      formData.followup_status == undefined ||
      formData.followup_status == ""
    ) {
      isError = false;
      errorMessage =
        "Followup Status is require. Please Choose Followup Status";
    }
    if (formData.followup_status == "6360c6d52ca46e9d3636fbf4") {
      if (
        formData.next_followup_date == undefined ||
        formData.next_followup_date == ""
      ) {
        isError = false;
        errorMessage =
          "Followup Date is require";
      } else if (formData.followup_time == undefined || formData.followup_time == "") {
        isError = false;
        errorMessage =
          "Followup Time is require";
      }
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };
  useEffect(() => {
    if (editAddFollowupData?.response?.status === 200) {
      dispatch(addEditFollowupRemove());
      navigation.goBack(null);
      ErrorMessage({
        msg: editAddFollowupData?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [editAddFollowupData]);
  const handleUpdateStatus = () => {
    if (validation()) {
      dispatch(addFollowUp(formData));
    }
  };
  const handleAllFollowUp = () => {
    navigation.navigate("AllFollowUpScreen", followUpId);
  };
  return (
    <>
      <FollowUpAddView
        value={value}
        setValue={setValue}
        handleBackPress={handleBackPress}
        masterDatas={masterDatas}
        setFormData={setFormData}
        formData={formData}
        handleUpdateStatus={handleUpdateStatus}
        handleAllFollowUp={handleAllFollowUp}
      />
    </>
  );
};
export default FollowUpAddScreen;
