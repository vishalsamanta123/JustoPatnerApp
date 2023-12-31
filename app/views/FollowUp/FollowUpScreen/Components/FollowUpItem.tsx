import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./Styles";
import images from "../../../../assets/images";
import {
  PURPLE_COLOR,
  PRIMARY_THEME_COLOR,
  DATE_TIME_FORMAT,
  DATE_FORMAT,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import moment from "moment";
import usePermission from "app/components/utilities/UserPermissions";

const FollowUpItem = (props: any) => {
  const { edit, view } = usePermission({
    edit: 'edit_follow',
    view: 'view_follow'
  })
  const item = props?.items || {};
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.leadNo} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item.lead_no}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.visitorScore} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item.visit_score}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.followup + " " + strings.status} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item.followup_status}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.createdDate} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.createdDate === "" || !item.createdDate
              ? strings.notfount
              : moment(item.createdDate).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.followup + "" + strings.date} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.next_followup_date === "" || !item.next_followup_date
              ? strings.notfount
              : `${moment(item.next_followup_date).format(DATE_FORMAT)}, ${item.followup_time}`}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.customerName} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item.customer_first_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.configurations} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.configuration ? item.configuration : strings.notfount}
          </Text>
        </View>
      </View>
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
          <Text style={styles.projectTxt}>{strings.followUpType} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.followup_for === 1
              ? strings.STSLead
              : item.followup_for === 2
                ? strings.STSSiteVisit
                : item.followup_for === 3
                  ? strings.STSBooking
                  : item.followup_for === 4 ? strings.STSRegistration : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {edit && item.followup_for !== 4 &&
          (<TouchableOpacity
            style={[styles.button, { borderColor: PURPLE_COLOR }]}
            onPress={() => props.onPressEdit(item)}
          >
            <Text style={[styles.buttonTxt, { color: PURPLE_COLOR }]}>
              {strings.edit}
            </Text>
          </TouchableOpacity>)
        }
        <TouchableOpacity
          style={[styles.button, { borderColor: PRIMARY_THEME_COLOR }]}
          onPress={() => props.onPressAllFollowUp(item)}
        >
          <Text style={[styles.buttonTxt, { color: PRIMARY_THEME_COLOR }]}>
            {strings.allfollowup}
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

export default FollowUpItem;
