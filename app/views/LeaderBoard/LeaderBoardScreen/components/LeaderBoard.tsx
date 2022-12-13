import React from "react";
import { View, Text, Image, FlatList } from 'react-native';
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import { normalize } from "../../../../components/scaleFontSize";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import LeaderBoardItems from './LeaderBoardItems'
import ComingSoonScreen from "app/components/CommonScreen/ComingSoon";

const LeaderBoardView = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                rightSecondImageScr={images.notification}
                headerText={strings.leaderHeader}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <ComingSoonScreen />
            {/* <View style={styles.topItemsVw}>
                <InputField
                    placeholderText={'Search Project Name'}
                    handleInputBtnPress={() => { }}
                    onChangeText={() => { }}
                />
                <View style={{ marginTop: normalize(30) }}>
                    <Button
                        width={300}
                        buttonText={strings.search}
                        handleBtnPress={() => { }}
                    />
                </View>
            </View>
            <View style={{ flex: 2.5 }}>
                <FlatList
                    data={props.DATA}
                    renderItem={({ item }) => {
                        return (
                            <LeaderBoardItems
                                items={item}
                                onPressView={() => props.handleView()}
                            />
                        )
                    }}
                />
            </View> */}
        </View>
    )
}
export default LeaderBoardView