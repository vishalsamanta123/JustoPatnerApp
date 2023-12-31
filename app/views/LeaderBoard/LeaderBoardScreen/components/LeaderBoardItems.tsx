import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./styles";
import images from "../../../../assets/images";
import {
  normalizeHeight,
  normalizeWidth,
} from "../../../../components/scaleFontSize";
import usePermission from "app/components/utilities/UserPermissions";
import strings from "app/components/utilities/Localization";

const LeaderBoardItems = (props: any) => {
  const { view } = usePermission({
    view: 'view_leader_Board',
  })
  const item = props?.items || {};
  return (
    <View style={styles.IteamView}>
      <Image
        source={{ uri: `${item?.base_url}${item?.property_image}` }}
        resizeMode={'contain'}
        style={{ width: normalizeWidth(100), height: normalizeHeight(100) }}
      />
      <View style={styles.Txtview}>
        <View>
          <Text style={styles.projectTxt}>{item?.property_title}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.columnVw}>
              <Text style={styles.nameTxt}>{strings.totalFlat}</Text>
              <Text style={styles.txtStyle}>
                {props?.items?.total_inventry}
              </Text>
            </View>
            <View style={styles.columnVw}>
              <Text style={styles.nameTxt}>{strings.soldOut}</Text>
              <Text style={styles.txtStyle}>
                {props?.items?.total_sold_out}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {view &&
        (<View style={{ position: "absolute", bottom: 0, right: 0 }}>
          <TouchableOpacity style={styles.Viewbutton} onPress={props.onPressView}>
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>)
      }
    </View>
  );
};

export default LeaderBoardItems;
