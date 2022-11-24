import React, { useState } from 'react'
import AllFollowUpView from './Components/AllFollowUpView'
import { useFocusEffect } from '@react-navigation/native'
import { getAllFollowUpList } from 'app/Redux/Actions/FollowUpActions'
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
      limit: 4,
      lead_id: data?.lead_id
    }))
    toGetDatas(array)
  }
  const toGetDatas = (array: any) => {
    if (list) {
      setIsloading(false)
      if (offSET == 0) {
        setAllFollowUpList(response?.data)
      } else {
        setAllFollowUpList([...array, ...response?.data])
      }
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
      />
    </>
  )
}

export default AllFollowUpScreen