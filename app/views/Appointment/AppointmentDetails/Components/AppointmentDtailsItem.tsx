import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import styles from "./Styles";
import images from "../../../../assets/images";
import moment from "moment";
import strings from "app/components/utilities/Localization";
import {
  BLACK_COLOR,
  DATE_FORMAT,
  GREEN_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from "app/components/utilities/constant";

const AppointmentDtailsItem = (props: any) => {
  const currentDate = `${moment(new Date).format(DATE_FORMAT)}, ${new Date().getHours()}:${new Date().getMinutes()}`
  const appointmentdateTime = `${moment(props?.item?.appointment_date).format(DATE_FORMAT)}, ${moment(props?.item?.appointment_time?.toString(), 'hh:mm A').format('HH:mm')}` || ""
  const bookingStatus = props?.item?.booking_status?.length > 0 ? props?.item?.booking_status[0] : ''
  return (
    <ScrollView>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>{strings.visitorScore} </Text>
          <Text style={styles.topTxt}>{props?.item?.lead_score}</Text>
        </View>
        <Image source={{ uri: `${props?.item?.qr_code}` }} style={styles.qrImg} />
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.visitor + " " + strings.name}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.item?.customer_first_name === "" ||
              props?.item?.customer_first_name === undefined ||
              props?.item?.customer_first_name === null
              ? strings.notfount
              : props?.item?.customer_first_name}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.budget}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <View style={styles.nameContainer}>
            {props?.item?.min_budget && props?.item?.max_budget ? (
              <Text style={styles.nameTxt}>
                {`${props?.item?.min_budget} ${props?.item?.min_budget_type}`} -{" "}
                {`${props?.item?.max_budget} ${props?.item?.max_budget_type}`}
              </Text>
            ) : (
              <Text style={styles.nameTxt}>{strings.notfount} </Text>
            )}
          </View>
        </View>
      </View>
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>When to buy</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.item?.customer_first_name === '' ||
            props?.item?.customer_first_name === undefined ||
            props?.item?.customer_first_name === null
            ? strings.notfount
            : props?.item?.customer_first_name}</Text>
          <Text style={styles.nameTxt}>{strings.notfount}</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.configurations}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.item?.configuration === "" ||
              props?.item?.configuration === undefined ||
              props?.item?.configuration === null
              ? strings.notfount
              : props?.item?.configuration}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.siteVisit + " " + strings.dateTime}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.item?.appointment_date === "" ||
              props?.item?.appointment_date === undefined ||
              props?.item?.appointment_date === null
              ? strings.notfount
              : `${moment(props?.item?.appointment_date).format(DATE_FORMAT)} ${props?.item?.appointment_time
              }`}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.propertyHeader}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.item?.property_title === "" ||
              props?.item?.property_title === undefined ||
              props?.item?.property_title === null
              ? strings.notfount
              : props?.item?.property_title}
          </Text>
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
                  props?.item?.status === 1 ||
                    props?.item?.status === 4 ||
                    props?.item?.status === 5 ||
                    props?.item?.status === 6
                    ? RED_COLOR
                    : props?.item?.status === 2
                      ? GREEN_COLOR
                      : props?.item?.status === 3
                        ? GREEN_COLOR
                        : BLACK_COLOR
              },
            ]}
          >
            {props?.item?.status === 1
              ? currentDate >= appointmentdateTime ? strings.STSNotVisited : strings.STSUpComing
              : props?.item?.status === 2
                ? strings.STSReVisit
                : props?.item?.status === 4
                  ? strings.STSVisitCancelled
                  : props?.item?.status === 5 ? strings.STSRescheduled
                    : props?.item?.status === 6 ? strings.STSNotFitForSale :
                      props?.item?.status === 3 ?
                        bookingStatus === 1 ? strings.STSReadyToBook : strings.STSBooking :
                        strings.STSCompleted
            }
          </Text>
        </View>
      </View>
      {props?.item?.checkin_status &&
        (<View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.status}</Text>
          </View>
          <View><Text>:</Text></View>
          <View style={styles.nameContainer}>
            <Text style={[styles.nameTxt, { color: props?.item?.checkin_status ? GREEN_COLOR : BLACK_COLOR }]}>{
              props?.item?.checkin_status ? strings.STSVisited : strings.notfount}</Text>
          </View>
        </View>)}
      {props?.item?.resion &&
        (<View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.resion}</Text>
          </View>
          <View><Text>:</Text></View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{props?.item?.resion ? props?.item?.resion : strings.notfount}</Text>
          </View>
        </View>)}
      {props?.item?.remark &&
        (<View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.remark}</Text>
          </View>
          <View><Text>:</Text></View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{props?.item?.remark ? props?.item?.remark : strings.notfount}</Text>
          </View>
        </View>)}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.createBy}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.item?.create_by === "" ||
              props?.item?.create_by === undefined ||
              props?.item?.create_by === null
              ? strings.notfount
              : props?.item?.create_by}
          </Text>
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
          <Text style={styles.nameTxt}>
            {props?.item?.pickup === "" ||
              props?.item?.pickup === undefined ||
              props?.item?.pickup === null
              ? strings.notfount
              : props?.item?.pickup}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.pickupLocation}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.item?.pickup_location === "" ||
              props?.item?.pickup_location === undefined ||
              props?.item?.pickup_location === null
              ? strings.notfount
              : props?.item?.pickup_location}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.dropupLocation}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.item?.drop_off_location === "" ||
              props?.item?.drop_off_location === undefined ||
              props?.item?.drop_off_location === null
              ? strings.notfount
              : props?.item?.drop_off_location}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.noofguest}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.item?.number_of_guest === "" ||
              props?.item?.number_of_guest === undefined ||
              props?.item?.number_of_guest === null
              ? strings.notfount
              : props?.item?.number_of_guest}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AppointmentDtailsItem;
