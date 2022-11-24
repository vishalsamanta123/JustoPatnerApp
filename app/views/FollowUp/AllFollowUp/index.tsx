import React, { useState } from 'react'
import AllFollowUpView from './Components/AllFollowUpView'
import { useFocusEffect } from '@react-navigation/native'
import { allfollowupRemove, getAllFollowUpList } from 'app/Redux/Actions/FollowUpActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'app/components/CommonScreen/Loader'

const AllFollowUpScreen = ({ navigation, route }: any) => {
  const data = route?.params || {}
  const [isloading, setIsloading] = useState(false)
  const [allFollowUpList, setAllFollowUpList] = useState<any>([])
  const [offSET, setOffset] = useState(0)
  const dispatch: any = useDispatch()
  const { response = {}, list = '' } = useSelector((state: any) => state.followUp)
  useFocusEffect(
    React.useCallback(() => {
      getFollowupList(offSET, [])
      return () => { };
    }, [navigation, list])
  );
  const getFollowupList = (offset: any, array: any) => {
    setIsloading(true)
    setOffset(offset)
    dispatch(getAllFollowUpList({
      offset: offset,
      limit: 10,
      lead_id: data?.lead_id
    }))
    toGetDatas(array)
  }
  const toGetDatas = (array: any) => {
    if (response?.status) {
      setIsloading(false)
      setAllFollowUpList(response?.data)
      // if (offSET == 0) {
      // } else {
      //   setAllFollowUpList([...array, ...response?.data])
      // }
    }
  }
  const handleBackPres = () => {
    navigation.goBack()
  }
  return (
    <>
      {isloading ? <Loader /> : null}
      <AllFollowUpView
        handleBackPres={handleBackPres}
        allFollowUpList={allFollowUpList}
        getFollowupList={getFollowupList}
        setOffset={setOffset}
        offSET={offSET}
      />
    </>
  )
}

export default AllFollowUpScreen