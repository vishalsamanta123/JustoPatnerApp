import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import styles from './Styles'
import Button from '../../../../components/Button'
import { normalize } from '../../../../components/scaleFontSize'
import strings from '../../../../components/utilities/Localization'
import moment from 'moment'
import { BLACK_COLOR, DATE_TIME_FORMAT, RED_COLOR } from 'app/components/utilities/constant'
import { useSelector } from 'react-redux'

const LeadDetailsIteam = (props: any) => {
    // const { response = {} } = useSelector((state: any) => state.userData)
    // const userId = response?.data ? response?.data : {}
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.topDetailsView}>
                <View style={styles.topTxtView}>
                    <Text style={styles.topTxt}>{props?.items?.lead_score}</Text>
                    <Text style={[styles.topTxt, {
                        fontSize: normalize(16)
                    }]}>{strings.visitorScore} </Text>
                </View>
                {/* {props?.items?.create_by === userId?._id ?
                    ( */}
                <View style={styles.topBtnView}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            Linking?.openURL(
                                `tel:${props?.items?.customer_detail?.mobile}`
                            )
                        }}
                    >
                        <Text style={styles.buttonTxt}>{strings.call}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            Linking?.openURL(
                                `sms:${props?.items?.customer_detail?.mobile}`
                            )
                        }}
                    >
                        <Text style={styles.buttonTxt}>{strings.sms}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            Linking?.openURL(
                                `https:wa.me/${props?.items?.customer_detail?.whatsapp_no}`
                            )
                        }}
                    >
                        <Text style={[styles.buttonTxt, { fontSize: normalize(10) }]}>{strings.whatsApp}</Text>
                    </TouchableOpacity>
                </View>
                {/* )
                    : null
                } */}
            </View>
            {props?.items?.property_title !== '' ?
                (<View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.propertyHeader + " " + strings.name}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.items?.property_title ? props?.items?.property_title : strings.notfount}</Text>
                    </View>
                </View>)
                : null
            }
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.lastInteracted}</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        props.items.last_interacted_date === '' ||
                            props.items.last_interacted_date === undefined || props.items.last_interacted_date === "undefined" ?
                            strings.notfount :
                            moment(props?.items?.last_interacted_date).format(DATE_TIME_FORMAT)
                    }</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.source}</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.created_name === '' ||
                        props.items.created_name === undefined || props.items.created_name === "undefined" ?
                        strings.notfount :
                        props?.items?.created_name}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.status}</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text
                        style={[
                            styles.nameTxt,
                            {
                                color: props.items.lead_status === 6 ? RED_COLOR : BLACK_COLOR

                            },
                        ]}
                    >
                        {props.items.lead_status === 1 ? strings.STSNewLead :
                            props.items.lead_status === 2 ? strings.STSInFollowUp :
                                props.items.lead_status === 3 ? strings.STSReadyToVisit :
                                    props.items.lead_status === 4 ? strings.STSBooking :
                                        props.items.lead_status === 5 ? strings.STSRegistration :
                                            props.items.lead_status === 6 ? strings.STSClose :
                                                props.items.lead_status === 7 ? strings.STSReadyToBook :
                                                    strings.notfount
                        }
                    </Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.acquisitionSource} :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={[styles.nameTxt,]}>
                        {/*  1- By User 2 - By Self acquisition_source */}
                        {props.items.acquisition_source === 1 ? strings.byUser :
                            props.items.acquisition_source === 2 ? strings.bySelf : strings.notfount
                        }
                    </Text>
                </View>
            </View>
            {/* Property Required */}
            <>
                <View style={styles.headdingView}>
                    <Text style={styles.headdingTxt}>{strings.propertyrequired}</Text>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.configurations}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props.items?.configuration === '' ||
                            props.items?.configuration === undefined ||
                            props.items?.configuration === null ||
                            props.items?.configuration === "undefined" ?
                            strings.notfount :
                            props?.items?.configuration}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.areaSqft}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props.items?.areain_sqlft === '' ||
                            props.items?.areain_sqlft === undefined ||
                            props.items?.areain_sqlft === "undefined" ?
                            strings.notfount :
                            props?.items?.areain_sqlft}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.budget}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props.items?.min_budget || props.items?.max_budget ?
                            `${props.items?.min_budget} ${props.items?.min_budget_type} - ${props.items?.max_budget} ${props.items?.max_budget_type}`
                            : strings.notfount
                        }</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.natureOfFunding}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props.items?.funding_type === '' ||
                            props.items?.funding_type === undefined ||
                            props.items?.funding_type === "undefined" ?
                            strings.notfount :
                            props?.items?.funding_type}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.purpose}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props.items?.purpose === '' ||
                            props.items?.purpose === undefined ||
                            props.items?.purpose === "undefined" ?
                            strings.notfount :
                            props?.items?.purpose}</Text>
                    </View>
                </View>
            </>
            {/* Customer Details */}
            <>
                <View style={styles.headdingView}>
                    <Text style={styles.headdingTxt}>{strings.Customerdetails}</Text>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.visitor + " " + strings.name}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.items?.customer_detail?.first_name === '' ||
                            props.items?.customer_detail?.first_name === undefined ||
                            props.items?.customer_detail?.first_name === "undefined"
                            ? strings.notfount :
                            props?.items?.customer_detail?.first_name
                        }</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.location}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.items?.customer_detail?.location === '' ||
                            props.items?.customer_detail?.location === undefined ||
                            props.items?.customer_detail?.location === "undefined"
                            ? strings.notfount :
                            props?.items?.customer_detail?.location}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.age}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.items?.customer_detail?.age === '' ||
                            props.items?.customer_detail?.age === undefined ||
                            props.items?.customer_detail?.age === "undefined" || props.items?.customer_detail?.age === null
                            ? strings.notfount :
                            props?.items?.customer_detail?.age}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.gender}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.items?.customer_detail?.gender === '' ||
                            props.items?.customer_detail?.gender === undefined ||
                            props.items?.customer_detail?.gender === "undefined" || props.items?.customer_detail?.gender === null
                            ? strings.notfount :
                            props?.items?.customer_detail?.gender === 1 ? "Male" : "Female"}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.locality}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{
                            props?.items?.customer_detail?.city ? props?.items?.customer_detail?.city :
                                props?.items?.customer_detail?.locality ? props?.items?.customer_detail?.locality
                                    : strings.notfount}</Text>
                    </View>
                </View>
            </>
            {/* Company Details */}
            <>
                <View style={styles.headdingView}>
                    <Text style={styles.headdingTxt}>{strings.companydetails}</Text>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.natureOfOccuptn}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.items?.customer_detail?.occupation === '' ||
                            props.items?.customer_detail?.occupation === undefined ||
                            props.items?.customer_detail?.occupation === "undefined" || props.items?.customer_detail?.occupation === null
                            ? strings.notfount :
                            props?.items?.customer_detail?.occupation}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.company + " " + strings.name}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.items?.customer_detail?.coumpany_name === '' ||
                            props.items?.customer_detail?.coumpany_name === undefined ||
                            props.items?.customer_detail?.coumpany_name === "undefined" || props.items?.customer_detail?.coumpany_name === null
                            ? strings.notfount :
                            props?.items?.customer_detail?.coumpany_name}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.designation}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.items?.customer_detail?.desigantion === '' ||
                            props.items?.customer_detail?.desigantion === undefined ||
                            props.items?.customer_detail?.desigantion === "undefined" || props.items?.customer_detail?.desigantion === null
                            ? strings.notfount :
                            props?.items?.customer_detail?.desigantion}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.offcAddress}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.items?.customer_detail?.office_address === '' ||
                            props.items?.customer_detail?.office_address === undefined ||
                            props.items?.customer_detail?.office_address === "undefined" || props.items?.customer_detail?.office_address === null
                            ? strings.notfount :
                            props?.items?.customer_detail?.office_address}</Text>
                    </View>
                </View>
            </>
        </ScrollView>
    )
}

export default LeadDetailsIteam