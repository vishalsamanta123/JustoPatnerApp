import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./Styles";
import {
  PURPLE_COLOR,
  CALL_COLOR,
  BLACK_COLOR,
  YELLOW_COLOR,
  DATE_TIME_FORMAT,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import moment from "moment";

const LeadManagementItem = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.items.property_title === null ? '' : props.items.property_title}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.items.first_name === null ? '' : props.items.first_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Configuration :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.configuration ?
            props.items.configuration : strings.notfount
          }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.budget ?
            props.items.budget : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Interested :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.last_interacted_date ?
              moment(props.items.last_interacted_date).format(DATE_TIME_FORMAT) : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Source :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.created_name ?
            props.items.created_name : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Score :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lead_score}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Created Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props.items.createdDate ?
              moment(props.items.createdDate).format(DATE_TIME_FORMAT) :
              strings.notfount
          }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color: props.items.lead_status === 6 ? 'red' : BLACK_COLOR

              },
            ]}
          >
            {props.items.lead_status === 1 ? "Create Lead" :
              props.items.lead_status === 2 ? "Follow-up" :
                props.items.lead_status === 3 ? "Site Visit/Appointment" :
                  props.items.lead_status === 4 ? "Booking" :
                    props.items.lead_status === 5 ? "Registration" :
                      props.items.lead_status === 6 ? "Close" :
                        props.items.lead_status === 7 ? "Ready To Book" :
                          strings.notfount
            }
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { borderColor: PURPLE_COLOR }]}
          onPress={() => props.onPressEdit(props.items)}
        >
          <Text style={[styles.buttonTxt, { color: PURPLE_COLOR }]}>{strings.edit}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { borderColor: CALL_COLOR }]}
          onPress={() => {
            Linking?.openURL(
              `tel:${props?.items?.mobile}`
            )
          }}
        >
          <Text style={[styles.buttonTxt, { color: CALL_COLOR }]}>{strings.call}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Viewbutton} onPress={() => props.onPressView(props.items)}>
          <Image
            source={images.forwardArrow}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LeadManagementItem;
