import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from "app/assets/images";
import Modal from "react-native-modal";
import { MAP_KEY, PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, WHITE_COLOR } from 'app/components/utilities/constant';
import styles from './styles';
import Button from 'app/components/Button';
import strings from 'app/components/utilities/Localization';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Header from '../Header';
import { normalize, normalizeHeight, normalizeSpacing } from '../scaleFontSize';
import { handlePermission, openPermissionSetting } from '../utilities/GlobalFuncations';

const locationsView = (props: any) => {
    const [allList, setAllList] = useState<any>([])
    const onPressSelect = async (data: any, details: any) => {
        // const res = await handlePermission(
        //     'location',
        //     strings.txt_setting_heading_location,
        //     strings.txt_setting_Location,
        // );
        // if (res == 'setting1' || res === false) {
        //     props.setVisible(false)
        //     setAllList([])
        //     openPermissionSetting(
        //         strings.txt_setting_heading_location,
        //         strings.txt_setting_Location,
        //     );
        // } else if (res) {
        handleSelect(data, details)
        // }
    }
    const handleSelect = (data: any, details: any) => {
        const selectedObj = allList?.find((itm: any) => {
            return itm?.location === data?.description
        })
        const valueObj = props?.value?.find((itm: any) => {
            return itm?.location === data?.description
        })
        if (selectedObj?.location != data?.description) {
            if (valueObj?.location != data?.description) {
                const object = {
                    location: data?.description,
                    latitude: details?.geometry?.location?.lat,
                    logitude: details?.geometry?.location?.lng,
                }
                var array: any[] = [...allList];
                array.push(object);
                setAllList(array)
            }
        }
    }
    const handleDelete = (item: any, index: any) => {
        var array: any[] = [...allList];
        array?.splice(index, 1);
        setAllList(array)
        // if (props?.value?.length > 0) {
        //     var array: any[] = [...props?.value];
        //     array?.splice(index, 1);
        //     props.handleAddTarget(array)
        // }
    }
    const onPressAdd = (array: any) => {
        if (array?.length > 0) {
            if (props?.value?.length === 0) {
                props.handleAddTarget(array)
                props.setVisible(false)
                setAllList([])
            } else {
                var newAdd: any[] = [...props?.value];
                const getNew = newAdd.concat(array);
                props.handleAddTarget(getNew)
                props.setVisible(false)
                setAllList([])
            }
        } else {
            props.setVisible(false)
            setAllList([])
        }
    }
    return (
        <Modal deviceHeight={0}
            isVisible={props.Visible}>
            <Header
                headerText={'Working Location'}
                headerStyle={styles.headerStyle}
                headerTextStyle={styles.headerTextStyle}
                leftImageSrc={images.close}
                RightSecondIconStyle={{ tintColor: WHITE_COLOR }}
                leftImageIconStyle={{ tintColor: WHITE_COLOR }}
                handleOnLeftIconPress={() => props.setVisible(false)}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <View style={[styles.innerCont, { flex: 1 }]}>
                <Text style={styles.headerTxt}>{strings.location}</Text>
                <View style={styles.selectedBox}>
                    {allList?.length > 0 ?
                        <ScrollView contentContainerStyle={{ marginHorizontal: 5 }}>
                            {allList?.map((item: any, index: any) => {
                                return (
                                    <View style={styles.innerBoxVw}>
                                        <Text style={styles.innerBoxTxt}>{item.location}</Text>
                                        <TouchableOpacity
                                            onPress={() => handleDelete(item, index)}
                                        >
                                            <Image
                                                source={images.close}
                                                style={styles.crossVw}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </ScrollView> : <Text style={styles.noSelectedTxt}>{strings.notSelectedLocation}</Text>
                    }
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps={'handled'}>
                    <Text style={styles.searchTxt}>{strings.searchYourlocation}</Text>
                    <GooglePlacesAutocomplete
                        fetchDetails={true}
                        placeholder={strings.location}
                        textInputProps={{
                            placeholderTextColor: PRIMARY_THEME_COLOR_DARK,
                        }}
                        styles={{
                            textInputContainer: {
                                borderWidth: 1.5,
                                borderColor: PRIMARY_THEME_COLOR_DARK,
                                borderRadius: normalize(8),
                                paddingVertical: normalizeSpacing(5),
                            },
                            textInput: {
                                height: normalizeHeight(30),
                                color: PRIMARY_THEME_COLOR_DARK,
                                fontSize: normalize(14),
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                        }}
                        onPress={(data, details = null) => {
                            onPressSelect(data, details)
                        }}
                        query={{
                            key: MAP_KEY,
                            language: 'en',
                        }}
                    />
                </ScrollView>
            </View>
            <View style={styles.innerCont}>
                <Button
                    width={220}
                    height={40}
                    btnTxtsize={16}
                    buttonText={strings.addLocation}
                    textTransform={null}
                    handleBtnPress={() => onPressAdd(allList)}
                />
            </View>
        </Modal>
    )
}
export default locationsView;
