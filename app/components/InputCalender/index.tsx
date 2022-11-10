import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import styles from '../InputField/styles';
import { BLACK_COLOR } from '../utilities/constant';
import images from '../../assets/images';
import { normalizeHeight } from '../scaleFontSize';
import DatePicker from 'react-native-date-picker'

const InputCalender = (props: any) => {

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
  

  const OpenCalender  = () => {
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
            textAlignVertical: 'top'
          }]}
          onChangeText={val => props.onChangeText(val)}
          onSubmitEditing={onSubmit}
          placeholder={props.placeholderText}
          placeholderTextColor={BLACK_COLOR}
          secureTextEntry={props.isSecureText}
          autoCapitalize={'none'}
          editable={editable}
          multiline={multiline}
          value={props.dateshow}
        />
        <TouchableOpacity
          onPress={() => OpenCalender()}
          //disabled={!props.handleInputBtnPress}
          >
          <Image style={styles.rightImage} source={images.calender} />
        </TouchableOpacity>
      </View>

      <DatePicker
        modal
        mode={"date"}
        open={open}
        date={props.dateshow}
        onConfirm={(date) => {

          console.log("InputCalender -> date", date)

          /* setOpen(false)
          props.setDateshow(date) */
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />



    </View>
  );
};

export default InputCalender;
