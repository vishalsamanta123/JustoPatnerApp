import React, { useState } from 'react';
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

const locationsView = (props: any) => {
    const [allList, setAllList] = useState<any>([])
    const handleSelect = (data: any, details: any) => {
        const selectedObj = allList?.find((itm: any) => {
            return itm?.address === data?.description
        })
        const valueObj = props?.value?.find((itm: any) => {
            return itm?.address === data?.description
        })
        if (selectedObj?.address != data?.description) {
            if (valueObj?.address != data?.description) {
                const object = {
                    address: data?.description,
                    latitude: '22.0909',
                    logitude: '22.8909',
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
                array?.map((itmssss: any) => {
                    var newAdd: any[] = [...props?.value];
                    newAdd.push(itmssss);
                    props.handleAddTarget(newAdd)
                    props.setVisible(false)
                    setAllList([])
                })
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
                                        <Text style={styles.innerBoxTxt}>{item.address}</Text>
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
                            handleSelect(data, details)
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
{/* <View style={styles.containerVw}>
<View style={[styles.innerCont, { justifyContent: 'flex-start', }]}>
    <Text style={styles.headerTxt}>{strings.location}</Text>
    <View style={styles.selectedBox}>
        {props?.selectedLocation?.length > 0 ?
            <>
                {props?.selectedLocation?.map((item: any, index: any) => {
                    return (
                        <View style={[styles.innerBoxVw, { justifyContent: 'flex-start' }]}>
                            <Text>{item.location}</Text>
                            <TouchableOpacity
                            // onPress={() => props.handleDelete(item, index)}
                            >
                                <Image
                                    source={images.close}
                                    style={styles.crossVw}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </> : <Text style={styles.noSelectedTxt}>{strings.notSelectedLocation}</Text>
        }
    </View>
    <Text style={styles.searchTxt}>{strings.searchYourlocation}</Text>
    <GooglePlacesAutocomplete
        placeholder={strings.location}
        textInputProps={{
            placeholderTextColor: PRIMARY_THEME_COLOR_DARK,
        }}
        styles={{
            textInputContainer: {
                borderWidth: 1.5,
                borderColor: PRIMARY_THEME_COLOR_DARK,
                borderRadius: normalize(8),
                paddingVertical: normalizeSpacing(5)
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
            console.log(data, details);
        }}
        query={{
            key: MAP_KEY,
            language: 'en',
        }}
    />
    {/* {allList ?
    <FlatList
        data={locations}
        renderItem={({ item, index }: any) => {
            const getSelected =
                props?.selectedCp?.length === 0
                    ? ""
                    : props?.selectedCp?.map(({ cpName }: any) => cpName);
            return (
                <TouchableOpacity
                    // onPress={() => !getSelected?.toString()
                    //     ?.includes(item.location)
                    //     ? handleSelects(item) : console.log('')}
                    style={styles.innerBoxVwlist}>
                    <Text style={styles.innerBoxVwlistfont}>{item.location}</Text>
                </TouchableOpacity>
            )
        }}
    /> : null
} */}
// </View>
// <View style={styles.innerCont}>
//     <Button
//         width={220}
//         height={40}
//         btnTxtsize={16}
//         buttonText={strings.addLocation}
//         textTransform={null}
//     // handleBtnPress={() => props.handleAddTarget()}
//     />
// </View>
// </View> */}