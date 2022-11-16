import React, { useEffect, useLayoutEffect } from 'react';
import AgentDetailView from './components/AgentDetailView';
import { useDispatch } from 'react-redux';
import { getAgentDetail } from 'app/Redux/Actions/AgentActions';

const AgentDetail = ({ navigation, }: any) => {
  const dispatch: any = useDispatch()
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <AgentDetailView handleBackPress={handleBackPress} />
  )
}
export default AgentDetail;
