import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { FONT_FAMILY_SEMIBOLD, PRIMARY_THEME_COLOR, WHITE_COLOR } from 'app/components/utilities/constant'
import ComingSoonScreen from 'app/components/CommonScreen/ComingSoon'
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from 'app/components/scaleFontSize'

const ReportView = (props: any) => {
    const DATA: any = [
        { title: 'Property Report' },
        { title: 'Agent Report' },
        { title: 'Visit Report' },
        { title: 'Site VisitProperty Report' },
        { title: 'Closing Report' },
    ]
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                rightSecondImageScr={images.notification}
                headerText={strings.reportHeader}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            {/* <ComingSoonScreen /> */}
            <View style={{ flex: 1, marginHorizontal: normalizeSpacing(10) }}>
                <FlatList
                    data={DATA}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }: any) => {
                        return (
                            <View style={styles.mainView}>
                                <Text style={styles.reportTxt}>{item?.title}</Text>
                                <TouchableOpacity style={styles.btnView}>
                                    <Image
                                        source={images.download}
                                        resizeMode={'contain'}
                                        style={styles.downloadImg}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />

            </View>
        </View>
    )
}

export default ReportView