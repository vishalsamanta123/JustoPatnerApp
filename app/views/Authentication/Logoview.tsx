import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import images from "../../assets/images";
import { Isios } from "app/components/utilities/constant";

const LogoView = (props: any) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const handlePasswordBtnPress = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  return (
   
      <View>
        <Image
          style={styles.loginBanner}
          source={images.loginBanner}
          resizeMode="contain"
        />
      </View>
     
  );
};
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    loginBanner: {
        width: width,
        marginTop:Isios ? -50 :  -5,
        height: Isios ? 220 : 0,
      },
  });

export default LogoView;
