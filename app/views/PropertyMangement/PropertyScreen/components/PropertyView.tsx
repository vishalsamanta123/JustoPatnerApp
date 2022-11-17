import { View, Text, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropertyListItem from './PropertyListItem';
import EmptyListScreen from '../../../../components/CommonScreen/Empty';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import ConfirmModal from '../../../../components/Modals/ConfirmModal';
import { PRIMARY_THEME_COLOR_DARK, PRIMARY_THEME_COLOR } from '../../../../components/utilities/constant';
import FilterModal from './FilterModel';
import { useSelector } from 'react-redux';


const PropertyView = (props: any) => {
  const [isVisible, setIsVisible] = useState(false)
  const [FilterisVisible, setFilterisVisible] = useState(false)
  const [propertyList, setPropertyList] = useState([])
  const insets = useSafeAreaInsets();
  const propertyData = useSelector((state: any) => state.propertyData) || {}
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
      if (response?.status === 200) {
        setPropertyList(response?.data);
        props.setIsloading(loading);
      } else {
        setPropertyList([]);
        //errorToast(response.message);
      }
    }
  }, [propertyData]);





  const DATA: any = [
    {
      Projectname: 'ABC',
      Location: 'Indore',
      visitor: 123,
      siteVisit: 234,
      closeVisit: 600,
      status: 'confirmatin Pending',
      createddate: '11/10/2022'
    },
    {
      Projectname: 'ABC',
      Location: 'Indore',
      visitor: 123,
      siteVisit: 234,
      closeVisit: 600,
      status: 'Subscribe',
      createddate: '11/10/2022'
    },
    {
      Projectname: 'ABC',
      Location: 'Indore',
      visitor: 123,
      siteVisit: 234,
      closeVisit: 600,
      status: 'Unsubscribe',
      createddate: '11/10/2022'
    },
    {
      Projectname: 'ABC',
      Location: 'Indore',
      visitor: 123,
      siteVisit: 234,
      closeVisit: 600,
      status: 'confirmatin Pending ',
      createddate: '11/10/2022'
    },
  ];

  const onPressView = (items: any) => {
    navigation.navigate('PropertyDetails', items)
  }
  const onRefresh = () => {
    props.getallproperty()
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
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={'light-content'} />

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
          data={propertyList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyListScreen message={strings.propertyHeader} />}
          renderItem={({ item }) => <PropertyListItem items={item} setIsVisible={setIsVisible} onPressView={onPressView} />}
          /*   onEndReached={({ distanceFromEnd }) => {
              props.Onreachedend()
            }} 
            onEndReachedThreshold={0.5} */
          //ListFooterComponent={renderFooter}
          onRefresh={() => onRefresh()}
          refreshing={loadingref}
        />
      </View>
      <ConfirmModal Visible={isVisible} setIsVisible={setIsVisible} />
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
