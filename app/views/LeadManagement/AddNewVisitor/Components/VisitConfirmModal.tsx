import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "./Styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import { Dropdown } from "react-native-element-dropdown";
import { PRIMARY_THEME_COLOR, BG_MAIN_COLOUR } from "../../../../components/utilities/constant";
import Button from "app/components/Button";
import { useSelector } from "react-redux";

const VisitConfirmModal = (props: any) => {
    const { response = {}, check_type = "" } = useSelector((state: any) => state.mobileCheckData);
    return (
        <Modal isVisible={props.Visible}>
            <View style={styles.borderView} />
            <View style={styles.conteconfirm}>
                <View style={styles.MiddleContainer}>
                    <Text style={styles.bottomTxt}>{props.textshow}</Text>
                </View>
                <View style={{ marginVertical: 10, marginHorizontal: 25, flexDirection: 'row' }}>
                    <View style={styles.btnview}>
                        <Button buttonText={strings.no} width={120} height={40}
                            handleBtnPress={() => props.handleNoPress ? props.handleNoPress() : props.setIsVisible(false)}
                            bgcolor={BG_MAIN_COLOUR}
                            btnTxtcolor={PRIMARY_THEME_COLOR} />
                    </View>
                    <View style={styles.btnview}>
                        <Button buttonText={strings.yes} width={120} height={40}
                            handleBtnPress={() => props.handleYesPress ? props.handleYesPress() : props.setIsVisible(false)} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default VisitConfirmModal;
