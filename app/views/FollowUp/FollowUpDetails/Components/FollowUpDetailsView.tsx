import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { BLACK_COLOR, Isios, PRIMARY_THEME_COLOR_DARK, WHITE_COLOR } from '../../../../components/utilities/constant'
import Header from '../../../../components/Header'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import styles from './Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../../../components/Button'
import FollowUpDetailsItem from './FollowUpDetailsItem'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import usePermission from 'app/components/utilities/UserPermissions'

const FollowUpDetailsView = (props: any) => {
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation()
  const { response = {} } = useSelector((state: any) => state.followUp)
  const onpressSchedule = () => {
    navigation.navigate('AddAppointmentScreen', { data: {}, type: 'add' })
  }
  const { create, status } = usePermission({
    create: 'add_appointment',
    status: 'add_followup'
  })
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.followupDetails}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
      />
      <View style={styles.leadDetailsItemView}>
        <FollowUpDetailsItem data={response?.data?.length > 0 ? response?.data[0] : {}} />
      </View>
      <View style={styles.btnContainer}>
        {create &&
          (<Button
            buttonText={strings.ScheduleSitevisite}
            width={Isios ? 200 : 150}
            height={45}
            bgcolor={PRIMARY_THEME_COLOR_DARK}
            btnTxtcolor={WHITE_COLOR}
            btnTxtsize={12}
            textTransform={"uppercase"}
            handleBtnPress={() => onpressSchedule()}
          />)
        }
        {status &&
          (<Button
            buttonText={strings.Statusupdate}
            width={150}
            height={45}
            bgcolor={PRIMARY_THEME_COLOR_DARK}
            btnTxtcolor={WHITE_COLOR}
            btnTxtsize={Isios ? 12 : 14}
            textTransform={"uppercase"}
            handleBtnPress={() => props.handleStatusUpdate()}
          />)
        }
      </View>
    </View>
  )
}

export default FollowUpDetailsView