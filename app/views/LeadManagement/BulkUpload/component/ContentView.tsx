import React, { useState } from 'react'
import { View, Modal, TouchableOpacity, Image } from 'react-native'
import styles from './Styles'
import FastImages from 'app/components/FastImage'
import images from 'app/assets/images'

const ContentView = (props: any) => {
    return (
        <Modal transparent={true}
            visible={props.Visible}>
            <View style={styles.docModalVw}>
                <View style={styles.contentVw}>
                    <TouchableOpacity style={styles.crossVw}
                        onPress={() => props.setIsVisible(false)}>
                        <Image
                            source={images.close}
                            style={styles.crossImg}
                        />
                    </TouchableOpacity>
                    <FastImages
                        source={{ uri: props?.contentData }}
                        style={styles.contentImgs}
                        resizeMode={'contain'}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default ContentView
