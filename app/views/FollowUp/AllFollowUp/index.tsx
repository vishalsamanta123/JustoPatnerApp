import React, { useEffect, useState } from "react";
import AllFollowUpView from "./Components/AllFollowUpView";
import { useFocusEffect } from "@react-navigation/native";
import {
  allfollowupRemove,
  getAllFollowUpList,
} from "app/Redux/Actions/FollowUpActions";
import { useDispatch, useSelector } from "react-redux";

const AllFollowUpScreen = ({ navigation, route }: any) => {
  const data = route?.params || {};
  const [allFollowUpList, setAllFollowUpList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.followUp
  );
  useFocusEffect(
    React.useCallback(() => {
      getFollowupList(offSET, []);
      return () => {};
    }, [navigation, list])
  );
  const getFollowupList = (offset: any, array: any) => {
    setOffset(offset);
    dispatch(
      getAllFollowUpList({
        offset: offset,
        limit: 10,
        lead_id: data?.lead_id,
      })
    );
  };
  useEffect(() => {
    if (response?.status === 200) {
      setAllFollowUpList(response?.data);
      // if (offSET == 0) {
      // } else {
      //   setAllFollowUpList([...array, ...response?.data])
      // }
    } else {
      setAllFollowUpList([]);
    }
  }, [response]);
  const onRefresh = () => {
    getFollowupList(offSET, []);
  };
  const toGetDatas = (array: any) => {};
  const handleBackPres = () => {
    navigation.goBack();
  };
  return (
    <>
      <AllFollowUpView
        handleBackPres={handleBackPres}
        allFollowUpList={allFollowUpList}
        getFollowupList={getFollowupList}
        setOffset={setOffset}
        offSET={offSET}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default AllFollowUpScreen;
