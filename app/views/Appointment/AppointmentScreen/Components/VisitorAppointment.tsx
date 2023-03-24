import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./Styles";
import strings from "../../../../components/utilities/Localization";
import images from "../../../../assets/images";
import {
  PURPLE_COLOR,
  CALL_COLOR,
  BLACK_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
  GREEN_COLOR,
  DATE_TIME_FORMAT,
  DATE_FORMAT,
} from "../../../../components/utilities/constant";
import moment from "moment";
import usePermission from "app/components/utilities/UserPermissions";

const VisitorAppointment = (props: any) => {
  const currentDate = `${moment(new Date).format(DATE_FORMAT)}, ${new Date().getHours()}:${new Date().getMinutes()}`
  const appointmentdateTime = `${moment(props?.items?.appointment_date).format(DATE_FORMAT)}, ${moment(props?.items?.appointment_time?.toString(), 'hh:mm A').format('HH:mm')}` || ""
  const { edit, view } = usePermission({
    edit: 'edit_appointment',
    view: 'view_appointment',
  })
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
          ).format('DD-MM-YYYY')}, ${item?.appointment_time}`}</Text>
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
              : `${moment(item?.createdDate).format(DATE_TIME_FORMAT)}`}
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
      <View style={[styles.Txtview, {
        alignItems: 'flex-start'
      }]}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property Name</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{`${item?.property_title}`}</Text>
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
          <Text style={styles.nameTxt}>{item?.lead_no ? item?.lead_no : strings.notfount}</Text>
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
          <Text style={styles.nameTxt}>{item?.pickup ? item?.pickup : strings.notfount}</Text>
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
                  item?.status === 1 ||
                    item?.status === 4 ||
                    item?.status === 5 || item?.status === 6
                    ? RED_COLOR
                    : item?.status === 2
                      ? GREEN_COLOR
                      : item?.status === 3
                        ? GREEN_COLOR
                        : BLACK_COLOR
              },
            ]}
          >
            {item?.status === 1
              ? currentDate >= appointmentdateTime ? 'Not Visited' : "Upcoming"
              : item?.status === 2
                ? "Completed"
                : item?.status === 3
                  ? "Completed"
                  : item?.status === 4
                    ? "Visit Cancelled"
                    : item?.status === 5 ? "Visit Cancelled"
                      : item?.status === 6 && "Not Fit for Sale"

            }
          </Text>
        </View>
      </View>
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visit Status</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt,
          {
            color: item?.visit_status === strings.hot ? GREEN_COLOR
              : item?.visit_status === strings.warm ? YELLOW_COLOR
                : item?.visit_status === strings.warm ? RED_COLOR : BLACK_COLOR
          }]}>{item?.visit_status ? item?.visit_status : strings.notfount}</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.visitorScore}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.lead_score}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {edit ? item?.status === 1 || item?.status === 2 ? (
          <TouchableOpacity
            style={[styles.button, { borderColor: PURPLE_COLOR }]}
            onPress={() => props.onPressEdit(item)}
          >
            <Text style={[styles.buttonTxt, { color: PURPLE_COLOR }]}>
              {strings.edit}
            </Text>
          </TouchableOpacity>
        ) : null : null}
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
        {view &&
          (<TouchableOpacity
            style={styles.Viewbutton}
            onPress={() => props.onPressView(item)}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>)
        }
      </View>
    </View>
  );
};

export default VisitorAppointment;
