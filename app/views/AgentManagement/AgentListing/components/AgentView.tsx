import { View, Text, StatusBar, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
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
import EmptyListScreen from '../../../../components/CommonScreen/Empty'
import { PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant';
import { BLACK_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR, } from '../../../../components/utilities/constant';

const AgentView = (props: any) => {
  const loadingref = false
  const agentData = useSelector((state: any) => state.agentData)
  const moreData = Number(agentData?.response?.total_data)
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
    props.getAgentList()
  }
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR_DARK,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={'light-content'} />
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
      {loadingref ? (
        <View style={styles.footer}>
          <ActivityIndicator
            color="black"
            style={{ margin: 15 }} />
        </View>
      ) : null}
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
            data={props?.agentList}
            ListEmptyComponent={<EmptyListScreen message={strings.agent} />}
            renderItem={({ item }) => <AgentListItem items={item} setIsVisible={setIsVisible}
              onPressView={props.onPressView}
              setChangeStatus={props.setChangeStatus}
            />}
            onEndReached={() => {
              if (agentData?.response?.data?.length < moreData) {
                props.Onreachedend(agentData?.response?.data?.length > 3 ?
                  props.offset + 1 : 0)
              }
            }}
            onRefresh={() => onRefresh()}
            refreshing={loadingref}
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
        setFilter={props.setFilter}
      />
    </View>
  );
};

export default AgentView;
