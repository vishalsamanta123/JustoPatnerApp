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
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen'


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



  return (
    <View style={styles.mainContainer}>
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
          data={Array.isArray(props?.followUpList) ? props?.followUpList : []}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <FollowUpItem items={item} onPressView={onPressView} onPressEdit={onPressEdit} onPressAllFollowUp={onPressAllFollowUp} />}
          onRefresh={() => props.onRefresh()}
          refreshing={loadingref}
          ListEmptyComponent={<EmptyListScreen message={strings.followup} />}
          onEndReached={() => {
            if (props?.followUpList?.length < response?.total_data) {
              props.getFollowupList(props?.followUpList?.length > 2 ? props.offSET + 1 : 0, props.filterData)
            }
          }}
        />
      </View>
      <FilterModal
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        setFilterData={props.setFilterData}
        filterData={props.filterData}
        handleFilterApply={props.handleFilterApply}
      />
    </View>
  )
}

export default FollowUpView