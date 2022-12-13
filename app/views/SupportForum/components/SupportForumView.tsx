import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { PRIMARY_THEME_COLOR, PURPLE_COLOR } from 'app/components/utilities/constant'
import ComingSoonScreen from 'app/components/CommonScreen/ComingSoon'
import { normalizeSpacing } from 'app/components/scaleFontSize'

const SupportForumView = (props: any) => {
    const DATA: any = [
        {
            date: '13/12/2022 12:00 AM',
            title: 'Support Form title',
            description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. '
        },
        {
            date: '13/12/2022 12:00 AM',
            title: 'Support Form title',
            description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. '
        },
        {
            date: '13/12/2022 12:00 AM',
            title: 'Support Form title',
            description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. '
        },
    ]
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                // rightFirstImageScr={images.filter}
                // rightSecondImageScr={images.notification}
                headerText={strings.supportforumHeader}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <ComingSoonScreen />
            {/* <View style={{ flex: 1, marginHorizontal: normalizeSpacing(10) }}>
                <FlatList
                    data={DATA}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }: any) => {
                        return (
                            <View style={styles.mainView}>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text style={styles.dateTxt}>{item?.date}</Text>
                                    <Text style={styles.reportTxt}>{item?.title}</Text>
                                    <View style={{
                                        marginVertical: 5
                                    }}>
                                        <Text style={[styles.dateTxt, { alignSelf: 'auto' }]}>{item?.description}</Text>
                                    </View>
                                    <View style={styles.demoImgView}>
                                        <Image
                                            source={images.buildings}
                                            resizeMode={'contain'}
                                            style={styles.Img}
                                        />
                                        <Image
                                            source={images.buildings}
                                            resizeMode={'contain'}
                                            style={styles.Img}
                                        />
                                        <Image
                                            source={images.buildings}
                                            resizeMode={'contain'}
                                            style={styles.Img}
                                        />
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.button}
                                    >
                                        <Text style={styles.buttonTxt}>{strings.share}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnView}>
                                        <Image
                                            source={images.forwardArrow}
                                            resizeMode={'contain'}
                                            style={styles.downloadImg}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                />

            </View> */}
        </View>
    )
}

export default SupportForumView