import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import styles from "./Styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import {
  PURPLE_COLOR,
  CALL_COLOR,
  DATE_FORMAT,
  RED_COLOR,
  GREEN_COLOR,
  YELLOW_COLOR,
  BLACK_COLOR,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
} from "../../../../components/utilities/constant";
import moment from "moment";
import usePermission from "app/components/utilities/UserPermissions";

const SmAppointment = (props: any) => {
  const getConfirmButton = () => {
    const appointmentdateTime = `${moment.utc(props?.items?.appointment_date).format(DATE_FORMAT)}, ${moment(props?.items?.appointment_time?.toString(), 'hh:mm A').format('HH:mm')}` || ""
    const currentDate = `${moment.utc(new Date).format(DATE_FORMAT)}`
    const getAheadTime = new Date(Date.now() + (3600 * 2000 * 25))
    const getCorrectTime = `${currentDate}, ${moment.utc(getAheadTime).format("HH:mm")}`
    let response = false
    if (appointmentdateTime > getCorrectTime) {
      response = true
    }
    return response
  }

  useEffect(() => {
    getConfirmButton()
  }, [props?.items])
  
  const { status, approve, view } = usePermission({
    view: 'view_appointment_with_sm',
    status: "cancel_status_for_sm_appointment",
    approve: "confirm_status_for_sm_appointment",
  });
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.date}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {moment.utc(props.items.appointment_date).format('DD-MM-YYYY')}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.time}</Text>
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
          <Text style={styles.projectTxt}>{strings.appointmentType}</Text>
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
          <Text style={styles.projectTxt}>{strings.appointmentWith}</Text>
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
          <Text style={styles.projectTxt}>{strings.status}</Text>
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
                  props.items.appointment_status == 1 ||
                    props.items.appointment_status == 4
                    ? RED_COLOR
                    : props.items.appointment_status == 2
                      ? YELLOW_COLOR
                      : props.items.appointment_status == 3
                        ? GREEN_COLOR
                        : BLACK_COLOR,
              },
            ]}
          >
            {props.items.appointment_status == 1
              ? strings.STSPending
              : props.items.appointment_status == 2
                ? strings.STSConfirm
                : props.items.appointment_status == 3
                  ? strings.STSComplete
                  : props.items.appointment_status == 4
                    ? strings.STSAppointMentCancl
                    : strings.notfount}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.buttonContainer,
          {
            justifyContent:
              props.items.appointment_status === 3 ||
                props.items.appointment_status === 4
                ? "flex-end"
                : "space-between",
          },
        ]}
      >
        {status &&
          (props.items?.appointment_status === 3 ||
            props.items?.appointment_status === 4 ? null : (
            <TouchableOpacity
              style={[styles.button, { borderColor: RED_COLOR }]}
              onPress={() => props.handleOptionPress(props.items._id, 4)}
            >
              <Text style={[styles.buttonTxt, { color: RED_COLOR }]}>
                {strings.cancel}
              </Text>
            </TouchableOpacity>
          ))}
        {approve ? (
          props.items?.appointment_status === 1 && getConfirmButton()
            ? (
              <TouchableOpacity
                style={[styles.button, { borderColor: GREEN_COLOR }]}
                onPress={() => props.handleOptionPress(props.items._id, 2)}
              >
                <Text style={[styles.buttonTxt, { color: GREEN_COLOR }]}>
                  {strings.confirm}
                </Text>
              </TouchableOpacity>
            ) : null
        ) : (
          <View />
        )}
        {view &&
          (<TouchableOpacity
            style={styles.Viewbutton}
            onPress={() => props.hanndleUserDetailPress(props.items)}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>)}
      </View>
    </View>
  );
};

export default SmAppointment;
