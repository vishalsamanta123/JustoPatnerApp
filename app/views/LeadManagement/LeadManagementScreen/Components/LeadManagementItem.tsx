import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./Styles";
import {
  BLACK_COLOR,
  YELLOW_COLOR,
  PURPLE_COLOR,
  CALL_COLOR,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import moment from "moment";

const LeadManagementItem = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.items.last_name === null ? props.items.first_name : props.items.first_name + " " + props.items.last_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Configuration :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.configuration}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.budget}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Interested :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>" "
            {/* {moment(props.items.expected_possession_date).format('llll')} */}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Source :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lead_source}</Text>
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
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                // color:
                //   props.items.lead_status == "confirmatin Pending"
                //     ? BLACK_COLOR
                //     : props.items.status == "Subscribe"
                //       ? YELLOW_COLOR
                //       : "red",
              },
            ]}
          >
            {props.items.lead_status === 1 ? "Create Lead" :
              props.items.lead_status === 2 ? "Follow-up" :
                props.items.lead_status === 3 ? "Site Visit/Appointment" :
                  props.items.lead_status === 4 ? "Booking" :
                    props.items.lead_status === 5 && "Registration"
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
          style={[styles.button, { borderColor: CALL_COLOR }]}>
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
