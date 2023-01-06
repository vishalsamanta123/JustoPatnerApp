import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./Styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import {
  PURPLE_COLOR,
  CALL_COLOR,
  DATE_FORMAT,
  RED_COLOR,
  GREEN_COLOR,
} from "../../../../components/utilities/constant";
import moment from "moment";

const SmAppointment = (props: any) => {
  console.log("props: SmAppointment", props);
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Date</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {moment(props.items.appointment_date).format(DATE_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment Type</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.appointment_type_title}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Time</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.appointment_time}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment With</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.sender_name}</Text>
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
          <Text style={styles.nameTxt}>
            {props.items.appointment_status == 1
              ? "Pending"
              : props.items.appointment_status == 2
              ? "Confirm"
              : props.items.appointment_status == 3
              ? "Complete"
              : "Appointment cancel"}
          </Text>
        </View>
      </View>
      <View style={[styles.buttonContainer, {
            justifyContent:
              props.items.appointment_status === 3 ||
              props.items.appointment_status === 4 
                ? "flex-end"
                : "space-between",
          },]}>
        {props.items?.appointment_status === 3 ||
        props.items?.appointment_status === 4 ? null : (
          <TouchableOpacity
            style={[styles.button, { borderColor: RED_COLOR }]}
            onPress={() => props.handleOptionPress(props.items._id, 4)}
          >
            <Text style={[styles.buttonTxt, { color: RED_COLOR }]}>
              {strings.cancel}
            </Text>
          </TouchableOpacity>
        )}
        {props.items?.appointment_status === 1 ? (
          <TouchableOpacity
            style={[styles.button, { borderColor: GREEN_COLOR }]}
            onPress={() => props.handleOptionPress(props.items._id, 2)}
          >
            <Text style={[styles.buttonTxt, { color: GREEN_COLOR }]}>
              {strings.confirm}
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.Viewbutton}
          onPress={() => props.hanndleUserDetailPress(props.items)}
        >
          <Image source={images.forwardArrow} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SmAppointment;
