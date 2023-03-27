import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import strings from "../../../../components/utilities/Localization";
import Logoview from "../../Logoview"
import CheckBox from "@react-native-community/checkbox";
import { Isios, PRIMARY_THEME_COLOR } from "app/components/utilities/constant";

const ChangePasswordView = (props: any) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const handlePasswordBtnPress = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  const [isVisiblecPassword, setIsVisiblecPassword] = useState(true);
  const handlecPasswordBtnPress = () => {
    setIsVisiblecPassword(!isVisiblecPassword);
  };
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}
      style={styles.mainContainer}>
      {/* <View style={styles.logoView}>
        <View style={styles.loginBannerView}>
          <Image style={styles.loginBanner} source={images.loginBanner} />
        </View>
        <View style={styles.bannerLogoView}>
          <Image style={styles.logoImage} source={images.logoWhiteBG} />
        </View>
      </View> */}
      <View style={styles.logoView}>
        <Logoview />
      </View>
      <View style={styles.inputView}>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={strings.new + " " + strings.password}
            headingText={strings.new + " " + strings.password}
            rightImgSrc={
              isVisiblePassword ? images.hiddenPassword : images.showPassword
            }
            handleInputBtnPress={handlePasswordBtnPress}
            isSecureText={isVisiblePassword}
            onChangeText={(val: any) => {
              props.setPasswordDate({
                ...props.passwordDate, password: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={strings.confirm + " " + strings.password}
            headingText={strings.confirm + " " + strings.password}
            rightImgSrc={
              isVisiblecPassword ? images.hiddenPassword : images.showPassword
            }
            handleInputBtnPress={handlecPasswordBtnPress}
            isSecureText={isVisiblecPassword}
            onChangeText={(val: any) => {
              props.setPasswordDate({
                ...props.passwordDate, cpassword: val
              })
            }}
          />
        </View>

        <View style={styles.btnView}>
          <Button
            buttonText={strings.updatepassword}
            handleBtnPress={props.handlechanngePress}
          />
        </View>
        {/* <View style={styles.dontHaveView}>
          <Text style={styles.dontText}>{strings.dontHaveAnAcc}</Text>
          <TouchableOpacity style={styles.registerTouch}>
            <Text style={styles.registerText}>{strings.registerNow}</Text>
          </TouchableOpacity>
        </View> */}

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

export default ChangePasswordView;
