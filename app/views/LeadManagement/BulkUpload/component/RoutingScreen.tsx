import React from 'react'
import { FlatList } from 'react-native'
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';
import strings from 'app/components/utilities/Localization';
import ImageCsvDataView from './ImageCsvData';

const RoutingScreen = (props: any) => {
    return (
        <FlatList
            data={Array.isArray(props?.listData) ? props?.listData : []}
            renderItem={({ item }) => (
                <ImageCsvDataView
                    items={item}
                    keyType={props.keyType}
                />
            )}
            ListEmptyComponent={
                <EmptyListScreen message={
                    props.keyType === 'first' ?
                        strings.byImage : strings.byCsv} />
            }
            onRefresh={() => {
                props?.getImagesList(0)
                props?.setListData([]);
            }}
            refreshing={false}
            onEndReached={() => {
                if (props?.listData?.length < props?.moreData) {
                    props?.getImagesList(props?.listData?.length > 9 ? props?.offSET + 1 : 0);
                }
            }}
        />
    )
}

export default RoutingScreen