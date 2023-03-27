import React, { useEffect, useState } from 'react'
import SupportView from './components/SupportView';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getTicketList } from 'app/Redux/Actions/SupportActions';
import strings from 'app/components/utilities/Localization';

const SupportScreen = ({ navigation }: any) => {
    const [ticketList, setTicketList] = useState<any>([]);
    const [offSET, setOffset] = useState(0);
    const dispatch: any = useDispatch();
    const { response = {}, list = false } = useSelector((state: any) => state.SupportData)
    const totalData = response?.total_data || 0
    const [filterData, setFilterData] = useState({
        startdate: "",
        enddate: "",
    });
    useEffect(() => {
        if (response?.status === 200) {
        if(response?.data?.length > 0){
            if (offSET === 0 || offSET === undefined) {
                setTicketList(response?.data);
            } else {
                setTicketList([...ticketList, ...response?.data]);
            }
        }else {
            setTicketList([])
        }
        } else {
            setTicketList([])
        }
    }, [response]);

    const TicketList = (offset: any, data: any) => {
        setOffset(offset);
        dispatch(
            getTicketList({
                offset: offset,
                limit: 3,
                search_type: data?.type,
                start_date: data?.startdate ? data?.startdate : '',
                end_date: data?.enddate ? data?.enddate : '',
            })
        );
    };
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    const handleAddTicket = () => {
        navigation.navigate('AddTicket');
    };
    const handleEditTicket = (data: any) => {
        navigation.navigate('AddTicket', { data: data, type: strings.edit });
    }
    const onPressStatusUpdate = (data: any) => {
        navigation.navigate('TicketStatusUpdate', data)
    }
    const onPressEscalate = (data: any) => {
        navigation.navigate('Escalate', data)
    }
    return (
        <>
            <SupportView
                handleDrawerPress={handleDrawerPress}
                handleAddTicket={handleAddTicket}
                ticketList={ticketList}
                setTicketList={setTicketList}
                offSET={offSET}
                setOffset={setOffset}
                filterData={filterData}
                setFilterData={setFilterData}
                TicketList={TicketList}
                handleEditTicket={handleEditTicket}
                totalData={totalData}
                onPressStatusUpdate={onPressStatusUpdate}
                onPressEscalate={onPressEscalate}
            />
        </>
    )
}

export default SupportScreen