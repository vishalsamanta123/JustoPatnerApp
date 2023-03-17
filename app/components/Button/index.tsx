import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { normalize, normalizeHeight, normalizeWidth } from "../scaleFontSize";
import {
  FONT_FAMILY_SEMIBOLD,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../utilities/constant";

const Button = (props: any) => {
  const {
    height = 45,
    width = 250,
    bgcolor = PRIMARY_THEME_COLOR,
    border = 50,
    bordercolor = null,
    borderWidth = 0,
    btnTxtcolor = WHITE_COLOR,
    btnTxtsize = 15,
    textTransform = "capitalize",
    rightImage
  } = props;
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={[
          styles.btnTouch,
          {
            height: normalizeHeight(height),
            width: normalizeWidth(width),
            backgroundColor: bgcolor,
            borderRadius: border,
            borderColor: bordercolor,
            borderWidth: borderWidth,
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
          },
        ]}
        onPress={props.handleBtnPress}
      >
        <View>
          <Text
            style={{
              fontSize: normalize(btnTxtsize),
              color: btnTxtcolor,
              fontFamily: FONT_FAMILY_SEMIBOLD,
              textTransform: props.capitalize ? 'none' : 'capitalize',
            }}
          >
            {props.buttonText}
          </Text>
        </View>
        <View style={styles.rightImageView}>
          <Image style={{ tintColor: "#fff", width: 40, height: 40 }} source={rightImage} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
