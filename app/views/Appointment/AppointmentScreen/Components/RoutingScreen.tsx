import { View, Text, FlatList } from 'react-native'
import React from 'react'
import VisitorAppointment from './VisitorAppointment';
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';
import strings from 'app/components/utilities/Localization';
import SmAppointment from './SmAppointment';

const RoutingScreen = (props: any) => {
console.log('props?.response?.total_data: ', props?.response?.total_data);
    return (
        <FlatList
            data={Array.isArray(props?.appointmentList) ? props?.appointmentList : []}
            renderItem={({ item }) => (
                <VisitorAppointment
                    items={item}
                    onPressView={props?.onPressView}
                    onPressEdit={props?.onPressEdit}
                />
            )}
            ListEmptyComponent={
                <EmptyListScreen message={strings.VisitorAppointment} />
            }
            onRefresh={() => {
                props?.setFilterData({
                    start_date: "",
                    end_date: "",
                    customer_name: "",
                    status: "",
                });
                props.keyType === 'first' ?
                props?.getAppointmentList(0, props.todayAppointment) :  props?.getAppointmentList(0, {})
                props?.setAppointmentList([]);
                props.settype('')
            }}
            refreshing={props?.loadingref}
            onEndReached={() => {
                if (props?.appointmentList?.length < props?.response?.total_data) {
                    props?.getAppointmentList(props?.appointmentList?.length > 9 ? props?.offSET + 1 : 0,
                        props.keyType === 'first' ? props.todayAppointment : props.filterData);
                }
            }}
        />
    )
}

export default RoutingScreen