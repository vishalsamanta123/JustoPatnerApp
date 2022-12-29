import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { learderBoardDetailData } from "app/Redux/Actions/LeaderBoardAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeaderBoardSearchView from "./components/LeaderBoardSearch";

const LeaderBoardSearchScreen = ({ navigation, route }: any) => {
    const routeData = route?.params || {}
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.leaderBoard) || {}
    const [userDataResp, setUserDataResp] = useState<any>({})
    const [leaderBoardDetail, setLeaderBoardDetail] = useState<any>({})
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
    useFocusEffect(
        React.useCallback(() => {
            if (routeData?.property_id) {
                getLeaderBoardCP()
            }
            return () => { };
        }, [navigation, routeData])
    );
    const getLeaderBoardCP = async () => {
        const userData: any = await AsyncStorage.getItem("loginData");
        if (JSON?.parse(userData)?.data) {
            setUserDataResp(JSON.parse(userData)?.data)
        }
        dispatch(learderBoardDetailData({
            property_id: routeData?.property_id
        }))
    }
    useEffect(() => {
        if (response?.status === 200) {
            setLeaderBoardDetail(response?.data[0])
        } else {
            setLeaderBoardDetail({})
        }
    }, [response])

    const onPressBack = () => {
        navigation.goBack()
    }
    return (
        <>
            <LeaderBoardSearchView
                onPressBack={onPressBack}
                leaderBoardDetail={leaderBoardDetail}
                userDataResp={userDataResp}
            />
        </>
    )
}
export default LeaderBoardSearchScreen