import { View, Text, StatusBar, FlatList, TouchableOpacity } from 'react-native';
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
import { PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant';
import { BLACK_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR, } from '../../../../components/utilities/constant';

const AgentView = (props: any) => {
  const agentData = useSelector((state: any) => state.agentData)
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

  const onPressView = () => {
    navigation.navigate('AgentDetails')
  }
  const ShowPendinglist = () => {
    navigation.navigate('PendingAgentList')
  }
  const onPressAddnewAgent = () => {
    navigation.navigate('AddnewAgent')
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
      <View style={styles.propertyListView}>

        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => onPressAddnewAgent()}
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
            data={agentData?.response?.data}
            renderItem={({ item }) => <AgentListItem items={item} setIsVisible={setIsVisible} onPressView={onPressView}
              onPressAddnewAgent={onPressAddnewAgent}
              setChangeStatus={props.setChangeStatus}
              setFilterData={props.setFilterData}
              filterData={props.filterData}
            />}
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
      <FilterModal Visible={FilterisVisible} setIsVisible={setFilterisVisible} />
    </View>
  );
};

export default AgentView;
