import React, { useEffect, useLayoutEffect, useState } from "react";
import AddNewVisitorForm from "./Components/AddNewVisitorForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addVisitor,
  addVisitorRemove,
  addVisitorWithoutProperty,
  checkVisitAvailble,
  CheckVisitAvailRemove,
  editVisitor,
  getVisitorDetail,
} from "app/Redux/Actions/LeadsActions";
import ErrorMessage from "app/components/ErrorMessage";
import {
  GREEN_COLOR,
  RED_COLOR,
  Regexs,
} from "app/components/utilities/constant";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import { getAllAlloctaeProperty } from "app/Redux/Actions/propertyActions";
import { Keyboard } from "react-native";

const AddNewVisitorScreen = ({ navigation, route }: any) => {
  const { type, data } = route?.params || {};
  const dispatch: any = useDispatch();
  const { response = {}, detail = "" } = useSelector((state: any) => state.visitorData);
  const [formData, setFormData] = useState<any>({
    first_name: "",
    adhar_no: "",
    pancard_no: "",
    gender: "",
    birth_date: "",
    mobile: "",
    whatsapp_no: "",
    email: "",
    location: "",
    locality: "",
    configuration_id: "",
    configuration: "",
    expected_possession_date: "",
    min_budget: "",
    min_budget_type: "L",
    max_budget: "",
    max_budget_type: "L",
    funding_type: "",
    funding_emi_type: "",
    purpose: "",
    occupation: "",
    desigantion: "",
    office_address: "",
    module_id: "",
    property_id: "",
    property_type_title: "",
    min_emi_budget: "",
    min_emi_budget_type: "L",
    max_emi_budget: "",
    max_emi_budget_type: "L",
    areain_sqlft: "",
    coumpany_name: "",
    marital_status: "",
    no_of_family_member: "",
    current_stay: "",
    property_type: "",
    preferred_bank: "",
    visit_confirmation_status: ""
  });

  const [masterDatas, setMasterDatas] = useState<any>([]);
  const [NavigationType, setNavigationType] = useState(0);
  const [allProperty, setAllProperty] = useState<any>([]);
  const [visitCheckModal, setVisitCheckModal] = useState<any>(false);
  const [emailMobvalidation, setEmailMobValidation] = useState({
    mobile: null,
  });
  const masterData = useSelector((state: any) => state.masterData) || {};
  const propertyData = useSelector((state: any) => state.propertyData) || {};
  const editData = useSelector((state: any) => state.editVisitorData) || {};
  const addData = useSelector((state: any) => state.addVisitorData) || {};
  const visitAVailableData = useSelector((state: any) => state.checkVisitorData) || {};
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useLayoutEffect(() => {
    if (type === "edit") {
      if (data?._id) {
        dispatch(
          getVisitorDetail({
            lead_id: data._id,
          })
        );
      }
    }
  }, [detail]);

  useLayoutEffect(() => {
    dispatch(
      getAllMaster({
        type: 2,
      })
    );
  }, [navigation]);


  useEffect(() => {
    if (masterData?.response?.status === 200) {
      setMasterDatas(
        masterData?.response?.data?.length > 0 ? masterData?.response?.data : []
      );
    }
  }, [masterData]);
  useEffect(() => {
    if (
      propertyData?.response?.status === 200 &&
      propertyData?.type === "ALLOCATE"
    ) {
      setAllProperty(propertyData?.response?.data);
    } else {
      setAllProperty([]);
    }
  }, [navigation, propertyData]);
  useEffect(() => {
    dispatch(
      getAllAlloctaeProperty({
        offset: 0,
      })
    );
  }, [navigation]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const OnpressseheduleVisit = () => {
    if (validation()) {
      OnpressCreateEdit();
    }
  };

  const validation = () => {
    Keyboard.dismiss()
    if (!isKeyboardVisible) {
      let isError = true;
      let errorMessage: any = "";
      // if (
      //   type != "edit" &&
      //   formData?.property_id === "" &&
      //   formData?.property_type_title === ""
      // ) {
      //   isError = false;
      //   errorMessage = "Please select property name";
      // } else
      if (
        formData?.first_name === "" ||
        formData?.first_name === undefined
      ) {
        isError = false;
        errorMessage = "Please fill visitor name";
      } else if (formData?.mobile === "" || formData?.mobile === undefined) {
        isError = false;
        errorMessage = "Please fill mobile number";
      } else if (formData?.mobile?.length < 10) {
        isError = false;
        errorMessage = "Please fill 10 digit mobile number";
      } else if (type === "add" || type === "propertySelect" && formData?.visit_confirmation_status === "") {
        isError = false;
        errorMessage = "Please check entered mobile number";
      } else if (formData?.adhar_no) {
        if (Regexs.AadharRegex.test(formData?.adhar_no) === false) {
          isError = false;
          errorMessage = "Please enter valid Aadhaar number";
        }
      }
      if (formData?.pancard_no) {
        if (Regexs.panRegex.test(formData?.pancard_no) === false) {
          isError = false;
          errorMessage = "Please enter valid Pancard number";
        }
      }
      if (formData?.email) {
        if (Regexs.emailRegex.test(formData?.email) === false) {
          isError = false;
          errorMessage = "Please enter valid Email id";
        }
      }
      if (formData?.min_budget === "" && formData?.max_budget !== "") {
        isError = false;
        errorMessage = "Please enter minimum budget also";
      } else if (formData?.min_budget || formData.max_budget) {
        let tempMinVal: any;
        formData?.min_budget_type === "K"
          ? (tempMinVal = formData?.min_budget * 1000)
          : formData?.min_budget_type === "L"
            ? (tempMinVal = formData?.min_budget * 100000)
            : formData?.min_budget_type === "Cr"
              ? (tempMinVal = formData?.min_budget * 10000000)
              : null;

        let tempMaxVal: any;
        formData?.max_budget_type === "K"
          ? (tempMaxVal = formData?.max_budget * 1000)
          : formData?.max_budget_type === "L"
            ? (tempMaxVal = formData?.max_budget * 100000)
            : formData?.max_budget_type === "Cr"
              ? (tempMaxVal = formData?.max_budget * 10000000)
              : null;
        if (tempMinVal >= tempMaxVal) {
          isError = false;
          errorMessage = "Maximum budget should more than minimum budget";
        }
      } if (formData?.min_emi_budget === "" && formData?.max_emi_budget !== "") {
        isError = false;
        errorMessage = "Please enter minimum emi also";
      } else if (formData?.min_emi_budget || formData.max_emi_budget) {
        let tempMinVal: any;
        formData?.min_emi_budget_type === "K"
          ? (tempMinVal = formData?.min_emi_budget * 1000)
          : formData?.min_emi_budget_type === "L"
            ? (tempMinVal = formData?.min_emi_budget * 100000)
            : formData?.min_emi_budget_type === "Cr"
              ? (tempMinVal = formData?.min_emi_budget * 10000000)
              : null;

        let tempMaxVal: any;
        formData?.max_emi_budget_type === "K"
          ? (tempMaxVal = formData?.max_emi_budget * 1000)
          : formData?.max_emi_budget_type === "L"
            ? (tempMaxVal = formData?.max_emi_budget * 100000)
            : formData?.max_emi_budget_type === "Cr"
              ? (tempMaxVal = formData?.max_emi_budget * 10000000)
              : null;
        if (tempMinVal >= tempMaxVal) {
          isError = false;
          errorMessage = "Maximum Emi should more than minimum Emi";
        }
      }
      if (errorMessage !== "") {
        ErrorMessage({
          msg: errorMessage,
          backgroundColor: RED_COLOR,
        });
      }
      return isError;
    }
  };

  useEffect(() => {
    if (editData?.update || addData?.create) {
      dispatch(addVisitorRemove());
      if (NavigationType === 1) {
        setNavigationType(0);
        navigation.navigate("LeadManagement");
      } else if (NavigationType === 2) {
        setNavigationType(0);
        navigation.navigate("AddAppointmentScreen", {
          type: "Add",
          data: {
            _id: addData?.response?.data?._id
              ? addData?.response?.data?._id
              : "",
            customer_first_name: addData?.response?.data?.customer?.first_name
              ? addData?.response?.data?.customer?.first_name
              : "",
            property_id: addData?.response?.data?.property_id
              ? addData?.response?.data?.property_id
              : "",
            property_title: data?.property_title ? data?.property_title : "",
            pickup: data?.pickup ? data?.pickup : formData?.pickup,
          },
        });
      }
      ErrorMessage({
        msg: editData?.update
          ? editData?.response?.message
          : addData?.create
            ? addData?.response?.message
            : "no message",
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [editData, addData]);
  useEffect(() => {
    if (visitAVailableData?.response?.status === 200 ||
      visitAVailableData?.response?.status === 201 ||
      visitAVailableData?.response?.status === 202) {
      dispatch(CheckVisitAvailRemove());
      if (visitAVailableData?.response?.status === 200) {
        switch (visitAVailableData?.check_type) {
          case 'mobile':
            setEmailMobValidation({
              ...emailMobvalidation,
              mobile: visitAVailableData?.check_type,
            })
            setFormData({
              ...formData,
              visit_confirmation_status: 1,
            })
            break;
        }
      } else {
        setVisitCheckModal(true)
      }
    }
  }, [visitAVailableData]);
  const handleCheckEmailMobile = () => {
    const params = { mobile: formData?.mobile }
    dispatch(checkVisitAvailble(params));
  };
  const OnpressCreateEdit = () => {
    Keyboard.dismiss()

    if (validation()) {
      if (type === "edit") {
        const edit_params = {
          lead_id: formData?.lead_id,
          first_name: formData?.first_name,
          email: formData?.email,
          mobile: formData?.mobile,
          gender: formData?.gender,
          birth_date: formData?.birth_date,
          address: formData?.address,
          location: formData?.location,
          latitude: formData?.latitude,
          longitude: formData?.longitude,
          city: formData?.city,
          occupation: formData?.occupation,
          coumpany_name: formData?.coumpany_name,
          desigantion: formData?.desigantion,
          office_address: formData?.office_address,
          configuration_id: formData?.configuration_id,
          configuration: formData?.configuration,
          areain_sqlft: formData?.areain_sqlft,
          income: formData?.income,
          budget: formData?.max_budget
            ? formData?.max_budget
            : formData?.budget && "",
          funding_type: formData?.funding_type,
          purpose: formData?.purpose,
          whenby: formData?.whenby,
          agent_code: formData?.agent_code, //not in add time
          adhar_no: formData?.adhar_no,
          pancard_no: formData?.pancard_no,
          whatsapp_no: formData?.whatsapp_no,
          funding_emi_type: formData?.funding_emi_type,
          min_budget: formData?.min_budget,
          min_budget_type: formData?.min_budget_type,
          max_budget: formData?.max_budget,
          max_budget_type: formData?.max_budget_type,
          expected_possession_date: formData?.expected_possession_date,
          property_id: formData?.property_id,
          property_type_title: "",
          min_emi_budget: formData?.min_emi_budget
            ? formData.min_emi_budget
            : "",
          min_emi_budget_type: formData?.min_emi_budget_type
            ? formData?.min_emi_budget_type
            : "",
          max_emi_budget: formData?.max_emi_budget
            ? formData?.max_emi_budget
            : "",
          max_emi_budget_type: formData?.max_emi_budget_type
            ? formData?.max_emi_budget_type
            : "",
          locality: formData?.locality,
          marital_status: formData?.marital_status,
          no_of_family_member: formData?.no_of_family_member,
          current_stay: formData?.current_stay,
          property_type: formData?.property_type,
          preferred_bank: formData?.preferred_bank,
          // visit_confirmation_status: formData?.visit_confirmation_status,
        };
        dispatch(editVisitor(edit_params));
      } else {
        const add_params = {
          module_id: "",
          first_name: formData?.first_name,
          email: formData?.email,
          mobile: formData?.mobile,
          gender: formData?.gender,
          birth_date: formData?.birth_date,
          address: formData.location,
          location: formData?.location,
          latitude: "",
          longitude: "",
          city: formData?.location,
          occupation: formData?.occupation,
          coumpany_name: formData?.coumpany_name,
          desigantion: formData?.desigantion,
          office_address: formData?.office_address,
          configuration_id: formData?.configuration_id,
          configuration: formData?.configuration,
          areain_sqlft: formData?.areain_sqlft,
          budget: formData.max_budget,
          funding_type: formData?.funding_type,
          purpose: formData?.purpose,
          adhar_no: formData?.adhar_no,
          pancard_no: formData?.pancard_no,
          whatsapp_no: formData?.whatsapp_no,
          funding_emi_type: "",
          min_budget: formData?.min_budget,
          min_budget_type: formData?.min_budget_type,
          max_budget: formData?.max_budget,
          max_budget_type: formData?.max_budget_type,
          expected_possession_date: formData?.expected_possession_date,
          property_id: formData?.property_id,
          property_type_title: formData.property_type_title,
          min_emi_budget: formData?.min_emi_budget
            ? formData?.min_emi_budget
            : "",
          min_emi_budget_type: formData?.min_emi_budget_type
            ? formData?.min_emi_budget_type
            : "",
          max_emi_budget: formData?.max_emi_budget
            ? formData?.max_emi_budget
            : "",
          max_emi_budget_type: formData?.max_emi_budget_type
            ? formData?.max_emi_budget_type
            : "",
          locality: formData?.locality,
          marital_status: formData?.marital_status,
          no_of_family_member: formData?.no_of_family_member,
          current_stay: formData?.current_stay,
          property_type: formData?.property_type,
          preferred_bank: formData?.preferred_bank,
          visit_confirmation_status: formData?.visit_confirmation_status
        };
        if (formData?.property_id !== '') {
          dispatch(addVisitor(add_params));
        } else {
          dispatch(addVisitorWithoutProperty(add_params));
        }
      }
    }
  };

  return (
    <AddNewVisitorForm
      handleBackPress={handleBackPress}
      OnpressseheduleVisit={OnpressseheduleVisit}
      OnpressCreateEdit={OnpressCreateEdit}
      type={type}
      data={data}
      formData={formData}
      setFormData={setFormData}
      // handleMasterDatas={handleMasterDatas}
      masterDatas={masterDatas}
      // handleProperty={handleProperty}
      allProperty={allProperty}
      setNavigationType={setNavigationType}
      handleCheckEmailMobile={handleCheckEmailMobile}
      emailMobvalidation={emailMobvalidation}
      setEmailMobValidation={setEmailMobValidation}
      visitCheckModal={visitCheckModal}
      setVisitCheckModal={setVisitCheckModal}
    />
  );
};

export default AddNewVisitorScreen;
