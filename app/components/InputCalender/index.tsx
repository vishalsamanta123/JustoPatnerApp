import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import styles from '../InputField/styles';
import { BLACK_COLOR } from '../utilities/constant';
import images from '../../assets/images';
import { normalizeHeight } from '../scaleFontSize';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

const InputCalender = (props: any) => {
  const onConfirmDate = (date: any) => {
    setOpen(false)
    props.setDateshow(date)
    props.dateData(date)
  }

  const [open, setOpen] = useState(false)
  const {
    inputWidth = '90%',
    editable = true,
    multiline = false,
    inputheight = 50,

  } = props
  const onSubmit = (e: any) => {
    const { text } = e;
  };


  const OpenCalender = () => {
    setOpen(true)
  }
  return (
    <View>
      <View style={styles.inputHeadinView}>
        <Text style={styles.inputHeadingText}>{props.headingText}</Text>
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={[styles.input, {
            width: inputWidth,
            height: normalizeHeight(inputheight),
            textAlignVertical: 'top',
            color: BLACK_COLOR
          }]}
          onChangeText={val => props.onChangeText(val)}
          onSubmitEditing={onSubmit}
          placeholder={props.placeholderText}
          placeholderTextColor={BLACK_COLOR}
          secureTextEntry={props.isSecureText}
          autoCapitalize={'none'}
          editable={editable}
          multiline={multiline}
          value={props?.value}
        />

        <TouchableOpacity
          onPress={() => OpenCalender()}
        //disabled={!props.handleInputBtnPress}
        >
          <Image style={styles.rightImage} source={images.calender} />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal={true}
        mode={"date"}
        open={open}
        date={new Date()}
        onDateChange={(date) => {
          props.setDateshow(date)
        }}
        onConfirm={(date) => onConfirmDate(date)}
        onCancel={() => {
          setOpen(false)
        }}
      />


    </View>
  );
};

export default InputCalender;
