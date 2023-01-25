import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./Styles";
import { PRIMARY_THEME_COLOR_DARK } from "../../../../components/utilities/constant";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import Button from "app/components/Button";

const BulkUpload = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleNavigation = (navigateTo: any) => {
    navigation.navigate(navigateTo);
  };
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR_DARK,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={"light-content"} />
      <Header
        handleOnLeftIconPress={handleBackPress}
        leftImageIconStyle={styles.RightFirstIconStyle}
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.bulkupload}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        //   handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      <View style={styles.BulkMainView}>
        <Button
          textTransform = "uppercase"
          buttonText={strings.uploadCSV}
          width={300}
          height={100}
          btnTxtsize={15}
          border={20}
          handleBtnPress={() => handleNavigation("CSVUpload")}
        />
        <View style={styles.butttonMargin}></View>
        <Button
          textTransform = "uppercase"
          buttonText={strings.uploadimage}
          width={300}
          height={100}
          btnTxtsize={15}
          border={20}
          handleBtnPress={() => handleNavigation("ImageUpload")}
        />
        {/* <TouchableOpacity
          style={styles.uploadView}
          onPress={() => handleNavigation("CSVUpload")}
        >
          <Text style={styles.uploadTxt}>{strings.uploadCSV}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.uploadView, { marginTop: normalizeSpacing(50) }]}
          onPress={() => handleNavigation("ImageUpload")}
        >
          <Text style={styles.uploadTxt}>{strings.uploadimage}</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default BulkUpload;
