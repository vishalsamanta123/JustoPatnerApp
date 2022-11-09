import React from 'react';
import PendingAgentView from './components/PendingAgentView';

const PendingAgentListing = ({navigation}: any) => {
  
  const handleBackPress = () => {
    navigation.goBack();
  };
  return <PendingAgentView handleBackPress={handleBackPress} />;
};

export default PendingAgentListing;
