import { View, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropertyListItem from './PropertyListItem';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import ConfirmModal from '../../../../components/Modals/ConfirmModal';
import FilterModal from './FilterModel';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMaster } from 'app/Redux/Actions/MasterActions';
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';


const PropertyView = (props: any) => {
  const dispatch: any = useDispatch()
  const [isVisible, setIsVisible] = useState(false)
  const [masterDataShow, setMasterDataShow] = useState([])


  const [FilterisVisible, setFilterisVisible] = useState(false)
  const [propertyList, setPropertyList] = useState([])
  const insets = useSafeAreaInsets();
  const propertyData = useSelector((state: any) => state.propertyData) || {}
  const masterData = useSelector((state: any) => state.masterData) || {}
  const navigation: any = useNavigation()
  const [loadingref, setLoadingref] = useState(false);

  const [filterform, setFilterform] = useState({
    start_date: "",
    end_date: "",
    location: "",
    property_name: "",
    property_type: "",
  });


  useEffect(() => {
    if (propertyData?.response) {
      const { response, loading } = propertyData;
      if (response?.status === 200 || loading) {
        setPropertyList(response?.data);
      } else {
        setPropertyList([]);
        //errorToast(response.message);
      }
    }
  }, [propertyData]);

  useEffect(() => {
    if (masterData?.response) {
      const { response } = masterData;
      if (response?.status === 200) {
        setMasterDataShow(response?.data);
      } else {
        setMasterDataShow([]);
        //errorToast(response.message);
      }
    }
  }, [masterData]);




  const onPressView = (items: any) => {
    navigation.navigate('PropertyDetails', items)
  }
  const onRefresh = () => {
    props.getallproperty()
    setFilterform({
      ...props.filterform,
      start_date: "",
      end_date: "",
      location: "",
      property_name: "",
      property_type: "",
    });
  }
  const confirmStatus = (items: any) => {
    if (items.approve_status === 2) {
      dispatch(getAllMaster({
        type: 7
      }))
    }
    setIsVisible(true)
    props.setCurrentStatus(items.approve_status)
    props.setCurrentProperty(items?.property_id)

  }

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loadingref ? (
          <ActivityIndicator
            color="black"
            style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>

      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.propertyHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      <View style={styles.propertyListView}>
        <FlatList
          data={Array.isArray(propertyList) ? propertyList : []}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyListScreen message={strings.propertyHeader} />}
          renderItem={({ item }) => <PropertyListItem items={item} setIsVisible={setIsVisible} onPressView={onPressView}
            confirmStatus={(items: any) => confirmStatus(items)} />}
          /*   onEndReached={({ distanceFromEnd }) => {
              props.Onreachedend()
            }} 
            onEndReachedThreshold={0.5} */
          //ListFooterComponent={renderFooter}
          onRefresh={() => onRefresh()}
          refreshing={loadingref}
        />
      </View>
      {/* <ConfirmModal Visible={isVisible} setIsVisible={setIsVisible} /> */}
      <ConfirmModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        handleNoPress={() => {
          //props.setChangeStatus({ _id: '', status: false })
          setIsVisible(false)
        }}
        handleYesPress={() => {
          setIsVisible(false)
          props.handleStatusChange()
        }}
        handleConfirmPress={() => {
          setIsVisible(false)
          props.handleStatusChange()
        }}
        setResion={props.setResion}
        resion={props.resion}
        masterDataShow={masterDataShow}
        stringshow={strings.confirmation}
        textshow={strings.deactivconfirmation + ' ' + strings.agencyHeader + '?'}

        confirmtype={props.currentStatus === 2 ? '' : 'CONFIRMATION'}
      />


      <FilterModal
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        filterform={filterform}
        setFilterform={setFilterform}

      />
    </View>
  );
};

export default PropertyView;
