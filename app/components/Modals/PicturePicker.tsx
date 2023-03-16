import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import images from "../../assets/images";
import strings from "../../components/utilities/Localization";
import ImagePicker from 'react-native-image-crop-picker';
import { handlePermission, openPermissionSetting, } from "../utilities/GlobalFuncations";
import DocumentPicker from "react-native-document-picker";

const PicturePickerModal = (props: any) => {
    const handleCameraPress = () => {
        ImagePicker.openCamera({
            // width: 100,
            // height: 100,
            cropping: true,
            multiple: props.multiple ? props.multiple : false,
            compressImageQuality: 1,
            freeStyleCropEnabled: true
        }).then((image: any) => {
            props.setVisible(false);
            props.imageData(
                {
                    uri: image?.path,
                    type: image?.mime,
                    name: image?.path?.substring(
                        image?.path?.lastIndexOf("/") + 1
                    ),
                }
            );
        });
    }
    const handleGalleryPress = () => {
        ImagePicker.openPicker({
            // width: 100,
            // height: 100,
            cropping: true,
            multiple: props.multiple ? props.multiple : false,
            compressImageQuality: 1,
            freeStyleCropEnabled: true
        }).then((image: any) => {
            props.setVisible(false);
            props.imageData(
                {
                    uri: image?.path,
                    type: image?.mime,
                    name: image?.path?.substring(
                        image?.path?.lastIndexOf("/") + 1
                    ),
                }
            )
        });
    }
    const handleBrowsePress = async () => {
        const result: any = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
        });
        console.log('result: ', result);
        if (result?.length > 0) {
            props.setVisible(false);
            props.imageData(
                {
                    uri: result[0]?.uri,
                    type: result[0]?.type,
                    name: result[0]?.name
                }
            )
        }
    }

    return (
        <Modal style={styles.fullContainer} coverScreen={true}
            isVisible={props.Visible}
            backdropOpacity={0.30}>
            <View style={styles.pickerModal}>
                <View style={styles.pickerModalCon}>
                    <View style={styles.cancelModalVw}>
                        <TouchableOpacity onPress={() => props.setVisible(false)}>
                            <Image
                                source={images.close}
                                style={styles.componentsImg}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.straightVw}>
                        <TouchableOpacity
                            onPress={async () => {
                                const res = await handlePermission(
                                    'gallery',
                                    strings.txt_setting_heading_media,
                                    strings.txt_setting_description_media,
                                );
                                if (res == 'setting1') {
                                    openPermissionSetting(
                                        strings.txt_setting_heading_media,
                                        strings.txt_setting_description_media,
                                    );
                                } else if (res) {
                                    if (props.docType === 'all') {
                                        handleBrowsePress()
                                    } else {
                                        handleGalleryPress()
                                    }
                                }
                            }}
                            style={styles.componentsVw}>
                            <Image
                                style={styles.componentsImg}
                                resizeMode={'contain'}
                                source={images.gallery}
                            />
                            <Text style={styles.componentsTxt}>{strings.galleryHeader}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.componentsVw}
                            onPress={async () => {

                                const res = await handlePermission(
                                    'camera',
                                    strings.txt_setting_heading_camera,
                                    strings.txt_setting_description_camera,
                                );
                                if (res == 'setting1') {
                                    openPermissionSetting(
                                        strings.txt_setting_heading_camera,
                                        strings.txt_setting_description_camera,
                                    );
                                } else if (res) {
                                    handleCameraPress()
                                }
                            }}
                        >
                            <Image
                                style={styles.componentsImg}
                                resizeMode={'contain'}
                                source={images.camera}
                            />
                            <Text style={styles.componentsTxt}>{strings.cameraHeader}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

export default PicturePickerModal;
