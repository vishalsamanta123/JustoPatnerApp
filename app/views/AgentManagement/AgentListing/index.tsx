import React from 'react';
import AgentView from './components/AgentView';

const AgentListing = ({navigation}: any) => {
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return <AgentView handleDrawerPress={handleDrawerPress} />;
};

export default AgentListing;
