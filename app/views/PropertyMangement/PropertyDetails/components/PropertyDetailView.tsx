import { View, } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../../../components/Header";
import {
  BLACK_COLOR,
  GRAY_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import PropertyDetailItem from "./PropertyDetailItem";
import { useNavigation } from "@react-navigation/native";
import Button from "../../../../components/Button";
import ConfirmModal from "../../../../components/Modals/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import usePermission from "app/components/utilities/UserPermissions";

const PropertyDetailView = (props: any) => {
  const dispatch: any = useDispatch();
  const { approveStatus, setApproveStatus, resion, setResion } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [propertydetail, setPropertydetail] = useState<any>([]);
  const [configurations, setConfigurations] = useState<any>([]);
  const [propertydocument, setPropertydocument] = useState<any>([]);
  const [masterDataShow, setMasterDataShow] = useState([]);

  const [amenity, setAmenity] = useState<any>([]);
  // const [approveStatus, setApproveStatus] = useState(1)
  const propertyData =
    useSelector((state: any) => state.propertydetailData) || [];

  const masterData = useSelector((state: any) => state.masterData) || {};

  //const propertydetail = propertyData?.response?.data[0];
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();
  const { response, loading } = propertyData;
  const onPressCreatevisit = () => {
    navigation.navigate("AddNewVisitorScreen", {
      type: "propertySelect",
      data: propertydetail,
    });
  };

  useEffect(() => {
    if (response && response?.status === 200) {
      if (response?.data?.length > 0) {
        setPropertydetail(response?.data[0] ? response?.data[0] : []);
        setConfigurations(response?.data[0]?.configuration_area || []);
        setAmenity(response?.data[0]?.amenity || []);
        setPropertydocument(response?.data[0]?.property_document || []);
        setApproveStatus(props.data.approve_status);
      }
    } else {
      setPropertydetail([]);
      //errorToast(response.message);
    }
  }, [propertyData]);

  useEffect(() => {
    if (masterData?.response) {
      const { response } = masterData;
      if (response?.status === 200) {
        setMasterDataShow(response?.data);
      } else {
        setMasterDataShow([]);
        //errorToast(response.message);
      }
    }
  }, [masterData]);

  const confirmStatus = () => {
    if (approveStatus === 2) {
      dispatch(
        getAllMaster({
          type: 7,
        })
      );
    }
    setIsVisible(true);
    // setApproveStatus(approveStatus)
    // props.setCurrentProperty(propertydetail?.property_id)
  };

  const DATA: any = {
    /*   Projectname: propertydetail?.property_title,
      Location: propertydetail?.location,
      visitor: propertydetail?.total_visitor,
      siteVisit: propertydetail?.site_visit,
      closeVisit: propertydetail?.close_visit,
      status: (propertydetail?.status) ? 'Active' : 'Inactive',
      createddate: propertydetail?.start_date,
      propertyType: propertydetail?.property_type_title,
      startDate: propertydetail?.start_date,
      EndDate: propertydetail?.end_date, */
    //lead: "12/11/2022",
    //configuration: propertydetail?.property_configurations,
    //amenity: "Sawimming Pool",
    pickup: "yes",
  };

  const onpresContent = (name: any, items: any) => {
    navigation.navigate(name, items);
  };
  const { create, status } = usePermission({
    create: 'add_visitor',
    status: 'property_status_update'
  })
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.propertyDetailHeader}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
      />
      <View style={styles.propertyListView}>
        <PropertyDetailItem
          // items={Object.keys(propertydetail).length === 0 ? propertydetail : {}}
          items={propertydetail}
          onpresContent={onpresContent}
          configurations={configurations}
          amenity={amenity}
          propertydocument={propertydocument}
        />
      </View>
      <View
        style={[
          styles.btnContainer,
          {
            justifyContent:
              approveStatus !== 1 &&
                approveStatus !== 3 &&
                propertydetail?.property_active_status
                ? "space-between"
                : "center",
          },
        ]}
      >
        {status ?
          propertydetail?.property_active_status ||
            typeof propertydetail?.property_active_status === "undefined" ? (
            <Button
              handleBtnPress={() => confirmStatus()}
              buttonText={
                approveStatus === 1
                  ? strings.accept
                  : approveStatus === 2
                    ? strings.unsubscribe
                    : strings.subscribe
              }
              width={150}
              height={45}
              bgcolor={""}
              bordercolor={
                approveStatus === 1
                  ? BLACK_COLOR
                  : approveStatus === 2
                    ? RED_COLOR
                    : YELLOW_COLOR
              }
              borderWidth={1.5}
              btnTxtcolor={
                approveStatus === 1
                  ? BLACK_COLOR
                  : approveStatus === 2
                    ? RED_COLOR
                    : YELLOW_COLOR
              }
              btnTxtsize={15}
              textTransform={"uppercase"}
            />
          ) : null : null
          // (<Button
          //   handleBtnPress={() => {
          //     dispatch(statusUpdate({
          //       property_id: props?.data?.property_id,
          //       approve_status: 3,
          //       resion_id: '',
          //     }))
          //   }}
          //   buttonText={strings.deactive}
          //   width={150}
          //   height={45}
          //   bgcolor={""}
          //   bordercolor={'red'}
          //   borderWidth={1.5}
          //   btnTxtcolor={'red'}
          //   btnTxtsize={15}
          //   textTransform={"uppercase"}
          // />
          // )
        }

        {create ? propertydetail?.property_active_status &&
          approveStatus !== 1 &&
          approveStatus !== 3 ? (
          <Button
            handleBtnPress={() => onPressCreatevisit()}
            buttonText={strings.createVisit}
            width={150}
            height={45}
            bordercolor={GRAY_COLOR}
            borderWidth={1}
            // btnTxtcolor={PRIMARY_THEME_COLOR}
            btnTxtsize={15}
            textTransform={"uppercase"}
          />
        ) : null : null}
      </View>

      {/* <ConfirmModal Visible={isVisible} setIsVisible={setIsVisible} /> */}
      <ConfirmModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        handleNoPress={() => {
          //props.setChangeStatus({ _id: '', status: false })
          setIsVisible(false);
        }}
        handleYesPress={() => {
          setIsVisible(false);
          props.handleStatusChange();
        }}
        handleConfirmPress={() => {
          setIsVisible(false);
          props.handleStatusChange();
        }}
        setResion={setResion}
        resion={resion}
        masterDataShow={masterDataShow}
        stringshow={strings.confirmation}
        textshow={strings.activconfirmation + " " + strings.propertyHeader}
        confirmtype={approveStatus === 2 ? "" : "CONFIRMATION"}
      />
    </View>
  );
};

export default PropertyDetailView;
