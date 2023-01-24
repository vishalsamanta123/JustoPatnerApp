import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import styles from "./Styles";
import Header from "app/components/Header";
import Button from "app/components/Button";

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
          buttonText={"Upload "}
          width={150}
          height={30}
          btnTxtsize={15}
          handleBtnPress={() => {}}
        />
      </View>
    </View>
  );
};

export default ImageUpload;
