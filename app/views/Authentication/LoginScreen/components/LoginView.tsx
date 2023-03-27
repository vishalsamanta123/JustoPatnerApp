import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, Linking } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import strings from "../../../../components/utilities/Localization";
import Logoview from "../../Logoview"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Isios, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import CheckBox from "@react-native-community/checkbox";

const LoginView = (props: any) => {
  const insets = useSafeAreaInsets();
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const handlePasswordBtnPress = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  return (
    <ScrollView style={styles.mainContainer} keyboardShouldPersistTaps='handled'
      keyboardDismissMode={Isios ? 'on-drag' : 'none'}>
      {/* <View style={styles.logoView}>
        <View style={styles.loginBannerView}>
          <Image style={styles.loginBanner} source={images.loginBanner} />
        </View>
        <View style={styles.bannerLogoView}>
          <Image style={styles.logoImage} source={images.logoWhiteBG} />
        </View>
      </View> */}
      <View
        style={{
          backgroundColor: WHITE_COLOR,
          height: insets.top,
        }}
      />

      <StatusBar backgroundColor={PRIMARY_THEME_COLOR} barStyle={"light-content"} />


      <View style={styles.logoView}>
        {/*  <Image
          style={styles.loginBanner}
          source={images.loginBanner}
          resizeMode="contain"
        /> */}
        <Logoview />
      </View>
      <View style={styles.inputView}>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={strings.email + " " + strings.address}
            headingText={strings.enterEmail}
            rightImgSrc={props.validEmail ? images.check : images.emailIcon}
            isSecureText={false}
            onChangeText={(val: any) => {
              props.setLoginData({
                ...props.loginData, email: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={strings.password}
            headingText={strings.password}
            maxLength={20}
            rightImgSrc={
              isVisiblePassword ? images.hiddenPassword : images.showPassword
            }
            handleInputBtnPress={handlePasswordBtnPress}
            isSecureText={isVisiblePassword}
            onChangeText={(val: any) => {
              props.setLoginData({
                ...props.loginData, password: val
              })
            }}
          />
        </View>
        <TouchableOpacity style={styles.forgotTouch} onPress={props.handleForgotPress}>
          <Text style={styles.forgotText}>{strings.forgotPassword}</Text>
        </TouchableOpacity>
        <View style={styles.btnView}>
          <Button
            buttonText={strings.signInText}
            handleBtnPress={props.handleLoginPress}
          />
        </View>
        {/* <View style={styles.dontHaveView}>
          <Text style={styles.dontText}>{strings.dontHaveAnAcc}</Text>
          <TouchableOpacity style={styles.registerTouch}>
            <Text style={styles.registerText}>{strings.registerNow}</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.dontHaveView}>
          <Text style={styles.dontText}>{strings.newUserText}</Text>
          <TouchableOpacity
            style={styles.registerTouch}
            onPress={props.handleSingupPress}
          >
            <Text style={styles.registerText}>{strings.signUp}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.bottomView}>
        <Text style={styles.bottomText}>{strings.byCreating}</Text>
        <TouchableOpacity style={styles.spanTouch} onPress={() => props.handlePrivacy(strings.termsAndCondition)}>
          <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}> {strings.and} </Text>
        <TouchableOpacity style={styles.spanTouch} onPress={() => props.handlePrivacy(strings.privacyPolicy)}>
          <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.bottomView}>
        <CheckBox
          value={true}
          disabled={true}
          tintColors={{ true: PRIMARY_THEME_COLOR }}
          style={{ transform: Isios ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
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
  );
};

export default LoginView;
