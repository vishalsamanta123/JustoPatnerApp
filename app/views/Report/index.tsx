import React from 'react'
import ReportView from './components/ReportView'

const ReportScreen = ({ navigation }: any) => {
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    return (
        <>
            <ReportView
                handleDrawerPress={handleDrawerPress}
            />
        </>
    )
}

export default ReportScreen