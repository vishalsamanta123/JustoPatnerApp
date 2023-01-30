import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RED_COLOR } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import AddAppointmentItem from './AddAppointmentItem';
import ErrorMessage from 'app/components/ErrorMessage';
import { useSelector } from 'react-redux';

const AddAppointmentView = (props: any) => {
    const insets = useSafeAreaInsets();
    const { response = {} } = useSelector((state: any) => state.appointment)
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={props?.type == strings.edit ? strings.editNewappointment : strings.addNewappointment}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={() => props.handleBackPress()}
                headerStyle={styles.headerStyle}
            />
            <View style={styles.AddAppointmentView}>
                <AddAppointmentItem
                    handleBtnPress={props.handleBtnPress}
                    setAddAppointmentForm={props.setAddAppointmentForm}
                    addAppointmentForm={props.addAppointmentForm}
                    getVisitorsList={props.getVisitorsList}
                    visitorList={props.visitorList}
                    isloading={props.isloading}
                    type={props?.type}
                    allProperty={props.allProperty}
                    PropertyStatus={props.PropertyStatus}
                    setPropertyStatus={props.setPropertyStatus}
                />
            </View>
        </View>
    )
}

export default AddAppointmentView