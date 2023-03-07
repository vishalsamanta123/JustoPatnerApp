import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import Styles from "../../../../components/DropDown/styles";
import InputField from "../../../../components/InputField";
import DropdownInput from "../../../../components/DropDown";
import strings from "../../../../components/utilities/Localization";
import images from "../../../../assets/images";
import { RadioButton } from "react-native-paper";
import {
  PRIMARY_THEME_COLOR,
  BLACK_COLOR,
  DATE_FORMAT,
  TIME_FORMAT,
  ONE_MONTH_DATES,
  Isios,
} from "../../../../components/utilities/constant";
import Button from "../../../../components/Button";
import InputCalender from "app/components/InputCalender";
import moment from "moment";

const AddAppointmentItem = (props: any) => {
  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}
    automaticallyAdjustKeyboardInsets={Isios ? true : false}
    >
      <View style={styles.wrap}>
        <View style={styles.inputWrap}>
          <DropdownInput
            require={true}
            headingText={strings.selectLead}
            placeholder={props?.addAppointmentForm?.lead_name === '' ||
              props?.addAppointmentForm?.lead_name === undefined ||
              props?.addAppointmentForm?.lead_name === null ?
              strings.selectLead : props?.addAppointmentForm?.lead_name}
            disable={props.type === 'Add' || props.type === 'Edit' ? true : false}
            data={props.visitorList}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            onFocus={() => props.getVisitorsList()}
            labelField="first_name"
            valueField={"_id"}
            value={props.addAppointmentForm?.lead_id}
            onChange={(item: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                lead_id: item._id,
                property_id: item.property_id,
                lead_name: item.first_name,
                pickup: item?.pickup,
              });
              if (item?.property_id !== '' && item?.property_id !== null) {
                props.setPropertyStatus(true)
              }
              else {
                props.setPropertyStatus(false)
              }
            }}
            newRenderItem={(item: any) => {
              return (
                <View style={Styles.item}>
                  <Text style={Styles.textItem}>{item.first_name}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={[styles.inputWrap]}>
          <DropdownInput
            require={true}
            headingText={"Property"}
            placeholder={props?.addAppointmentForm?.property_title != "" ?
              props?.addAppointmentForm?.property_title :
              strings.selectproperty}
            data={props?.allProperty}
            // disable={
            //   props?.addAppointmentForm?.property_id !== "" && props?.addAppointmentForm?.property_id !== null ? true : false}
            disable={props.PropertyStatus}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            labelField="property_title"
            valueField={"property_id"}
            value={props?.addAppointmentForm?.property_id}
            onChange={(item: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                property_id: item.property_id,
                property_type_title: item.property_type,
                property_title: item.property_title,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <>
                  <View style={Styles.item}>
                    <Text style={Styles.textItem}>{item.property_title}</Text>
                  </View>
                </>
              );
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputCalender
            require={true}
            mode={"date"}
            minimumDate={new Date()}
            maximumDate={ONE_MONTH_DATES}
            leftIcon={images.event}
            placeholderText={strings.appointmentDate}
            headingText={strings.appointmentDate}
            editable={false}
            // onChangeText={() => { }}
            dateData={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_time: '',
                appointment_date: moment(data).format(DATE_FORMAT),
              });
            }}
            setDateshow={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_time: '',
                appointment_date: moment(data).format(DATE_FORMAT),
              });
            }}
            value={props?.addAppointmentForm?.appointment_date === '' ||
              props?.addAppointmentForm?.appointment_date === undefined ||
              props?.addAppointmentForm?.appointment_date === null ?
              "" :
              moment(props.addAppointmentForm?.appointment_date).format(
                DATE_FORMAT
              )}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputCalender
            require={true}
            mode={"time"}
            dateValue={props?.addAppointmentForm?.appointment_date}
            leftIcon={images.timer}
            placeholderText={strings.appointmentTime}
            headingText={strings.appointmentTime}
            editable={false}
            // onChangeText={() => { }}
            dateData={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_time: data,
              });
            }}
            setDateshow={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_time: data,
              });
            }}
            value={props.addAppointmentForm?.appointment_time}
          />
        </View>
        <>
          <View style={styles.inputWrap}>
            <Text style={styles.genderTxt}>{strings.pickupAppointment}</Text>
          </View>
          <View style={styles.genderView}>
            <View style={styles.radioView}>
              <RadioButton.Android
                value={strings.yes}
                status={
                  props.addAppointmentForm?.pickup === strings.yes
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => {
                  props.setAddAppointmentForm({
                    ...props.addAppointmentForm,
                    pickup: strings.yes,
                  });
                }}
                color={PRIMARY_THEME_COLOR}
              />
              <Text
                style={[
                  styles.radioTxt,
                  {
                    color:
                      props.addAppointmentForm?.pickup === strings.yes
                        ? PRIMARY_THEME_COLOR
                        : BLACK_COLOR,
                  },
                ]}
              >
                {strings.yes}
              </Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton.Android
                value={strings.no}
                status={
                  props.addAppointmentForm?.pickup === strings.no
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => {
                  props.setAddAppointmentForm({
                    ...props.addAppointmentForm,
                    pickup: strings.no,
                  });
                }}
                color={PRIMARY_THEME_COLOR}
              />
              <Text
                style={[
                  styles.radioTxt,
                  {
                    color:
                      props.addAppointmentForm?.pickup === strings.no
                        ? PRIMARY_THEME_COLOR
                        : BLACK_COLOR,
                  },
                ]}
              >
                {strings.no}
              </Text>
            </View>
          </View>
          {props.addAppointmentForm?.pickup == strings.yes ? (
            <>
              <View style={styles.inputWrap}>
                <InputField
                  require={true}
                  placeholderText={'PickUP Location'}
                  handleInputBtnPress={() => { }}
                  headingText={'PickUP Location'}
                  valueshow={props.addAppointmentForm?.pickup_location}
                  inputType={"location"}
                  onPressSelect={(data: any, detail: any) => {
                    props.setAddAppointmentForm({
                      ...props.addAppointmentForm,
                      pickup_location: data?.description,
                      pickup_latitude: detail?.geometry?.location?.lat,
                      pickup_longitude: detail?.geometry?.location?.lng,
                    });
                  }}
                  onChangeText={(data: any) => {
                    props.setAddAppointmentForm({
                      ...props.addAppointmentForm,
                      pickup_location: data ? data : props?.addAppointmentForm?.pickup_location,
                    });
                  }}
                />
              </View>
              <View style={styles.inputWrap}>
                <InputField
                  require={true}
                  placeholderText={"Area"}
                  handleInputBtnPress={() => { }}
                  headingText={"Area"}
                  valueshow={props.addAppointmentForm?.pickup_address}
                  onChangeText={(val: any) => {
                    props.setAddAppointmentForm({
                      ...props.addAppointmentForm,
                      pickup_address: val,
                    });
                  }}
                />
              </View>
              <View style={styles.inputWrap}>
                <InputField
                  require={true}
                  placeholderText={strings.noofguest}
                  handleInputBtnPress={() => { }}
                  maxLength={2}
                  headingText={strings.noofguest}
                  valueshow={props.addAppointmentForm?.number_of_guest?.toString()}
                  onChangeText={(val: any) => {
                    props.setAddAppointmentForm({
                      ...props.addAppointmentForm,
                      number_of_guest: val,
                    });
                  }}
                />
              </View>
            </>
          ) : null}
        </>
        <View style={styles.btnView}>
          <Button
            handleBtnPress={() => props.handleBtnPress()}
            buttonText={
              props.type == strings.edit
                ? strings.editNewappointment
                : strings.addNewappointment
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddAppointmentItem;
