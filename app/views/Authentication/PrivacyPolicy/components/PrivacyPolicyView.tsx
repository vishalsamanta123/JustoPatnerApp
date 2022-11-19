import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import styles from './Styles'
import images from '../../../../assets/images'
import InputField from '../../../../components/InputField'
import Button from '../../../../components/Button'
import strings from '../../../../components/utilities/Localization'
import Header from '../../../../components/Header'
import LogoView from '../../Logoview'
import { ScrollView } from 'react-native-gesture-handler'
import { PRIMARY_THEME_COLOR, WHITE_COLOR } from 'app/components/utilities/constant'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const PrivacyPolicyView = (props: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.mainContainer}>
    <View
    style={{
      backgroundColor: PRIMARY_THEME_COLOR,
      height: insets.top,
    }}
  />
   <StatusBar barStyle={"light-content"} backgroundColor={PRIMARY_THEME_COLOR} />
  <Header
    headerText={props.contentShow}
    headerStyle={styles.headerStyle}
    headerTextStyle={styles.headerTextStyle}
    leftImageSrc={images.backArrow}
    handleOnLeftIconPress={props.onPressBack}
    leftImageIconStyle={{tintColor: WHITE_COLOR}}
  /> 
   <ScrollView contentContainerStyle={styles.wrap}>

    </ScrollView>
    
    </View>
  )
}

export default PrivacyPolicyView