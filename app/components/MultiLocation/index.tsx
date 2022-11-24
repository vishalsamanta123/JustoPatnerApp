import { View, Text, Image, TextInput, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import images from "app/assets/images";
import Modal from "react-native-modal";
import { BLACK_COLOR, GRAY_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from 'app/components/utilities/constant';
import styles from './styles';
import Button from 'app/components/Button';
import strings from 'app/components/utilities/Localization';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../Header';
import { useState } from 'react';

const locationsView = (props: any) => {
    const [allList, setAllList] = useState(false)
    const handleSelects = (item: any) => {
        var array: any[] = [...props?.selectedLocation];
        array.push(item);
        props.setSelectedLocation(array)
    }
    const locations = [
        {
            id: 1,
            location: 'Indore ,Madhya Pradesh',
            latitude: '22.8909',
            longitude: '303.908',
        },
        {
            id: 2,
            location: 'Bhopal ,Madhya Pradesh',
            latitude: '22.8909',
            longitude: '303.780',
        },
        {
            id: 3,
            location: 'Mumbai ,Maharsatra',
            latitude: '22.585',
            longitude: '303.676',
        },
        {
            id: 4,
            location: 'Raipur',
            latitude: '22.8909',
            longitude: '303.908',
        },
        {
            id: 5,
            location: 'Goa',
            latitude: '22.677',
            longitude: '303.66',
        },
        {
            id: 7,
            location: 'Banglore',
            latitude: '22.99',
            longitude: '30688',
        },
        {
            id: 8,
            location: 'Pune ,Maharastra',
            latitude: '22.333',
            longitude: '900.908',
        },
        {
            id: 9,
            location: 'Gujarat',
            latitude: '12.8909',
            longitude: '377.908',
        },
        {
            id: 10,
            location: 'Rajasthan',
            latitude: '12.770',
            longitude: '555.908',
        },
    ]
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
            <ScrollView contentContainerStyle={styles.containerVw}>
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
                    <TextInput
                        placeholder={strings.searchLocation}
                        placeholderTextColor={BLACK_COLOR}
                        style={styles.searchInputVw}
                        onFocus={() => setAllList(true)}
                        onChangeText={(text: any) => props.handleSearch(text)}
                    />
                    {allList ?
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
                    }
                </View>
                <View style={styles.innerCont}>
                    <Button
                        width={220}
                        height={40}
                        btnTxtsize={16}
                        buttonText={strings.addLocation}
                        textTransform={null}
                    // handleBtnPress={() => props.handleAddTarget()}
                    />
                </View>
            </ScrollView>
        </Modal>
    )
}
export default locationsView;