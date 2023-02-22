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
  return (
    <ScrollView>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>Visitor Score </Text>
          <Text style={styles.topTxt}>{props?.item?.lead_score}</Text>
        </View>
        <Image source={{ uri: props?.item?.qr_code }} style={styles.qrImg} />
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name</Text>
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
          <Text style={styles.projectTxt}>Budget</Text>
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
          <Text style={styles.projectTxt}>Configuration</Text>
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
          <Text style={styles.projectTxt}>Site Visit Date Time</Text>
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
              : `${moment(props?.item?.appointment_date).format(DATE_FORMAT)} ${
                  props?.item?.appointment_time
                }`}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property</Text>
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
                  props?.item?.status === 1 ||
                  props?.item?.status === 4 ||
                  props?.item?.status === 5 || 
                  props?.item?.status === 6
                    ? RED_COLOR
                    : props?.item?.status === 2
                    ? YELLOW_COLOR
                    : props?.item?.status === 3
                    ? GREEN_COLOR
                    : BLACK_COLOR
              },
            ]}
          >
            {props?.item?.status === 1
              ? "Upcoming"
              : props?.item?.status === 2
              ? "Upcoming"
              : props?.item?.status === 3
              ? "Completed"
              : props?.item?.status === 4
              ? "Canceled"
              : props?.item?.status === 5 ? "Canceled"
              : props?.item?.status === 6 && "Customer Lost"
            }
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment Create by</Text>
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
          <Text style={styles.projectTxt}>Pickup</Text>
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
          <Text style={styles.projectTxt}>Pickup Location</Text>
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
          <Text style={styles.projectTxt}>Drop up Location</Text>
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
          <Text style={styles.projectTxt}>No. of Guest</Text>
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
