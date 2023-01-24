import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import styles from "./Styles";
import Header from "app/components/Header";
import Button from "app/components/Button";
import PicturePickerModal from "app/components/Modals/PicturePicker";

const ImageUpload = ({ navigation }: any) => {
  const handleBackPress = () => {
    navigation.goBack();
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
      <View style={styles.browseView}>
        <Button
          buttonText={"Browse"}
          width={150}
          height={30}
          btnTxtsize={15}
          handleBtnPress={() => {}}
        />
      </View>
      <View style={styles.uploadImage}></View>
      <View style={styles.uploadButton}>
        <Button
          buttonText={"Upload"}
          width={200}
          height={50}
          btnTxtsize={20}
          handleBtnPress={() => {}}
        />
      </View>
      {/* <PicturePickerModal
            Visible={profileVisible}
            setVisible={setProfileVisible}
            imageData={(data: any) => {
              props.setEditData({
                ...props.editData,
                profile_picture: data,
                local_profile_picture: data,
              });
            }}
          /> */}
    </View>
  );
};

export default ImageUpload;
