import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "app/components/Modals/styles";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import Button from "app/components/Button";
import InputField from "app/components/InputField";
import InputCalender from "app/components/InputCalender";
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";
import { useDispatch } from 'react-redux';
import { DATE_FORMAT, Isios } from "app/components/utilities/constant";

const dealFlowFilter = (props: any) => {
    return (
        <Modal isVisible={props.Visible}>
            <ScrollView keyboardShouldPersistTaps={'handled'}
            automaticallyAdjustKeyboardInsets={Isios ? true : false}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', }}
            >
                <View style={styles.mainContainer}>
                    <View style={styles.topContainer}>
                        <Text style={styles.topTxt}>{strings.searchDealflow}</Text>
                        <View>
                            <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                                <Image source={images.close} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.borderView} />
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={styles.inputWrap}>
                            <InputCalender
                                mode={'date'}
                                leftIcon={images.event}
                                placeholderText={strings.startDate}
                                editable={false}
                                dateData={(data: any) => {
                                    props.setFilterData({
                                        ...props.filterData,
                                        start_date: moment(data).format(DATE_FORMAT)
                                    })
                                }}
                                setDateshow={(data: any) => {
                                    props.setFilterData({
                                        ...props.filterData,
                                        start_date: moment(data).format(DATE_FORMAT)
                                    })
                                }}
                                value={props?.filterData?.start_date}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <InputCalender
                                mode={'date'}
                                leftIcon={images.event}
                                placeholderText={strings.endDate}
                                editable={false}
                                value={props?.filterData?.end_date}
                                dateData={(data: any) => {
                                    props.setFilterData({
                                        ...props.filterData,
                                        end_date: moment(data).format(DATE_FORMAT)
                                    })
                                }}
                                setDateshow={(data: any) => {
                                    props.setFilterData({
                                        ...props.filterData,
                                        end_date: moment(data).format(DATE_FORMAT)
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <InputField
                                placeholderText={strings.searchProjctName}
                                headingText={strings.searchProjctName}
                                onChangeText={(data: any) => {
                                    props.setFilterData({
                                        ...props.filterData,
                                        property_name: data
                                    })
                                }}
                                valueshow={props?.filterData?.property_name}
                                handleInputBtnPress={() => { }}
                            />
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Button
                                    width={135}
                                    buttonText={strings.reset}
                                    handleBtnPress={() => props.onReset()}
                                />
                                <Button
                                    width={135}
                                    handleBtnPress={() => {
                                        props.handleFilter()
                                        props.setIsVisible(false)
                                    }}
                                    buttonText={strings.apply} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Modal >
    );
};

export default dealFlowFilter;
