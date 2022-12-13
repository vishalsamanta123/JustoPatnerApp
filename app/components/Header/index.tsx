import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React from "react";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PRIMARY_THEME_COLOR } from "../utilities/constant";

const Header = (props: any) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={"light-content"} backgroundColor={props.statusBarColor ? props.statusBarColor : PRIMARY_THEME_COLOR} />
      <View style={[styles.maincontainer, props.headerStyle]}>
        <View style={styles.leftView}>
          <TouchableOpacity onPress={() => props.handleOnLeftIconPress()}>
            <Image
              source={props.leftImageSrc}
              style={[styles.imageStyle, props.leftImageIconStyle]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextView}>
          <Text style={[styles.headerText, props.headerTextStyle]}>
            {props.headerText}
          </Text>
        </View>
        <View style={styles.rightIconsWrap}>
          <TouchableOpacity onPress={props.handleOnRightFirstIconPress}>
            <Image
              source={props.rightFirstImageScr}
              style={[styles.imageStyle, props.RightFirstIconStyle]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.handleOnRightSecondIconPress}>
            <Image
              source={props.rightSecondImageScr}
              style={[styles.imageStyle, props.RightSecondIconStyle]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Header;
