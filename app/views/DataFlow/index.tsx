import React from 'react'
import DataFlowView from './components/DataView';

const DataFlowScreen = ({ navigation }: any) => {
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    return (
        <>
            <DataFlowView
                handleDrawerPress={handleDrawerPress}
            />
        </>
    )
}

export default DataFlowScreen