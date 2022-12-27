import React from "react";
import { View, Text, Image, FlatList } from 'react-native';
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import Header from "../../../../components/Header";
import { normalize } from "../../../../components/scaleFontSize";
import { PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import LeaderBoardCPItems from '../components/LeaderBoardCPItems'

const LeaderBoardSearchView = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            <Header
                headerText={strings.leaderHeader}
                headerStyle={styles.headerStyle}
                headerTextStyle={styles.headerTextStyle}
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                RightSecondIconStyle={{ tintColor: WHITE_COLOR }}
                leftImageIconStyle={{ tintColor: WHITE_COLOR }}
                handleOnLeftIconPress={props.onPressBack}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <View style={styles.topItemsVw}>
                <DropdownInput
                    placeholder={'Select Cp Name'}
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
                <View style={styles.IteamView}>
                    <Text style={[styles.txtStyle, {
                        color: PRIMARY_THEME_COLOR,
                    }]}>CP Name</Text>
                    <Text style={[styles.txtStyle, {
                        color: PRIMARY_THEME_COLOR,
                    }]}>CP Rank</Text>
                    <Text style={[styles.txtStyle, {
                        color: PRIMARY_THEME_COLOR,
                    }]}>Sold</Text>
                </View>
                <FlatList
                    data={props.DATA}
                    renderItem={({ item }) => {
                        return (
                            <LeaderBoardCPItems
                                items={item}
                                onPressView={() => props.handleView()}
                            />
                        )
                    }}
                />
            </View>
        </View>
    )
}
export default LeaderBoardSearchView