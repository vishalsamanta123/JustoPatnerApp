import { View, Text, StatusBar, FlatList } from 'react-native'
import React, { useState } from 'react'
import styles from './Styles'
import { PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant'
import Header from '../../../../components/Header'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FollowUpItem from './FollowUpItem'
import { useNavigation } from '@react-navigation/native'
import FilterModal from './FollowUpModal'
import { useSelector } from 'react-redux'

const DATA: any = [
  {
    score: 600,
    date: '11/10/2022',
    name: 'ABC',
    config: '3 BHK',
    budget: '60L',
    type: 'On Lead',
  },
  {
    score: 600,
    date: '11/10/2022',
    name: 'ABC',
    config: '3 BHK',
    budget: '60L',
    type: 'On Lead',
  },
  {
    score: 600,
    date: '11/10/2022',
    name: 'ABC',
    config: '3 BHK',
    budget: '60L',
    type: 'On Lead',
  },

];

const FollowUpView = (props: any) => {
  const loadingref = false
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation()
  const [FilterisVisible, setFilterisVisible] = useState(false)
  const { response = {}, list = '' } = useSelector((state: any) => state.followUp)
  const onPressView = (id: any) => {
    navigation.navigate('FollowUpDetails', id)
  }
  const onPressEdit = (data: any) => {
    navigation.navigate('EditFollowUp', data)
  }
  const onPressAllFollowUp = (data: any) => {
    navigation.navigate('AllFollowUpScreen', data)
  }

  const onRefresh = () => {
    props.setFilterData({
      startdate: '',
      enddate: '',
      search_by_name: '',
      search_by_location: '',
      status: ''
    })
    props.getFollowupList(0, [])
    // props.setFilter({})
  }
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR_DARK,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={"light-content"} />
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.followupHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      <View style={styles.followupItemView}>
        <FlatList
          data={props?.followUpList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <FollowUpItem items={item} onPressView={onPressView} onPressEdit={onPressEdit} onPressAllFollowUp={onPressAllFollowUp} />}
          onRefresh={() => onRefresh()}
          refreshing={loadingref}
          onEndReached={() => {
            if (props?.followUpList?.length < response?.total_data) {
              console.log('onEndReached: ');
              props.getFollowupList(props?.followUpList?.length > 2 ? props.offSET + 1 : 0,props?.followUpList )
            }
          }}
        />
      </View>
      <FilterModal Visible={FilterisVisible} setIsVisible={setFilterisVisible} />
    </View>
  )
}

export default FollowUpView