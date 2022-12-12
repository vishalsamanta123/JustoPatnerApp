import React from 'react'
import SupportView from './components/SupportView';

const SupportScreen = ({ navigation }: any) => {
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    return (
        <>
            <SupportView
                handleDrawerPress={handleDrawerPress}
            />
        </>
    )
}

export default SupportScreen