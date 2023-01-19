import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./Styles";
import strings from "../../../../components/utilities/Localization";
import images from "../../../../assets/images";
import {
  PURPLE_COLOR,
  CALL_COLOR,
  BLACK_COLOR,
} from "../../../../components/utilities/constant";
import moment from "moment";

const VisitorAppointment = (props: any) => {
  const item = props?.items || {};
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visit Date time</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{`${moment(
            item?.appointment_date
          ).format("DD-MM-YYYY")},${item?.appointment_time}`}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Created Date</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.createdDate === "" || !item?.createdDate
              ? strings.notfount
              : `${moment(item?.createdDate).format("DD-MM-YYYY")},${
                  item?.appointment_time
                }`}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Customer Name</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{`${item?.customer_first_name}`}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead No.</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.lead_no}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.pickup}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color:
                  item?.lead_status === 6 || item?.status === 5
                    ? "red"
                    : BLACK_COLOR,
              },
            ]}
          >
            {item?.status == 1
              ? "Pending"
              : item?.status == 2
              ? "Confirm"
              : item?.status == 3
              ? "Complete"
              : item?.status === 5
              ? "Appointment cancel"
              : item?.lead_status === 6 && "Close"}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visiting Score</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.lead_score}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {item?.Status === 1 || item?.Status === 2 ? (
          <TouchableOpacity
            style={[styles.button, { borderColor: PURPLE_COLOR }]}
            onPress={() => props.onPressEdit(item)}
          >
            <Text style={[styles.buttonTxt, { color: PURPLE_COLOR }]}>
              {strings.edit}
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={[styles.button, { borderColor: CALL_COLOR }]}
          onPress={() => {
            Linking?.openURL(`tel:${item?.mobile}`);
          }}
        >
          <Text style={[styles.buttonTxt, { color: CALL_COLOR }]}>
            {strings.call}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Viewbutton}
          onPress={() => props.onPressView(item)}
        >
          <Image source={images.forwardArrow} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VisitorAppointment;
