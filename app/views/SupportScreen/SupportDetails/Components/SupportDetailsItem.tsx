import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import strings from "app/components/utilities/Localization";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import FastImages from "app/components/FastImage";
import Modal from "react-native-modal";
import { normalizeHeight } from "app/components/scaleFontSize";

const SupportDetailsItem = (props: any) => {
  const [isVisable, setIsVisable] = useState(false);
  return (
    <ScrollView>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>Ticket No. </Text>
          <Text style={styles.topTxt}>
            {props.item.ticket_number
              ? props.item.ticket_number
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Title </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.item.title ? props.item.title : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.createBy} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.item.user_name ? props.item.user_name : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Issue </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.item.reason_title
              ? props.item.reason_title
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color: props.item.status === 1 ? GREEN_COLOR : RED_COLOR,
              },
            ]}
          >
            {props.item.status === 1
              ? "Open"
              : props.item.status === 2 && "Close"}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Description </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.item.remark === "undefined" || props?.item.remark === "" ? strings.notfount : props.item.remark}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Image </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        {props?.item.image === "undefined" || props?.item.image === "" ? (
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{strings.notfount}</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsVisable(true);
            }}
            style={[styles.nameContainer, { marginLeft: 10 }]}
          >
            <Image
              source={{ uri: props?.item?.base_url + props?.item?.image }}
              resizeMode={"contain"}
              style={styles.Img}
            />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        isVisible={isVisable}
        onBackdropPress={() => setIsVisable(false)}
        onBackButtonPress={() => setIsVisable(false)}
      >
        <View>
          <FastImages
            source={{ uri: props?.item?.base_url + props?.item?.image }}
            style={{
              width: "100%",
              height: normalizeHeight(300),
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SupportDetailsItem;
