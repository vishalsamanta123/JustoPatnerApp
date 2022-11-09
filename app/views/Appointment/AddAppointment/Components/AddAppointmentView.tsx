import { View, Text, StatusBar } from 'react-native'
import React, { useState } from 'react'
import styles from './Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import AddAppointmentItem from './AddAppointmentItem';
import { useNavigation } from '@react-navigation/native';

const AddAppointmentView = (props: any) => {
    const insets = useSafeAreaInsets();
    const navigation: any = useNavigation()
    const [value, setValue] = useState(null)
    const [gender, setGender] = useState("Male");
    const [checked, setChecked] = React.useState("first");
    const handleBtnPress = () => {
        navigation.navigate('AppointmentScreen')
    }
    return (
        <View style={styles.mainContainer}>
            <View
                style={{
                    backgroundColor: PRIMARY_THEME_COLOR_DARK,
                    height: insets.top,
                }}
            />
            <StatusBar backgroundColor={PRIMARY_THEME_COLOR} barStyle={"light-content"} />
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.addNewappointment}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={() => props.handleBackPress()}
                headerStyle={styles.headerStyle}
            />
            <View style={styles.AddAppointmentView}>
                <AddAppointmentItem
                    setValue={setValue}
                    value={value}
                    setChecked={setChecked}
                    checked={checked}
                    handleBtnPress={handleBtnPress}
                />
            </View>
        </View>
    )
}

export default AddAppointmentView