import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import styles from './Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import AppointmentDtailsItem from './AppointmentDtailsItem';
import Button from '../../../../components/Button';
import { useSelector } from 'react-redux';

const AppointmentDetailsView = (props: any) => {
    const insets = useSafeAreaInsets();
    const { response = {}, detail = "" } = useSelector((state: any) => state.appointment)
    console.log('response: ', response);
    return (
        <View style={styles.mainContainer}>
            <View
                style={{
                    backgroundColor: PRIMARY_THEME_COLOR_DARK,
                    height: insets.top,
                }}
            />
            <StatusBar barStyle={"light-content"} />
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.appointmnetdetail}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                headerStyle={styles.headerStyle}
            />
            <View style={styles.propertyListView}>
                <AppointmentDtailsItem item={response?.data} />
            </View>
            <View style={styles.bntView}>
                <Button handleBtnPress={() => props.handleStatusUpdate()} buttonText={strings.updatestatus}  />
            </View>
        </View>
    )
}

export default AppointmentDetailsView