import { View, Text, FlatList } from 'react-native'
import React from 'react'
import VisitorAppointment from './VisitorAppointment';
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';
import strings from 'app/components/utilities/Localization';
import SmAppointment from './SmAppointment';

const RoutingScreen = (props: any) => {
    return (
        <>
            {props.keyType === 'first' ?
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
                        props?.getAppointmentList(0, {});
                        props?.setAppointmentList([]);
                    }}
                    refreshing={props?.loadingref}
                    onEndReached={() => {
                        if (props?.appointmentList?.length < props?.response?.total_data) {
                            props?.getAppointmentList(props?.appointmentList?.length > 2 ? props?.offSET + 1 : 0,
                                props?.filterData);
                        }
                    }}
                />
                :
                <FlatList
                    data={Array.isArray(props?.userAppointmentList) ? props?.userAppointmentList : []}
                    renderItem={({ item }) => (
                        <SmAppointment
                            items={item}
                            hanndleUserDetailPress={props?.hanndleUserDetailPress}
                            handleOptionPress={props?.handleOptionPress}
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
                        props?.handleUserAppointmentList(1);
                        props?.setUserAppointmentList([]);
                    }}
                    refreshing={props?.loadingref}
                />
            }
        </>

    )
}

export default RoutingScreen