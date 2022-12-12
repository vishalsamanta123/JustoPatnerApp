import React from "react";
import images from "../../../assets/images";
import LeaderBoardView from './components/LeaderBoard'

const LeaderBoardScreen = ({ navigation }: any) => {
    const DATA: any = [
        {
            projectname: 'Project Name 1',
            projectImg: images.buildings,
            Location: 'Indore',
            rerano: '123566648',
            totalFlat: 500,
            sold_out: 234,
            status: 'Active'
        },
        {
            projectname: 'Project Name 2',
            projectImg: images.loginBanner,
            Location: 'Indore',
            rerano: '123566648',
            totalFlat: 400,
            sold_out: 300,
            status: 'Deactive'
        },
        {
            projectname: 'Project Name 3',
            projectImg: images.buildings,
            Location: 'Indore',
            rerano: '123566648',
            totalFlat: 300,
            sold_out: 100,
            status: 'Active'
        },
        {
            projectname: 'Project Name 4',
            projectImg: images.loginBanner,
            Location: 'Indore',
            rerano: '123566648',
            totalFlat: 123,
            sold_out: 80,
            status: 'Deactive'
        },
    ];
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    const handleView = () => {
        navigation.navigate('LeaderBoardSearch')
    }
    return (
        <>
            <LeaderBoardView
                DATA={DATA}
                handleDrawerPress={handleDrawerPress}
                handleView={handleView}
            />
        </>
    )
}
export default LeaderBoardScreen