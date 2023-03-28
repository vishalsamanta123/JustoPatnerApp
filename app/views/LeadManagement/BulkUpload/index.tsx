import { useFocusEffect } from '@react-navigation/native';
import strings from 'app/components/utilities/Localization';
import { getBulkVisitList, getBulkVisitVerify } from 'app/Redux/Actions/LeadsActions';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BulkUploadView from './component/BulkUpload'

const BulkUploadScreen = ({ navigation }: any) => {
    const bulkData = useSelector((state: any) => state.visitorData) || {};
    const moreData = bulkData?.response?.total_data || 0
    const dispatch: any = useDispatch();
    const [offSET, setOffset] = useState(0)
    const [listData, setListData] = useState<any>([])
    const [indexData, setIndexData] = useState({
        index: 0,
        routes: [
            { key: "first", title: strings.byImage },
            { key: "second", title: strings.byCsv },
        ],
    });
    const handleIndexChange = (index: any) => {
        setOffset(0)
        setListData([])
        setIndexData({
            index: index,
            routes: [
                { key: "first", title: strings.byImage },
                { key: "second", title: strings.byCsv },
            ],
        });
    };
    useFocusEffect(
        React.useCallback(() => {
            getImagesList(0)
            return () => { };
        }, [navigation, indexData])
    );
    useEffect(() => {
        if (bulkData?.response?.status === 200) {
            setListData(bulkData?.response?.data)
            if (offSET === 0) {
                setListData(bulkData?.response?.data)
            } else {
                setListData([...listData, ...bulkData?.response?.data])
            }
        } else {
            setListData([])
        }
    }, [indexData, bulkData])
    const getImagesList = (offset: any) => {
        setOffset(offset)
        if (indexData?.index === 1) {
            dispatch(getBulkVisitVerify({
                offset: offset,
                limit: 10,
            }));
        } else {
            dispatch(getBulkVisitList({
                offset: offset,
                limit: 10,
            }));
        }
    };
    const handleNewUpload = () => {
        navigation.navigate("BulkUpload")
    }
    const handleBackPress = () => {
        navigation.goBack();
    };
    return (
        <BulkUploadView
            handleNewUpload={handleNewUpload}
            handleBackPress={handleBackPress}
            handleIndexChange={handleIndexChange}
            indexData={indexData}
            listData={listData}
            getImagesList={getImagesList}
            moreData={moreData}
            offSET={offSET}
            setListData={setListData}
        />
    )
}

export default BulkUploadScreen
