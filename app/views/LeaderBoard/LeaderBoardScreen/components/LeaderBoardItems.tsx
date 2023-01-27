import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./styles";
import images from "../../../../assets/images";
import {
  normalizeHeight,
  normalizeWidth,
} from "../../../../components/scaleFontSize";

const LeaderBoardItems = (props: any) => {
  const item = props?.items || {};
  console.log("item: ", item);
  console.log(
    "item?.base_url + item?.property_image: ",
    item?.base_url + item?.property_image
  );
  return (
    <View style={styles.IteamView}>
      <Image
        source={{ uri: item?.base_url + item?.property_image }}
        resizeMode={"contain"}
        style={{ width: normalizeWidth(100), height: normalizeHeight(100) }}
      />
      <View style={styles.Txtview}>
        <View>
          <Text style={styles.projectTxt}>{item?.property_title}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.columnVw}>
              <Text style={styles.nameTxt}>TOTAL FLAT</Text>
              <Text style={styles.txtStyle}>
                {props?.items?.total_inventry}
              </Text>
            </View>
            <View style={styles.columnVw}>
              <Text style={styles.nameTxt}>SOLD OUT</Text>
              <Text style={styles.txtStyle}>
                {props?.items?.total_sold_out}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 0, right: 0 }}>
        <TouchableOpacity style={styles.Viewbutton} onPress={props.onPressView}>
          <Image source={images.forwardArrow} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LeaderBoardItems;
