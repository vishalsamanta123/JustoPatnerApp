import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "./Styles";
import strings from "../../../../components/utilities/Localization";
import Button from "app/components/Button";
import { useSelector } from "react-redux";
import images from "app/assets/images";
import moment from "moment";
import { DATE_FORMAT } from "app/components/utilities/constant";

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
            props.setFormData({ ...props.formData })
        }
    }, [response])
    const onPressLeftButton = () => {
        props.setIsVisible(false)
        if (responseData?.status === 201) {
            props.setFormData({
                ...props.formData,
                visit_confirmation_status: "No",
                mobile: '',
            })
        } if (responseData?.status === 202) {
            const formDatas = responseData?.data[0] || {}
            props.setFormData({
                ...props.formData,
                address: formDatas?.address ? formDatas?.address : '',
                adhar_no: formDatas?.adhar_no ? formDatas?.adhar_no : '',
                age: formDatas?.age ? formDatas?.age : '',
                agent_code: formDatas?.agent_code ? formDatas?.agent_code : '',
                area: formDatas?.area ? formDatas?.area : '',
                city: formDatas?.city ? formDatas?.city : '',
                coumpany_name: formDatas?.coumpany_name ? formDatas?.coumpany_name : '',
                current_stay: formDatas?.current_stay ? formDatas?.current_stay : '',
                desigantion: formDatas?.desigantion ? formDatas?.desigantion : '',
                email: formDatas?.email ? formDatas?.email : '',
                first_name: formDatas?.first_name ? formDatas?.first_name : '',
                funding_emi_type: formDatas?.funding_emi_type ? formDatas?.funding_emi_type : '',
                gender: formDatas?.gender ? formDatas?.gender : '',
                locality: formDatas?.locality ? formDatas?.locality : '',
                location: formDatas?.location ? formDatas?.location : '',
                marital_status: formDatas?.marital_status ? formDatas?.marital_status : '',
                mobile: formDatas?.mobile ? formDatas?.mobile : '',
                no_of_family_member: formDatas?.no_of_family_member ? formDatas?.no_of_family_member : '',
                occupation: formDatas?.occupation ? formDatas?.occupation : '',
                office_address: formDatas?.office_address ? formDatas?.office_address : '',
                pancard_no: formDatas?.pancard_no ? formDatas?.pancard_no : '',
                visit_type: formDatas?.visit_type ? formDatas?.visit_type : '',
                whatsapp_no: formDatas?.whatsapp_no ? formDatas?.whatsapp_no : '',
                birth_date: formDatas?.birth_date ?
                    moment(formDatas?.birth_date).format(DATE_FORMAT) : '',
                visit_confirmation_status: 2,
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
                                visit_confirmation_status: "No",
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
                            width={130} height={40}
                            handleBtnPress={() => onPressLeftButton()}
                        />
                    </View>
                    <View style={styles.btnview}>
                        <Button
                            buttonText={responseData?.status === 201 ?
                                strings.yes : responseData?.status === 202 ? strings.createNew : strings.notfount}
                            width={130} height={40}
                            handleBtnPress={() => onPressRightButton()} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default VisitConfirmModal;
