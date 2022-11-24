import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BLACK_COLOR, PRIMARY_THEME_COLOR_DARK, WHITE_COLOR } from '../../../../components/utilities/constant'
import Header from '../../../../components/Header'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import styles from './Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LeadDetailsIteam from './LeadDetailsIteam'
import Button from '../../../../components/Button'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import Loader from 'app/components/CommonScreen/Loader'

const LeadDetailsView = (props: any) => {
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation()
  const [userDetails, setuserDetails] = useState({})
  const [isloading, setIsloading] = useState(false)
  const getleaddata  = useSelector((state: any) => state.visitorData)

  useEffect(() => {
    setIsloading(true)
    if(getleaddata?.response?.status === 200){
      setuserDetails(getleaddata?.response?.data[0])
      setIsloading(getleaddata?.loading)
    }
   }, [getleaddata])

  const OnpressseheduleVisit = () => {
    navigation.navigate('AddAppointmentScreen')
  }

  return (
    <>
    {isloading ? <Loader /> : null}
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR_DARK,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={"light-content"} />
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.visitordetails}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
      />
      <View style={styles.leadDetailsItemView}>
        <LeadDetailsIteam
          items={userDetails}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          handleBtnPress={() => OnpressseheduleVisit()}
          buttonText={strings.ScheduleSitevisite}
          width={150}
          height={45}
          bgcolor={PRIMARY_THEME_COLOR_DARK}
          btnTxtcolor={WHITE_COLOR}
          btnTxtsize={12}
          textTransform={"uppercase"}
        />
        <Button
          buttonText={strings.Statusupdate}
          width={150}
          height={45}
          bgcolor={PRIMARY_THEME_COLOR_DARK}
          btnTxtcolor={WHITE_COLOR}
          btnTxtsize={14}
          textTransform={"uppercase"}
        />
      </View>
    </View>
    </>
  )
}

export default LeadDetailsView