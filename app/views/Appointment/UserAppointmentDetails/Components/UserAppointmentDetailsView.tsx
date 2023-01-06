import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import styles from './Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import UserAppointmentDtailsItem from './UserAppointmentDtailsItem';

const UserAppointmentDetailsView = (props: any) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.appointmnetdetail}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                headerStyle={styles.headerStyle}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <View style={styles.propertyListView}>
                <UserAppointmentDtailsItem 
                 status = {props.status} />
            </View>

        </View>
    )
}

export default UserAppointmentDetailsView