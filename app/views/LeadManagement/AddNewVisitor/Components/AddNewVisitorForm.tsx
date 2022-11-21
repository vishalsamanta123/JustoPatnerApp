import { View, Text, ScrollView, StatusBar, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../assets/images';
import InputField from '../../../../components/InputField';
import { WHITE_COLOR, PRIMARY_THEME_COLOR, BLACK_COLOR } from '../../../../components/utilities/constant';
import strings from '../../../../components/utilities/Localization';
import styles from './Styles';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import moment from 'moment';

const AddNewVisitorForm = (props: any) => {
    const insets = useSafeAreaInsets();
    const [gender, setGender] = useState("Male");
    const [checked, setChecked] = React.useState("first");

    return (
        <View style={styles.mainContainer}>
            <View
                style={{
                    backgroundColor: PRIMARY_THEME_COLOR,
                    height: insets.top,
                }}
            />
            <StatusBar backgroundColor={PRIMARY_THEME_COLOR} barStyle={"light-content"} />
            <Header
                headerText={
                    props.type == 'edit' ?
                        strings.editVisitor :
                        strings.addnewvisitor
                }
                headerStyle={styles.headerStyle}
                // headerTextStyle={styles.headerTextStyle}
                leftImageSrc={images.backArrow}
                leftImageIconStyle={styles.RightFirstIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
            />
            <ScrollView>
                <View style={styles.wrap}>
                    <Text style={styles.headingText}>{strings.visitordetails}</Text>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Visitor Name"}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    first_name: data,
                                })
                            }}
                            valueshow={props?.formData?.first_name}
                            headingText={"Visitor Name"}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Adhar No."}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    adhar_no: data,
                                })
                            }}
                            valueshow={props?.formData?.adhar_no?.toString()}
                            headingText={"Adhar No."}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Pancard No."}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    pancard_no: data,
                                })
                            }}
                            valueshow={props?.formData?.pancard_no}
                            headingText={"Pancard No."}
                        />
                    </View>
                    <View style={styles.genderView}>
                        <Text style={styles.genderTxt}>{strings.gender}</Text>
                        <View style={styles.radioView}>
                            <RadioButton
                                value="first"
                                status={props?.formData?.gender === 1 ? "checked" : "unchecked"}
                                onPress={() => props.setFormData({
                                    ...props.formData,
                                    gender: 1,
                                })}
                                color={PRIMARY_THEME_COLOR}
                            />
                            <Text
                                style={[
                                    styles.radioTxt,
                                    {
                                        color:
                                            props?.formData?.gender === 1 ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                    },
                                ]}
                            >
                                {strings.male}
                            </Text>
                        </View>
                        <View style={styles.radioView}>
                            <RadioButton
                                value="second"
                                status={props?.formData?.gender === 2 ? "checked" : "unchecked"}
                                onPress={() => props.setFormData({
                                    ...props.formData,
                                    gender: 2,
                                })}
                                color={PRIMARY_THEME_COLOR}
                            />
                            <Text
                                style={[
                                    styles.radioTxt,
                                    {
                                        color:
                                            props?.formData?.gender === 2 ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                    },
                                ]}
                            >
                                {strings.female}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Date of Birth"}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    birth_date: data,
                                })
                            }}
                            valueshow={moment(props?.formData?.birth_date).format()}
                            headingText={"Date of Birth"}
                            rightImgSrc={images.event}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Mobile No."}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    mobile: data,
                                })
                            }}
                            valueshow={props?.formData?.mobile}
                            headingText={"Mobile No."}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"WhatsApp No."}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    whatsapp_no: data,
                                })
                            }}
                            valueshow={props?.formData?.whatsapp_no}
                            headingText={"WhatsApp No."}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Email Address"}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    email: data,
                                })
                            }}
                            valueshow={props?.formData?.email}
                            headingText={"Email Address"}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Location"}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    location: data,
                                })
                            }}
                            valueshow={props?.formData?.location}
                            headingText={"Location"}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Localitiy"}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    city: data,
                                })
                            }}
                            valueshow={props?.formData?.city}
                            headingText={"Localitiy"}
                        />
                    </View>
                    <Text style={[styles.headingText, { marginTop: 20 }]}>{strings.propertyrequire}</Text>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Configuration"}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    configuration: data,
                                })
                            }}
                            valueshow={props?.formData?.configuration}
                            headingText={"Configuration"}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Expected Possession Date"}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    expected_possession_date: data,
                                })
                            }}
                            valueshow={moment(props?.formData?.expected_possession_date).format('llll')}
                            headingText={"Expected Possession Date"}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Area"}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    area: data,
                                })
                            }}
                            valueshow={props?.formData?.area}
                            headingText={"Area"}
                        />
                    </View>
                    <View style={[styles.inputWrap, { flexDirection: "row" }]}>
                        <View style={styles.budgetView}>
                            <TextInput
                                value={props?.formData?.min_budget}
                                placeholder='Min Budget' style={styles.budgetInput} />
                            <TouchableOpacity style={styles.smallBox}>
                                <Text>L</Text>
                            </TouchableOpacity>
                            <TextInput
                                value={props?.formData?.max_budget}
                                placeholder='Max Budget' style={[styles.budgetInput, { marginLeft: 20 }]} />
                            <TouchableOpacity style={styles.smallBox}>
                                <Text>C</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.radioBtnView}>
                        <Text style={styles.headingsTxt}>Nature Of Funding</Text>
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.radioView}>
                                <RadioButton
                                    value="first"
                                    status={props?.formData?.funding_type === "loan" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("first")}
                                    color={PRIMARY_THEME_COLOR}
                                />
                                <Text
                                    style={[
                                        styles.radioTxt,
                                        {
                                            color:
                                                props?.formData?.funding_type === "loan" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                        },
                                    ]}
                                >
                                    Loan
                                </Text>
                            </View>
                            <View style={styles.radioView}>
                                <RadioButton
                                    value="second"
                                    status={props?.formData?.funding_type === "Self" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("second")}
                                    color={PRIMARY_THEME_COLOR}
                                />
                                <Text
                                    style={[
                                        styles.radioTxt,
                                        {
                                            color:
                                                props?.formData?.funding_type === "Self" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                        },
                                    ]}
                                >
                                    Self Funding
                                </Text>
                            </View>
                            <View style={styles.radioView}>
                                <RadioButton
                                    value="third"
                                    status={checked === "third" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("third")}
                                    color={PRIMARY_THEME_COLOR}
                                />
                                <Text
                                    style={[
                                        styles.radioTxt,
                                        {
                                            color:
                                                checked === "third" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                        },
                                    ]}
                                >
                                    Both
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={styles.radioView}>
                            <RadioButton
                                value="first"
                                status={checked === "first" ? "checked" : "unchecked"}
                                onPress={() => setChecked("first")}
                                color={PRIMARY_THEME_COLOR}
                            />
                            <Text
                                style={[
                                    styles.radioTxt,
                                    {
                                        color:
                                            checked === "first" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                    },
                                ]}
                            >
                                Min EMI Pay
                            </Text>
                        </View>
                        <View style={styles.radioView}>
                            <RadioButton
                                value="second"
                                status={checked === "second" ? "checked" : "unchecked"}
                                onPress={() => setChecked("second")}
                                color={PRIMARY_THEME_COLOR}
                            />
                            <Text
                                style={[
                                    styles.radioTxt,
                                    {
                                        color:
                                            checked === "second" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                    },
                                ]}
                            >
                                Max EMI Pay
                            </Text>
                        </View>
                    </View>
                    <View style={styles.radioBtnView}>
                        <Text style={styles.headingsTxt}>Purpose</Text>
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.radioView}>
                                <RadioButton
                                    value="first"
                                    status={checked === "first" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("first")}
                                    color={PRIMARY_THEME_COLOR}
                                />
                                <Text
                                    style={[
                                        styles.radioTxt,
                                        {
                                            color:
                                                checked === "first" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                        },
                                    ]}
                                >
                                    End User
                                </Text>
                            </View>
                            <View style={styles.radioView}>
                                <RadioButton
                                    value="second"
                                    status={checked === "second" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("second")}
                                    color={PRIMARY_THEME_COLOR}
                                />
                                <Text
                                    style={[
                                        styles.radioTxt,
                                        {
                                            color:
                                                checked === "second" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                        },
                                    ]}
                                >
                                    Investment
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.headingText}>Company Details</Text>
                    <View style={styles.radioBtnView}>
                        <Text style={styles.headingsTxt}>Occupation</Text>
                        <View style={{ flexDirection: "row", width: '100%' }}>
                            <View style={styles.radioView}>
                                <RadioButton
                                    value="first"
                                    status={checked === "first" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("first")}
                                    color={PRIMARY_THEME_COLOR}
                                />
                                <Text
                                    style={[
                                        styles.radioTxt,
                                        {
                                            color:
                                                checked === "first" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                        },
                                    ]}
                                >
                                    Salaried
                                </Text>
                            </View>
                            <View style={styles.radioView}>
                                <RadioButton
                                    value="second"
                                    status={checked === "second" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("second")}
                                    color={PRIMARY_THEME_COLOR}
                                />
                                <Text
                                    style={[
                                        styles.radioTxt,
                                        {
                                            color:
                                                checked === "second" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                        },
                                    ]}
                                >
                                    Self Employed
                                </Text>
                            </View>
                            <View style={styles.radioView}>
                                <RadioButton
                                    value="third"
                                    status={checked === "third" ? "checked" : "unchecked"}
                                    onPress={() => setChecked("third")}
                                    color={PRIMARY_THEME_COLOR}
                                />
                                <Text
                                    style={[
                                        styles.radioTxt,
                                        {
                                            color:
                                                checked === "third" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                                        },
                                    ]}
                                >
                                    Professional
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Designation"}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    desigantion: data,
                                })
                            }}
                            valueshow={props?.formData?.desigantion}
                            headingText={"Designation"}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            placeholderText={"Office Address"}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    office_address: data,
                                })
                            }}
                            valueshow={props?.formData?.office_address}
                            headingText={"Office Address"}
                        />
                    </View>
                    <View style={styles.btnView}>
                        {props.type == 'edit'
                            ?
                            < Button width={150} height={45} buttonText={strings.editVisitor} btnTxtsize={16} />
                            :
                            <>
                                < Button width={150} handleBtnPress={() => props.OnpressCreateVisit()} height={45} buttonText={strings.createVisitor} btnTxtsize={16} />
                                <Button width={150} handleBtnPress={() => props.OnpressseheduleVisit()} height={45} buttonText={strings.createandschedule} btnTxtsize={14} />
                            </>

                        }
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default AddNewVisitorForm