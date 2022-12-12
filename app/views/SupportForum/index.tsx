import React from 'react'
import SupportForumView from './components/SupportForumView'

const SupportForumScreen = ({ navigation }: any) => {
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    return (
        <>
            <SupportForumView
                handleDrawerPress={handleDrawerPress}
            />
        </>
    )
}

export default SupportForumScreen