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
} from "../../../../components/utilities/constant";
import moment from "moment";
import usePermission from "app/components/utilities/UserPermissions";

const VisitorAppointment = (props: any) => {
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
              : `${moment(item?.createdDate).format("DD-MM-YYYY")},${item?.appointment_time
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
                  item?.status === 1 ||
                    item?.status === 4 ||
                    item?.status === 5 || item?.status === 6
                    ? RED_COLOR
                    : item?.status === 2
                      ? YELLOW_COLOR
                      : item?.status === 3
                        ? GREEN_COLOR
                        : BLACK_COLOR
              },
            ]}
          >
            {item?.status === 1
              ? "Upcoming"
              : item?.status === 2
                ? "Upcoming"
                : item?.status === 3
                  ? "Completed"
                  : item?.status === 4
                    ? "Canceled"
                    : item?.status === 5 ? "Canceled"
                      : item?.status === 6 && "Customer Lost"

            }
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
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
