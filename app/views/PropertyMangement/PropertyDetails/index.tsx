import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import PropertyDetailView from "./components/PropertyDetailView";
import { useDispatch, useSelector } from "react-redux";
import {
  getPropertyDetail,
  removeStatus,
  statusUpdate,
} from "app/Redux/Actions/propertyActions";

const PropertyDetails = ({ navigation, route }: any) => {
  const [isloading, setIsloading] = useState(false);
  const dispatch: any = useDispatch();
  const [approveStatus, setApproveStatus] = useState(1);
  const [resion, setResion] = useState("");
  const statusUpdateData =
    useSelector((state: any) => state.removePropertyStatus) || [];
  const data = route?.params || {};

  useLayoutEffect(() => {
    setIsloading(true);
    dispatch(
      getPropertyDetail({
        property_id: data.property_id ? data.property_id : "",
      })
    );
  }, []);
  useEffect(() => {
    if (statusUpdateData?.response?.status === 200) {
      dispatch(removeStatus());
      setApproveStatus(approveStatus === 1 ? 2 : approveStatus === 2 ? 3 : 2);
    }
  }, [statusUpdateData]);
  const handleStatusChange = () => {
    dispatch(
      statusUpdate({
        property_id: data.property_id ? data.property_id : "",
        approve_status: approveStatus === 1 ? 2 : approveStatus === 2 ? 3 : 2,
        resion_id: resion,
      })
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <>
      <PropertyDetailView
        data={data}
        handleBackPress={handleBackPress}
        setIsloading={setIsloading}
        approveStatus={approveStatus}
        setApproveStatus={setApproveStatus}
        handleStatusChange={handleStatusChange}
        resion={resion}
        setResion={setResion}
      />
    </>
  );
};

export default PropertyDetails;
