import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Styles'
import images from '../../../../assets/images'
import InputField from '../../../../components/InputField'
import Button from '../../../../components/Button'
import strings from '../../../../components/utilities/Localization'
import Header from '../../../../components/Header'
import LogoView from '../../Logoview'
import { ScrollView } from 'react-native-gesture-handler'

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
            handleBtnPress={props.handleOtp}
          />
        </View>
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.bottomText}>{strings.byCreating}</Text>
        <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}> {strings.and} </Text>
        <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default ForgotPasswordView