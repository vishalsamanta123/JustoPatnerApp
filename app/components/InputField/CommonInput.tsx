import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import { BLACK_COLOR } from '../utilities/constant';
import images from '../../assets/images';
import { normalizeHeight } from '../scaleFontSize';

const CommonInput = (props: any) => {
  const {
    inputWidth = '90%',
    editable = true,
    multiline = false,
    inputheight = 50,
    keyboardtype = 'default',
    topping = 2
  } = props
  const onSubmit = (e: any) => {
    const { text } = e;
  };

  return (
    <View>
      <View style={styles.inputHeadinView}>
        <Text style={[styles.inputHeadingText, {
          width: props.headingTextWidth
        }]}>{props.headingText}</Text>
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={[styles.input, {
            width: inputWidth,
            height: normalizeHeight(inputheight),
            textAlignVertical: 'top',
            top: topping
          }]}
          onChangeText={val => props.onChangeText(val)}
          onSubmitEditing={onSubmit}
          placeholder={props.placeholderText}
          placeholderTextColor={BLACK_COLOR}
          secureTextEntry={props.isSecureText}
          autoCapitalize={'none'}
          editable={editable}
          multiline={multiline}
          keyboardType={keyboardtype}
          value={props.valueshow}
          maxLength={props.maxLength}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
        />
        <TouchableOpacity
          onPress={props.handleInputBtnPress}
          disabled={!props.handleInputBtnPress}
          style={props.rightImgSrc ?
            props.rightImageVw ? props.rightImageVw : {} : {}}
        >
          <Image
            style={props.rightImgSrc &&
              props.rightImageSty ? props.rightImageSty : styles.rightImage}
            source={props.rightImgSrc} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommonInput;
