import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "./Styles";
import strings from "../../../../components/utilities/Localization";
import Button from "app/components/Button";
import { useSelector } from "react-redux";
import images from "app/assets/images";

const VisitConfirmModal = (props: any) => {
    const { response = {}, check_type = "" } = useSelector((state: any) => state.checkVisitorData);
    const [responseData, setResponseData] = useState<any>({})
    useEffect(() => {
        if (response?.status === 201 || response?.status === 202) {
            if (response?.status) {
                setResponseData(response)
            } else {
                setResponseData({})
            }
        }
    }, [response])
    const onPressLeftButton = () => {
        props.setIsVisible(false)
        if (responseData?.status === 201) {
            props.setFormData({
                ...props.formData,
                visit_confirmation_status: "",
            })
        } if (responseData?.status === 202) {
            props.setFormData({
                ...props.formData,
                visit_confirmation_status: 2
            })
        }
    }
    const onPressRightButton = () => {
        props.setIsVisible(false)
        if (responseData?.status === 201) {
            props.setFormData({
                ...props.formData,
                visit_confirmation_status: 1,
            })
        } if (responseData?.status === 202) {
            props.setFormData({
                ...props.formData,
                visit_confirmation_status: 1
            })
        }
    }
    return (
        <Modal isVisible={props.Visible}>
            <View style={styles.conteconfirm}>
                <View style={styles.topContainer}>
                    <View />
                    <Text style={styles.topTxt}>{(props.stringshow) ? props.stringshow : strings.confirmation}</Text>
                    <View>
                        <TouchableOpacity onPress={() => {
                            props.setIsVisible(false)
                            props.setFormData({
                                ...props.formData,
                                visit_confirmation_status: "",
                            })
                        }}>
                            <Image source={images.close} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.borderView} />
                <View style={styles.MiddleContainer}>
                    <Text style={styles.bottomTxt}>{
                        responseData?.message === "" || responseData?.message === undefined ||
                            responseData?.message === null ? strings.notfount : responseData?.message
                    }</Text>
                </View>
                <View style={{ marginVertical: 10, marginHorizontal: 25, flexDirection: 'row' }}>
                    <View style={styles.btnview}>
                        <Button
                            buttonText={responseData?.status === 201 ?
                                strings.no : responseData?.status === 202 ? strings.useOldData : strings.notfount}
                            width={140} height={40}
                            handleBtnPress={() => onPressLeftButton()}
                        />
                    </View>
                    <View style={styles.btnview}>
                        <Button
                            buttonText={responseData?.status === 201 ?
                                strings.yes : responseData?.status === 202 ? strings.createNew : strings.notfount}
                            width={140} height={40}
                            handleBtnPress={() => onPressRightButton()} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default VisitConfirmModal;
