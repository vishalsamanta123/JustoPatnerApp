import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import styles from './Styles'
import images from '../../../../assets/images'
import InputField from '../../../../components/InputField'
import Button from '../../../../components/Button'
import strings from '../../../../components/utilities/Localization'
import Header from '../../../../components/Header'
import LogoView from '../../Logoview'
import { ScrollView } from 'react-native-gesture-handler'
import CheckBox from '@react-native-community/checkbox'
import { PRIMARY_THEME_COLOR } from 'app/components/utilities/constant'

const ForgotPasswordView = (props: any) => {
  return (
    <ScrollView style={styles.mainContainer}>

      <View style={styles.logoView}>
        <LogoView />
      </View>

      <View style={styles.inputView}>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"Email Address"}
            headingText={"Email Address"}
            rightImgSrc={images.emailIcon}
            isSecureText={false}
            onChangeText={(val: any) => {
              props.setEmail(val)
            }}
          />
        </View>

        <View style={styles.btnView}>
          <Button
            buttonText={strings.sendotp}
            capitalize={true}
            handleBtnPress={props.handleOtp}
          />
        </View>
      </View>
      {/* <View style={styles.bottomView}>
        <Text style={styles.bottomText}>{strings.byCreating}</Text>
        <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}> {strings.and} </Text>
        <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.bottomView}>
        <CheckBox
          value={true}
          tintColors={{true: PRIMARY_THEME_COLOR}}
          // onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.bottomText}>{strings.iAknowledge}</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://justoverse.com/termandcondition')} style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}> {strings.applicable} </Text>
        {/* <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  )
}

export default ForgotPasswordView