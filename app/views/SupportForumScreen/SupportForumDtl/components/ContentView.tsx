import React, { useState } from 'react'
import { View } from 'react-native'
import styles from './styles'
import images from 'app/assets/images'
import Header from 'app/components/Header'
import strings from 'app/components/utilities/Localization'
import { PRIMARY_THEME_COLOR, } from 'app/components/utilities/constant'
import FastImages from 'app/components/FastImage'
import CustomVideoPlayer from 'app/components/VideoPlayer'
const ContentView = (props: any) => {
    return (
        <>
            {props.Visible ?
                <View style={styles.contentVw}>
                    <Header
                        leftImageSrc={images.backArrow}
                        headerText={strings.supportforumDtlHeader}
                        handleOnLeftIconPress={() => {
                            props.setIsVisible(false)
                            props.setContentData({})
                        }}
                        headerStyle={styles.headerStyle}
                        RightSecondIconStyle={styles.RightFirstIconStyle}
                        leftImageIconStyle={styles.RightFirstIconStyle}
                        statusBarColor={PRIMARY_THEME_COLOR}
                        barStyle={'light-content'}
                    />
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {props?.contentData?.video_thumbnail &&
                            props?.contentData?.content_type === 'video' ?
                            <CustomVideoPlayer
                                url={props?.url}
                                content={props?.contentData?.content}
                            // source={{ uri: props?.url + props?.contentData?.content }}
                            />
                            :
                            <FastImages
                                source={{ uri: props?.url + props?.contentData?.content }}
                                style={styles.contentImgs}
                                resizeMode={'contain'}
                            />
                        }
                    </View>
                </View>
                : null
            }
        </>
    )
}

export default ContentView
