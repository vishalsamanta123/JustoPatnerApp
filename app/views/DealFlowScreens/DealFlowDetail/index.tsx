import React, { useEffect, useLayoutEffect, useState } from 'react';
import DealFlowDetail from './components/DealFlowDetail';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardData, generateQrCode, userStatusUpdateData, userStatusUpdater } from 'app/Redux/Actions/Dashboard';
import ErrorMessage from 'app/components/ErrorMessage';
import { GREEN_COLOR } from 'app/components/utilities/constant';
import { useFocusEffect } from '@react-navigation/native';
import { getChatListForProperty } from 'app/Redux/Actions/ChatActions';
import { Alert, BackHandler } from 'react-native';
import { dealFlowDetailData } from 'app/Redux/Actions/DealFlowAction';

const DealFlowDetailScreen = ({ navigation, route }: any) => {
  const detailData = route?.params || {}
  const dispatch: any = useDispatch()
  const { response = {}, data = false } = useSelector((state: any) => state.dealFlow) || {}
  const [dealFlowDetail, setDealFlowDetail] = useState<any>({})

  useLayoutEffect(() => {
    setDealFlowDetail({})
    if (detailData?.property_id) {
      dispatch(dealFlowDetailData({
        property_id: detailData?.property_id
      }))
    }
  }, [detailData])
  useEffect(() => {
    if (response?.status === 200) {
      setDealFlowDetail(response.data[0])
    }
  }, [response])
  const handleBackPress = () => {
    navigation.goBack()
  };

  return <DealFlowDetail
    handleBackPress={handleBackPress}
    dealFlowDetail={dealFlowDetail}
  />;
};

export default DealFlowDetailScreen;
