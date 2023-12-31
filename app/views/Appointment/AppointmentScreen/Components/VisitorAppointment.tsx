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
  console.log("🚀 ~ file: VisitorAppointment.tsx:23 ~ VisitorAppointment ~ props?.items?.appointment_date:", props?.items?.appointment_date)

  const currentDate = `${moment.utc(new Date).format(DATE_FORMAT)}, ${new Date().getHours()}:${new Date().getMinutes()}`
  const appointmentdateTime = `${moment.utc(props?.items?.appointment_date).format(DATE_FORMAT)}, ${moment(props?.items?.appointment_time?.toString(), 'hh:mm A').format('HH:mm')}` || ""
  const { edit, view } = usePermission({
    edit: 'edit_appointment',
    view: 'view_appointment',
  })
  const item = props?.items || {};
  const checkinStaus = props?.items?.checkin_status?.length > 0 ? props?.items?.checkin_status[0] : ''
  const bookingStatus = props?.items?.booking_status?.length > 0 ? props?.items?.booking_status[0] : ''
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.visit + " " + strings.dateTime}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{`${moment.utc(
            item?.appointment_date
          ).format('DD-MM-YYYY')}, ${item?.appointment_time}`}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.createdDate}</Text>
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
          <Text style={styles.projectTxt}>{strings.customer + " " + strings.name}</Text>
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
          <Text style={styles.projectTxt}>{strings.propertyHeader + " " + strings.name}</Text>
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
          <Text style={styles.projectTxt}>{strings.leadNo}</Text>
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
          <Text style={styles.projectTxt}>{strings.pickup}</Text>
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
              ? currentDate >= appointmentdateTime ? strings.STSNotVisited : strings.STSUpComing
              : item?.status === 2
                ? strings.STSReVisit
                : item?.status === 4
                  ? strings.STSVisitCancelled
                  : item?.status === 5 ? strings.STSRescheduled
                    : item?.status === 6 ? strings.STSNotFitForSale :
                      item?.status === 3 ?
                        bookingStatus === 1 ? strings.STSReadyToBook : strings.STSBooking :
                        strings.STSCompleted

            }
          </Text>
        </View>
      </View>
      {checkinStaus === true &&
        (<View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.checkinstatus}</Text>
          </View>
          <View><Text>:</Text></View>
          <View style={styles.nameContainer}>
            <Text style={[styles.nameTxt, { color: checkinStaus === true ? GREEN_COLOR : BLACK_COLOR }]}>{checkinStaus === true ? 'Visited' : strings.notfount}</Text>
          </View>
        </View>)}
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.visitStatus}</Text>
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
        {edit ? (item?.status === 1 || item?.status === 2 && checkinStaus !== true) ? (
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
