import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import images from '../../../../assets/images'
import { Isios, PRIMARY_THEME_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant'
import strings from '../../../../components/utilities/Localization'
import styles from './styles'
import Header from '../../../../components/Header'
import InputField from '../../../../components/InputField'
import Button from '../../../../components/Button'

const ChangePasswordView = (props: any) => {
  const { data, passwordData,
    setPasswordData,
    handleChangePress,
    handleOldPasswordBtnPress,
    handleNewPasswordBtnPress,
    handlecnfmPasswordBtnPress,
    isVisibleOldPassword,
    isVisibleNewPassword,
    isVisibleCnfmPassword,
  } = props;
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={data.heading}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        barStyle={'light-content'}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
      >
        <View style={styles.wrap}>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={strings.old + " " + strings.password}
              onChangeText={(e: any) => setPasswordData({
                ...passwordData,
                oldPassword: e,
              })}
              headingText={strings.old + " " + strings.password}
              rightImgSrc={
                isVisibleOldPassword ? images.hiddenPassword : images.showPassword
              }
              handleInputBtnPress={handleOldPasswordBtnPress}
              isSecureText={isVisibleOldPassword}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={strings.new + " " + strings.password}
              onChangeText={(e: any) => setPasswordData({
                ...passwordData,
                password: e,
              })}
              headingText={strings.new + " " + strings.password}
              rightImgSrc={
                isVisibleNewPassword ? images.hiddenPassword : images.showPassword
              }
              handleInputBtnPress={handleNewPasswordBtnPress}
              isSecureText={isVisibleNewPassword}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={strings.confirm + " " + strings.new + " " + strings.password}
              onChangeText={(e: any) => setPasswordData({
                ...passwordData,
                conPassword: e,
              })}
              headingText={strings.confirm + " " + strings.new + " " + strings.password}
              rightImgSrc={
                isVisibleCnfmPassword ? images.hiddenPassword : images.showPassword
              }
              handleInputBtnPress={handlecnfmPasswordBtnPress}
              isSecureText={isVisibleCnfmPassword}
            />
          </View>
          <View style={styles.btnView}>
            <Button handleBtnPress={handleChangePress}
              width={300} btnTxtsize={15}
              buttonText={strings.changePassword}
              textTransform={"uppercase"} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ChangePasswordView;