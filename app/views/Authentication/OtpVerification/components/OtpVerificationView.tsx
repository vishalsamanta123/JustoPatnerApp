import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import React from "react";
import styles from "./style";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import { PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";

const OtpVerificationView = (props: any) => {
  const { otp, setOtp, handleOtpChange } = props;
  return (
    <ScrollView
      style={styles.mainContainer}
    >
      <StatusBar barStyle={"light-content"} backgroundColor={PRIMARY_THEME_COLOR} />
      <View style={styles.logoView}>
        <Image
          style={styles.loginBanner}
          source={images.loginBanner}
          resizeMode="stretch"
        />
      </View>
        <View style={styles.DescbottomView}>
          <Text style={styles.headingText}>{strings.otpVerification}</Text>
          <Text style={styles.bottomText}>{strings.codeSent}</Text>
          <View style={styles.spanTouch}>
            <Text style={styles.bottomText}>{strings.your}</Text>
            <TouchableOpacity>
              <Text style={styles.spanText}> {strings.email} </Text>
            </TouchableOpacity>
          </View>
        </View>
        <OTPInputView
          style={styles.otpView}
          pinCount={4}
          code={otp}
          onCodeChanged={(code) => handleOtpChange(code)}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            // console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <View style={styles.btnView}>
         <Button handleBtnPress={props.OnpressConfirm} buttonText={'confirm'} 
         //textTransform={'uppercase'}
        />
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>{strings.notRecived}</Text>
          <TouchableOpacity style={styles.spanTouch}>
            <Text style={styles.spanText}> {strings.resend} </Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

export default OtpVerificationView;
