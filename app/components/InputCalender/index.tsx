import { View, TextInput, Image, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import styles from "../InputField/styles";
import { BLACK_COLOR, DATE_FORMAT, Isios, RED_COLOR, TIME_FORMAT } from "../utilities/constant";
import images from "../../assets/images";
import { normalizeHeight, normalizeSpacing, normalizeWidth } from "../scaleFontSize";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import ErrorMessage from "../ErrorMessage";
import strings from "../utilities/Localization";

const InputCalender = (props: any) => {
  const minDate: any = moment().subtract(18, "years")
  const onConfirmDate = (date: any) => {
    setOpen(false);
    props.setDateshow(date);
    props.dateData(date);
  };

  const [open, setOpen] = useState(false);
  const {
    inputWidth = "90%",
    editable = true,
    multiline = false,
    inputheight = Isios ? 35 : 50,
  } = props;
  const onSubmit = (e: any) => {
    const { text } = e;
  };
  const timeSelectValidation = (date: any) => {
    var currentTime = new Date();
    var minTime = new Date();
    minTime.setHours(10);
    minTime.setMinutes(0);
    var maxTime = new Date();
    maxTime.setHours(19);
    maxTime.setMinutes(0);
    if (props.dateValue === "" || props.dateValue === undefined || props.dateValue === null) {
      if (moment(moment(date).format(TIME_FORMAT), 'hh:mm A').format('HH:mm') <= moment(moment(currentTime).format(TIME_FORMAT), 'hh:mm A').format('HH:mm')) {
        ErrorMessage({
          msg: strings.choosecurrentCorrect,
          backgroundColor: RED_COLOR
        })
        return false
      } else if (
        moment(moment(date).format(TIME_FORMAT), 'hh:mm A').format('HH:mm') < moment(moment(minTime).format(TIME_FORMAT), 'hh:mm A').format('HH:mm') ||
        moment(moment(date).format(TIME_FORMAT), 'hh:mm A').format('HH:mm') > moment(moment(maxTime).format(TIME_FORMAT), 'hh:mm A').format('HH:mm')
      ) {
        ErrorMessage({
          msg: strings.choosetimeCorrect,
          backgroundColor: RED_COLOR
        })
        return false
      }
    } else {
      if (moment(date).format(DATE_FORMAT) > moment(props.dateValue).format(DATE_FORMAT)) {
        ErrorMessage({
          msg: strings.chooseTimeToDateCorrectly,
          backgroundColor: RED_COLOR
        })
        return false
      } else if (moment(date).format(DATE_FORMAT) === moment(props.dateValue).format(DATE_FORMAT) &&
        moment(moment(date).format(TIME_FORMAT), 'hh:mm A').format('HH:mm') <= moment(moment(currentTime).format(TIME_FORMAT), 'hh:mm A').format('HH:mm')) {
        ErrorMessage({
          msg: strings.choosecurrentCorrect,
          backgroundColor: RED_COLOR
        })
        return false
      } else if (
        moment(moment(date).format(TIME_FORMAT), 'hh:mm A').format('HH:mm') < moment(moment(minTime).format(TIME_FORMAT), 'hh:mm A').format('HH:mm') ||
        moment(moment(date).format(TIME_FORMAT), 'hh:mm A').format('HH:mm') > moment(moment(maxTime).format(TIME_FORMAT), 'hh:mm A').format('HH:mm')
      ) {
        ErrorMessage({
          msg: strings.choosetimeCorrect,
          backgroundColor: RED_COLOR
        })
        return false
      }
    }
    return true;
  }
  const OpenCalender = () => {
    setOpen(true);
  };
  return (
    <View>
      <View style={styles.inputHeadinView}>
        <Text style={styles.inputHeadingText}>{props.headingText}</Text>
        {props.require ?
          (<Image
            source={images.star}
            style={{
              width: normalizeWidth(5),
              height: normalizeHeight(5),
              marginLeft: normalizeSpacing(5),
              marginBottom: normalizeSpacing(5),
            }}
          />)
          : null
        }
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={[
            styles.input,
            {
              width: inputWidth,
              height: normalizeHeight(inputheight),
              textAlignVertical: "top",
              color: BLACK_COLOR,
            },
          ]}
          onChangeText={(val) => props.onChangeText(val)}
          onSubmitEditing={onSubmit}
          // placeholder={props.placeholderText}
          placeholder={props.placeholderText === 'Date of Birth' ? "" :
            props.placeholderText}
          placeholderTextColor={BLACK_COLOR}
          secureTextEntry={props.isSecureText}
          autoCapitalize={"none"}
          editable={editable}
          multiline={multiline}
          value={props?.value}
        />
        <TouchableOpacity
          onPress={() => OpenCalender()}
        //disabled={!props.handleInputBtnPress}
        >
          <Image style={styles.rightImage} source={props.leftIcon} />
        </TouchableOpacity>
      </View>
      {props.mode == "date" ? (
        <DatePicker
          modal={true}
          mode={"date"}
          open={open}
          onDateChange={(date) => {
            props.setDateshow(date);
          }}
          onConfirm={(date) => onConfirmDate(date)}
          onCancel={() => {
            setOpen(false);
          }}
          minimumDate={props?.minimumDate ? props?.minimumDate : ""}
          maximumDate={
            props.headingText === 'Date of Birth' ||
              props.placeholderText === 'Date of Birth'
              ?
              new Date(moment(minDate).format()) :
              props.maximumDate ? props.maximumDate : ''
          }
          date={
            props.headingText === "Date of Birth" ||
              props.placeholderText === "Date of Birth"
              ? new Date(moment(minDate).format())
              : new Date()
          }
        />
      ) : (
        <DatePicker
          modal={true}
          mode={"time"}
          open={open}
          date={new Date()}
          onDateChange={(date) => {
            setOpen(false)
            if (timeSelectValidation(date)) {
              props.setDateshow(moment(date).format(TIME_FORMAT))
            } else {
              props.setDateshow("")
            }
          }}
          onConfirm={(date) => {
            setOpen(false)
            if (timeSelectValidation(date)) {
              props.setDateshow(moment(date).format(TIME_FORMAT))
            } else {
              props.setDateshow("")
            }
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </View>
  );
};

export default InputCalender;
