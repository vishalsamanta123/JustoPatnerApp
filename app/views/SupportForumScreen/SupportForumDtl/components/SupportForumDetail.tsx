import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import images from 'app/assets/images'
import Header from 'app/components/Header'
import strings from 'app/components/utilities/Localization'
import { PRIMARY_THEME_COLOR } from 'app/components/utilities/constant'
import FastImages from 'app/components/FastImage'
import ContentView from './ContentView'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer'

const SupportForumDetail = (props: any) => {
    const [contentView, setContentView] = useState<any>({})
    const [contentViewModal, setContentViewModal] = useState<any>(false)
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.supportforumDtlHeader}
                handleOnLeftIconPress={props.handleBackPress}
                headerStyle={styles.headerStyle}
                RightSecondIconStyle={styles.RightFirstIconStyle}
                leftImageIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                handleOnRightSecondIconPress={() => props.onPressNotify()}
                barStyle={'light-content'}
            />
            <View style={styles.mainCon}>
                <Text style={styles.titleTxt}>
                    {props?.supportForumDtl?.title}</Text>
                <Text style={styles.descriptnTxt}>
                    {props?.supportForumDtl?.description}</Text>
                <View style={styles.locationVw}>
                    <Image
                        source={images.locationIcon}
                        style={styles.locationImg}
                    />
                    <Text style={styles.locationTxt}>
                        {props?.supportForumDtl?.location}</Text>
                </View>
                {props?.supportForumDtl?.support_forum_content?.length > 0 ?
                    <View style={styles.demoImgView}>
                        {props?.supportForumDtl?.support_forum_content?.map((itm: any, indx: any) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setContentView({
                                        content: itm?.content,
                                        content_type: itm?.content_type,
                                        support_forum_id: itm?.support_forum_id,
                                    })
                                    setContentViewModal(true)
                                }}>
                                    <FastImages
                                        source={{ uri: props?.supportForumDtl?.base_url + itm?.content }}
                                        style={styles.Img}
                                    />
                                </TouchableOpacity>
                            )
                        })
                        }
                    </View>
                    : null
                }
                {props?.supportForumDtl?.support_forum_content?.length > 0 ?
                    <View style={styles.demoImgView}>
                        {props?.supportForumDtl?.support_forum_content?.map((itm: any, indx: any) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setContentView({
                                        video_thumbnail: itm?.video_thumbnail,
                                        content_type: itm?.content_type,
                                        support_forum_id: itm?.support_forum_id,
                                    })
                                    setContentViewModal(true)
                                }}>
                                    <Image
                                        source={{ uri: props?.supportForumDtl?.base_url + itm?.video_thumbnail }}
                                        style={styles.Img}
                                    />
                                </TouchableOpacity>
                            )
                        })
                        }
                    </View>
                    : null
                }
            </View>
            <ContentView
                Visible={contentViewModal}
                setIsVisible={setContentViewModal}
                contentData={contentView}
                setContentData={setContentView}
                url={props?.supportForumDtl?.base_url}
            />
        </View>
    )
}

export default SupportForumDetail
