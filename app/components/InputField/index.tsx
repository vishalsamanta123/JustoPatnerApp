
import { View, TextInput, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import React from 'react';
import styles from './styles';
import { BLACK_COLOR } from '../utilities/constant';
import images from '../../assets/images';
import { normalizeHeight } from '../scaleFontSize';
import LocationInput from './Location';
import CommonInput from './CommonInput';

const InputField = (props: any) => {
  const {
    inputWidth = '90%',
    editable = true,
    multiline = false,
    inputheight = 50,
    keyboardtype = 'default',
    topping = 2,
    inputType = "normal",
    require = false,
    disableSpecialCharacters = false
  } = props
  const onSubmit = (e: any) => {
    const { text } = e;
  };

  return (
    <View>
      <View>
        {inputType === 'location' ?
          <LocationInput
            require={require}
            editable={editable}
            headingText={props.headingText}
            headingTextWidth={props.headingTextWidth}
            onPressSelect={props.onPressSelect}
            placeholderText={props.placeholderText}
            valueshow={props.valueshow}
            onBlur={props.onBlur}
            textInputProps={props.textInputProps ? props.textInputProps : {
              placeholderTextColor: BLACK_COLOR,
              onChangeText: (val: any) => props.onChangeText(val),
              value: props.valueshow,
            }}
            handleInputBtnPress={props.handleInputBtnPress}
            rightImgSrc={props.rightImgSrc}
          />
          :
          <CommonInput
            require={require}
            editable={editable}
            inputWidth={inputWidth}
            multiline={multiline}
            inputheight={inputheight}
            keyboardtype={keyboardtype}
            topping={topping}
            headingText={props.headingText}
            headingTextWidth={props.headingTextWidth}
            onChangeText={props.onChangeText}
            placeholderText={props.placeholderText}
            isSecureText={props.isSecureText}
            autoCapitalize={'none'}
            valueshow={props.valueshow}
            maxLength={props.maxLength}
            onBlur={props.onBlur}
            inputType={inputType}
            onFocus={props.onFocus}
            handleInputBtnPress={props.handleInputBtnPress}
            rightImgSrc={props.rightImgSrc}
            rightImageSty={props.rightImageSty}
            rightImageVw={props.rightImageVw}
            disableSpecialCharacters={disableSpecialCharacters}
          />
        }
        {/* <View style={styles.inputHeadinView}>
        <Text style={styles.inputHeadingText}>{props.headingText}</Text>
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={[styles.input, {
            width: inputWidth,
            height: normalizeHeight(inputheight),
            textAlignVertical: 'top',
            top: topping,
            color: GRAY_LIGHT_COLOR
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
        />
        <TouchableOpacity
          onPress={props.handleInputBtnPress}
          disabled={!props.handleInputBtnPress}>
          <Image style={styles.rightImage} source={props.rightImgSrc} />
        </TouchableOpacity>
      </View> */}
      </View>
    </View>
  );
};

export default InputField;



// import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
// import React from 'react';
// import styles from './styles';
// import { BLACK_COLOR } from '../utilities/constant';
// import images from '../../assets/images';
// import { normalizeHeight } from '../scaleFontSize';
// import LocationInput from './Location';
// import CommonInput from './CommonInput';

// const InputField = (props: any) => {
//   const {
//     inputWidth = '90%',
//     editable = true,
//     multiline = false,
//     inputheight = 50,
//     keyboardtype = 'default',
//     topping = 2,
//     inputType = ""
//   } = props
//   const onSubmit = (e: any) => {
//     const { text } = e;
//   };

//   return (
//     <View>
//       {inputType === 'location' ?
//         <LocationInput

//         /> :
//         <CommonInput
//           editable={editable}
//           multiline={multiline}
//           inputheight={inputheight}
//           keyboardtype={keyboardtype}
//           topping={topping}
//           inputWidth={inputWidth}
//         />
//       }
//     </View>
//   );
// };

// export default InputField;