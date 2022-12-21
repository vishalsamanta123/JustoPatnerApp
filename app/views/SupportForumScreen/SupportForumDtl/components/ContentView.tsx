import React, { useState } from 'react'
import { Image, View } from 'react-native'
import styles from './styles'
import images from 'app/assets/images'
import Header from 'app/components/Header'
import strings from 'app/components/utilities/Localization'
import { PRIMARY_THEME_COLOR } from 'app/components/utilities/constant'
import FastImages from 'app/components/FastImage'
import Video from "react-native-video";
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
                        {props?.contentData?.video_thumbnail ?
                            <Video
                                source={{ uri: props?.url + props?.contentData?.video_thumbnail }}
                                //poster={item.videos[0].thumbnail}
                                // shouldPlay={false}
                                repeat
                                // onReadyForDisplay={this.loading}
                                //paused={this.state.stop ? true : this.state.paused}
                                //isLooping
                                resizeMode="contain"
                                // posterResizeMode={"contain"}
                                style={{
                                    height: 250,
                                    width: '100%',
                                }}
                            /> :
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
