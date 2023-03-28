import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import styles from "./Styles";
import Header from "app/components/Header";
import Button from "app/components/Button";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, UploadImageRemove } from "app/Redux/Actions/LeadsActions";
import DropdownInput from "app/components/DropDown";
import Styles from "../../../../components/Modals/styles";
import { getAllAlloctaeProperty } from "app/Redux/Actions/propertyActions";
import ErrorMessage from "app/components/ErrorMessage";
import {
  GREEN_COLOR,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
} from "app/components/utilities/constant";
import { normalize } from "app/components/scaleFontSize";
import { useFocusEffect } from "@react-navigation/native";

const ImageUpload = ({ navigation }: any) => {
  const { response = {}, list = "" } =
    useSelector((state: any) => state.uploadVisitorDetailImageData) || {};
  const propertyData = useSelector((state: any) => state.propertyData) || {};
  const dispatch: any = useDispatch();

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [allProperty, setAllProperty] = useState<any>([]);
  const [formData, setFormData] = useState<any>({
    property_id: "",
    property_type_title: "",
    property_title: "",
    document: "",
  });

  const [imageData, setImageData] = useState("");
  useEffect(() => {
    if (propertyData?.response?.status === 200) {
      setAllProperty(propertyData?.response?.data);
    } else {
      setAllProperty([]);
    }
  }, [navigation, propertyData]);
  useEffect(() => {
    if (response?.status === 200) {
      dispatch(
        UploadImageRemove()
      );
      ErrorMessage({
        msg: response?.message,
        backgroundColor: GREEN_COLOR,
      });
      navigation.goBack()
    }
  }, [response]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getAllAlloctaeProperty({
          offset: 0,
        })
      );
      return () => { };
    }, [navigation])
  );

  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (formData?.property_id === "" && formData?.property_type_title === "") {
      isError = false;
      errorMessage = strings.propertyReqVal;
    } else
      if (formData?.document === "" || formData?.document === null) {
        isError = false;
        errorMessage = strings.imageSelectReqVal;
      }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleBrowsePress = () => {
    setIsPickerVisible(true);
  };
  const handleUploadPress = () => {
    if (validation()) {
      const paramFormData = new FormData();
      paramFormData.append("document", formData?.document);
      paramFormData.append("property_id", formData?.property_id);
      dispatch(uploadImage(paramFormData));
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        handleOnLeftIconPress={handleBackPress}
        leftImageIconStyle={styles.RightFirstIconStyle}
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.uploadimage}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
      //   handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      {/* <TouchableOpacity style={styles.browseView} onPress={() => {}}>
        <Text style={styles.uploadTxt}>{strings.uploadimage}</Text>
      </TouchableOpacity> */}
      <View style={[styles.inputWrap]}>
        <DropdownInput
          // require={true}
          headingText={strings.propertyHeader}
          placeholder={
            formData?.property_title ? formData?.property_title : strings.propertyHeader
          }
          data={allProperty}
          inputWidth={"100%"}
          require={true}
          paddingLeft={16}
          maxHeight={300}
          labelField="property_title"
          valueField={"_id"}
          value={formData?.property_id}
          onChange={(item: any) => {
            setFormData({
              ...formData,
              property_id: item.property_id,
              property_type_title: item.property_type,
              property_title: item.property_title,
            });
          }}
          newRenderItem={(item: any) => {
            return (
              <>
                <View style={Styles.item}>
                  <Text style={Styles.textItem}>{item.property_title}</Text>
                </View>
              </>
            );
          }}
        />
      </View>
      <View style={styles.browseView}>
        <View
          style={[
            styles.AttachViewWrap,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.notFoundText}>{strings.uploadimage}</Text>
            <Image source={images.star} style={styles.attachView} />
          </View>
          <View>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                handleBrowsePress();
              }}
            >
              <Text
                style={{
                  color: PRIMARY_THEME_COLOR,
                  fontSize: normalize(15),
                }}
              >
                {strings.browse}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
      {imageData === "" ? (
        <View style={styles.notFoundView}>
          <Text style={styles.notFoundText}>{strings.browseToUploadMsg}</Text>
        </View>
      ) : (
        <View style={styles.uploadImage}>
          <Image source={{ uri: imageData }} style={styles.image} />
        </View>
      )}
      <View style={styles.uploadButton}>
        <Button
          buttonText={strings.upload}
          width={200}
          height={50}
          btnTxtsize={20}
          handleBtnPress={() => handleUploadPress()}
        />
      </View>
      <PicturePickerModal
        Visible={isPickerVisible}
        setVisible={setIsPickerVisible}
        imageData={(data: any) => {
          setImageData(data?.uri);
          setFormData({
            ...formData,
            document: data,
          });
        }}
      />
    </View>
  );
};

export default ImageUpload;
