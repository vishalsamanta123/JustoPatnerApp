import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./Styles";
import {
  PURPLE_COLOR,
  CALL_COLOR,
  BLACK_COLOR,
  YELLOW_COLOR,
  DATE_TIME_FORMAT,
  GREEN_COLOR,
  RED_COLOR,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import moment from "moment";
import usePermission from "app/components/utilities/UserPermissions";
import { useSelector } from "react-redux";

const LeadManagementItem = (props: any) => {
  const { edit, view } = usePermission({
    edit: 'edit_visitor',
    view: 'view_visitor',
  })

  // const { response = {} } = useSelector((state: any) => state.userData)
  // const userId = response?.data ? response?.data : {}

  return (
    <View style={styles.IteamView}>
      {props?.items.property_title !== '' ?
        (<View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Property Name :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{
              props?.items.property_title === '' ? strings.notfount : props.items.property_title}</Text>
          </View>
        </View>)
        : null
      }
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.items.first_name === '' ? strings.notfount : props.items.first_name}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Created Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.items.createdDate === null ? "" : moment(props.items.createdDate).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Configurations :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.configuration
              ? props.items.configuration
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.items?.max_rate && props?.items?.min_rate ? (
              <Text style={styles.nameTxt}>
                {`${props?.items?.min_rate} ${props?.items?.min_rate_type}`} -{" "}
                {`${props?.items?.max_rate} ${props?.items?.max_rate_type}`}
              </Text>
            ) : (
              <Text style={styles.nameTxt}>{strings.notfount} </Text>
            )}
          </Text>
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
          <Text style={styles.nameTxt}>
            {props.items.created_name
              ? props.items.created_name
              : strings.notfount}
          </Text>
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
                color: props.items.lead_status === 6 ? "red" : BLACK_COLOR,
              },
            ]}
          >
            {props.items.lead_status === 1
              ? "New Lead"
              : props.items.lead_status === 2
                ? "In Follow up"
                : props.items.lead_status === 3
                  ? "Ready to Visit"
                  : props.items.lead_status === 4
                    ? "Booking"
                    : props.items.lead_status === 5
                      ? "Registration"
                      : props.items.lead_status === 6
                        ? "Close"
                        : props.items.lead_status === 7
                          ? "Ready To Book"
                          : strings.notfount}
          </Text>
        </View>
      </View>
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>visit status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt, {
            color:
              props.items.visit_status === strings.hot ? GREEN_COLOR
                : props.items.visit_status === strings.warm ? YELLOW_COLOR
                  : props.items.visit_status === strings.cold ? RED_COLOR : BLACK_COLOR
          }]}>{
              props.items.visit_status ?
                props.items.visit_status
                : strings.notfount
            }</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Acquisition Source :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt,]}>
            {/*  1- By User 2 - By Self acquisition_source */}
            {props.items.acquisition_source === 1 ? "By User" :
              props.items.acquisition_source === 2 ? "By Self" :
                props.items.acquisition_source === 3 ? strings.bulkupload :
                  strings.notfount
            }
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {edit &&
          (<TouchableOpacity
            style={[styles.button, { borderColor: PURPLE_COLOR }]}
            onPress={() => props.onPressEdit(props.items)}
          >
            <Text style={[styles.buttonTxt, { color: PURPLE_COLOR }]}>
              {strings.edit}
            </Text>
          </TouchableOpacity>)
        }
        {/* {props?.items?.create_by === userId?._id &&
          ( */}
          <TouchableOpacity
            style={[styles.button, { borderColor: CALL_COLOR }]}
            onPress={() => {
              Linking?.openURL(`tel:${props?.items?.mobile}`);
            }}
          >
            <Text style={[styles.buttonTxt, { color: CALL_COLOR }]}>
              {strings.call}
            </Text>
          </TouchableOpacity>
          {/* )} */}
        {view &&
          (<TouchableOpacity
            style={styles.Viewbutton}
            onPress={() => props.onPressView(props.items)}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>)
        }
      </View>
    </View>
  );
};

export default LeadManagementItem;
