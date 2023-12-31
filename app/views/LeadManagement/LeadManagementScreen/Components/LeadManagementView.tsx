import { View, Text, FlatList, StatusBar, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import styles from "./Styles";
import images from "../../../../assets/images";
import ConfirmModal from "../../../../components/Modals/ConfirmModal";
import { PRIMARY_THEME_COLOR_DARK } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import PropertyListItem from "../../../PropertyMangement/PropertyScreen/components/PropertyListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../../components/Header";
import Button from "../../../../components/Button";
import LeadManagementItem from "./LeadManagementItem";
import { useNavigation } from "@react-navigation/native";
import FilterModal from "./LeadManagementModal";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import usePermission from "app/components/utilities/UserPermissions";

const LeadManagementView = (props: any) => {
  const loadingref = false
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation()
  const [FilterisVisible, setFilterisVisible] = useState(false)

  const onPressView = (data: any) => {
    navigation.navigate('LeadDetails', data)
  }

  const onPressEdit = (data: any) => {
    navigation.navigate('AddNewVisitorScreen', { type: 'edit', data })
  }

  const onRefresh = () => {
    props.setFilterData({
      startdate: '',
      enddate: '',
      search_by_name: '',
      search_by_location: '',
      status: '',
      lead_status: ''
    })
    props.getVisitorsList(0, {})
    props.setVisiitorList([])
  }
  const { create, status } = usePermission({
    create: 'add_visitor',
    status: 'bulk_upload',
  })
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.visitor}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      <View style={[styles.TopBtnView, {
        justifyContent: create && status ? "center" : 'flex-end',
        flexWrap: 'wrap'
      }]}>
        {status &&
          (<Button
            buttonText={strings.bulkupload}
            width={150}
            height={30}
            btnTxtsize={15}
            handleBtnPress={props.handleBulkUploadPress}
          />)
        }
        {create &&
          (<Button
            buttonText={strings.addnewvisitor}
            width={150}
            height={30}
            btnTxtsize={15}
            handleBtnPress={props.handleAddNewPress}
          />)
        }
        <View style={{marginTop: 10}}>
          <Button
              buttonText={strings.resetToday}
              width={150}
              height={30}
              btnTxtsize={15}
              handleBtnPress={onRefresh}
            />
        </View>
      </View>
      <View style={styles.propertyListView}>
        <FlatList
          data={Array.isArray(props?.visitorList) ? props?.visitorList : []}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            <LeadManagementItem
              items={item}
              onPressView={onPressView}
              onPressEdit={onPressEdit} />
          }
          onEndReached={() => {
            if (props?.visitorList?.length < props?.moreData) {
              props.getVisitorsList(props?.visitorList?.length > 9 ?
                props.offSET + 1 : 0, props.filterData)
            }
          }}
          onRefresh={() => onRefresh()}
          refreshing={loadingref}
          ListEmptyComponent={() => (
            <EmptyListScreen message={strings.visitor} />
          )}
        />
      </View>
      {/* <ConfirmModal Visible={isVisible} setIsVisible={setIsVisible} /> */}
      <FilterModal
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        setFilterData={props.setFilterData}
        filterData={props.filterData}
        setVisiitorList={props.setVisiitorList}
        onRefresh={() => onRefresh()}
        getVisitorsList={() => props.getVisitorsList(props.offSET, props.filterData)}
      />
    </View>
  );
};

export default LeadManagementView;
