import { View, Text, FlatList } from 'react-native'
import React from 'react'
import SupportItem from './SupportItem';
import strings from 'app/components/utilities/Localization';
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';

const RoutingScreen = (props: any) => {
    return (
        <>
            {props.keyType === 'first' ?
                <FlatList
                    data={Array.isArray(props.ticketList) ? props.ticketList : []}
                    renderItem={({ item }) => (
                        <SupportItem
                            items={item}
                            index={props?.index}
                            onPressView={props?.onPressView}
                            onPressStatusUpdate={props.onPressStatusUpdate}
                            onPressEscalate={props.onPressEscalate}
                        />
                    )}
                    ListEmptyComponent={
                        <EmptyListScreen message={strings.supportrequest} />
                    }
                    onRefresh={() => {
                        props.setFilterData({
                            start_date: "",
                            end_date: "",
                            customer_name: "",
                            status: "",
                        });
                        props.TicketList(0, { type: 2 });
                    }}
                    onEndReached={() => {
                        if (props.ticketList?.length < props.totalData) {
                            props.TicketList(props.ticketList?.length > 2 ? props.offSET + 1 : 0,
                                { type: 2 });
                        }
                    }}
                    refreshing={false}
                /> :
                <FlatList
                    data={Array.isArray(props.ticketList) ? props.ticketList : []}
                    renderItem={({ item }) => (
                        <SupportItem
                            items={item} index={props?.index}
                            onPressView={props?.onPressView}
                            handleEditTicket={props.handleEditTicket}
                        />
                    )}
                    ListEmptyComponent={
                        <EmptyListScreen message={strings.myticket} />
                    }
                    onRefresh={() => {
                        props.setFilterData({
                            start_date: "",
                            end_date: "",
                            customer_name: "",
                            status: "",
                        });
                        props.TicketList(0, { type: 1 });
                    }}
                    onEndReached={() => {
                        if (props.ticketList?.length < props.totalData) {
                            props.TicketList(
                                props.ticketList?.length > 2 ? props.offSET + 1 : 0,
                                { type: 1 }
                            );
                        }
                    }}
                    refreshing={false}
                />
            }
        </>
    )
}

export default RoutingScreen