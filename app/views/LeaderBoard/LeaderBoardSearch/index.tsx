import React from "react";
import LeaderBoardSearchView from "./components/LeaderBoardSearch";

const LeaderBoardSearchScreen = ({ navigation }: any) => {
    const DATA: any = [
        {
            projectname: 'CP Name 1',
            Location: 'Indore',
            rank: 5,
            sold_out: 234,
            status: 'Active'
        },
        {
            projectname: 'CP Name 2',
            Location: 'Indore',
            rank: 4,
            sold_out: 300,
            status: 'Deactive'
        },
        {
            projectname: 'CP Name 3',
            Location: 'Indore',
            rank: 3,
            sold_out: 100,
            status: 'Active'
        },
        {
            projectname: 'CP Name 4',
            Location: 'Indore',
            rank: 1,
            sold_out: 80,
            status: 'Deactive'
        },
    ];
    const onPressBack = () => {
        navigation.goBack()
    }
    return (
        <>
            <LeaderBoardSearchView
                onPressBack={onPressBack}
                DATA={DATA}
            />
        </>
    )
}
export default LeaderBoardSearchScreen