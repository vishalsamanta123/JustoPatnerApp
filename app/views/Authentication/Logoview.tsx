import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import images from "../../assets/images";

const LogoView = (props: any) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const handlePasswordBtnPress = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  return (
   
      <View>
        <Image
          // style={styles.loginBanner}
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
        marginTop:-5
        //height: 220,
      },
  });

export default LogoView;
