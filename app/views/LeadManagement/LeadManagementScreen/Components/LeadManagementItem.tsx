import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./Styles";
import {
  PURPLE_COLOR,
  CALL_COLOR,
  BLACK_COLOR,
  DATE_TIME_FORMAT,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import moment from "moment";
import usePermission from "app/components/utilities/UserPermissions";


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
            <Text style={styles.projectTxt}>{strings.propertyHeader + " " + strings.name} :</Text>
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
          <Text style={styles.projectTxt}>{strings.visitor + " " + strings.name} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.items.first_name === '' ? strings.notfount : props.items.first_name}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.createdDate} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.items.createdDate === null ? "" : moment(props.items.createdDate).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.configurations} :</Text>
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
          <Text style={styles.projectTxt}>{strings.budget} :</Text>
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
          <Text style={styles.projectTxt}>{strings.lastInteracted} :</Text>
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
          <Text style={styles.projectTxt}>{strings.source} :</Text>
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
          <Text style={styles.projectTxt}>{strings.visitorScore} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lead_score}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.status} :</Text>
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
              ? strings.STSNewLead
              : props.items.lead_status === 2
                ? strings.STSInFollowUp
                : props.items.lead_status === 3
                  ? strings.STSReadyToVisit
                  : props.items.lead_status === 4
                    ? strings.STSBooking
                    : props.items.lead_status === 5
                      ? strings.STSRegistration
                      : props.items.lead_status === 6
                        ? strings.STSClose
                        : props.items.lead_status === 7
                          ? strings.STSReadyToBook
                          : strings.notfount}
          </Text>
        </View>
      </View>
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.visitStatus} :</Text>
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
          <Text style={styles.projectTxt}>{strings.acquisitionSource} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt,]}>
            {/*  1- By User 2 - By Self acquisition_source */}
            {props.items.acquisition_source === 1 ? strings.byUser :
              props.items.acquisition_source === 2 ? strings.bySelf :
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
