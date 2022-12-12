import { View, Text, StatusBar, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AgentListItem from './AgentListItem';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import ConfirmModal from '../../../../components/Modals/ConfirmModal';
import FilterModal from './AgentFilterModel';
import { useSelector } from 'react-redux';
import { PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant';
import { BLACK_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR, } from '../../../../components/utilities/constant';
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';

const AgentView = (props: any) => {
  const loadingref = false
  const [isVisible, setIsVisible] = useState(false)
  const [FilterisVisible, setFilterisVisible] = useState(false)
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation()
  const DATA: any = [
    {
      Projectname: 'ABC',
      Location: 'Indore',
      rerano: '123566648',
      visitor: 123,
      siteVisit: 234,
      closeVisit: 600,
      status: 'Active'
    },
    {
      Projectname: 'ABC',
      Location: 'Indore',
      rerano: '123566648',
      visitor: 123,
      siteVisit: 234,
      closeVisit: 600,
      status: 'Deactive'
    },
    {
      Projectname: 'ABC',
      Location: 'Indore',
      rerano: '123566648',
      visitor: 123,
      siteVisit: 234,
      closeVisit: 600,
      status: 'Active'
    },
    {
      Projectname: 'ABC',
      Location: 'Indore',
      rerano: '123566648',
      visitor: 123,
      siteVisit: 234,
      closeVisit: 600,
      status: 'Deactive'
    },
  ];
  const ShowPendinglist = () => {
    navigation.navigate('PendingAgentList')
  }
  const onPressAddnewAgent = (type: any) => {
    navigation.navigate('AddnewAgent', { type })
  }
  const onRefresh = () => {
    props.setFilterData({
      startdate: '',
      enddate: '',
      search_by_name: '',
      search_by_location: '',
      status: ''
    })
    props.getAgentList(0, {})
  }
  const onReset = () => {
    props.setFilterData({
      startdate: '',
      enddate: '',
      search_by_name: '',
      search_by_location: '',
      status: ''
    })
    props.getAgentList(0, {})
  }
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.agencyHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      <View style={styles.propertyListView}>
        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => onPressAddnewAgent('add')}
            style={[styles.button, { borderColor: BLACK_COLOR, backgroundColor: PRIMARY_THEME_COLOR }]} >
            <Text style={[styles.buttonTxt, {
              color: WHITE_COLOR
            }]}>{strings.addnewagent}</Text>

          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => ShowPendinglist()}
            style={[styles.button, { borderColor: BLACK_COLOR, backgroundColor: PRIMARY_THEME_COLOR }]} >
            <Text style={[styles.buttonTxt, {
              color: WHITE_COLOR
            }]}>{strings.pendingconfirm}</Text>

          </TouchableOpacity> */}
        </View>
        <View style={styles.propertyListViewsec}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Array.isArray(props?.agentList) ? props?.agentList : []}
            ListEmptyComponent={<EmptyListScreen message={strings.agent} />}
            renderItem={({ item }) =>
              <AgentListItem items={item} setIsVisible={setIsVisible}
                onPressView={props.onPressView}
                setChangeStatus={props.setChangeStatus}
              />
            }
            onEndReached={() => {
              if (props?.agentList?.length < props?.moreData) {
                props.getAgentList(props?.agentList?.length > 2 ?
                  props.offSET + 1 : 0, props.filterData)
              }
            }}
            refreshing={loadingref}
            onRefresh={() => onRefresh()}
          />
        </View>
      </View>
      <ConfirmModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        handleNoPress={() => {
          props.setChangeStatus({ _id: '', status: false })
          setIsVisible(false)
        }}
        handleYesPress={() => {
          setIsVisible(false)
          props.handleStatusChange()
        }}
        stringshow={strings.confirmation}
        textshow={strings.deactivconfirmation + ' ' + strings.agencyHeader + '?'}
        confirmtype={'CONFIRMATION'}
      />
      <FilterModal
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        setFilterData={props.setFilterData}
        filterData={props.filterData}
        getAgentList={() => props.getAgentList(0, props.filterData)}
        onReset={onReset}
      />
    </View>
  );
};

export default AgentView;
