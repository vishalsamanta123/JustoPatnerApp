import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './Styles'
import strings from '../../../../components/utilities/Localization'

const FollowUpDetailsItem = (props: any) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.topDetailsView}>
                <View style={styles.topTxtView}>
                    <Text style={styles.topTxt}>Lead No. </Text>
                    <Text style={styles.topTxt}>{props?.data?.lead_no}</Text>
                </View>
            </View>
            <View style={styles.topDetailsView}>
                <View style={styles.topTxtView}>
                    <Text style={styles.topTxt}>Visitor Score </Text>
                    <Text style={styles.topTxt}>{props?.data?.visit_score}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Property Name </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props?.data?.property?.property_title}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Last Interacted </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props?.data?.followup_date}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Source </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props?.data?.lead_source}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Status </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props?.data?.followup_status_title}</Text>
                </View>
            </View>
            {/* Property Required */}
            <>
                <View style={styles.headdingView}>
                    <Text style={styles.headdingTxt}>{strings.propertyrequired}</Text>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Configuration</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.configuration}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Area (in sq.ft) </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.areain_sqlft}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Budget </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        {props?.data?.customer?.min_budget && props?.data?.customer?.max_budget ?
                            <Text style={styles.nameTxt}>
                                {`${props?.data?.customer?.min_budget} ${props?.data?.customer?.min_budget_type}`} - {`${props?.data?.customer?.max_budget} ${props?.data?.customer?.max_budget_type}`}
                            </Text>
                            : null}
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Nature Of Funding </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.funding_type}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Purpose </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.purpose}</Text>
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
                        <Text style={styles.projectTxt}>Visitor Name</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{`${props?.data?.customer?.first_name} ${props?.data?.customer?.last_name}`}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Location</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.location}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Age </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.age}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Gender</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.gender == 1 ? 'Male' : 'Female'}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Locality</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.locality}</Text>
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
                        <Text style={styles.projectTxt}>Nature of Occupation</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.occupation}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Company Name</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.coumpany_name}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Designation</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.desigantion}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Office Address</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.office_address}</Text>
                    </View>
                </View>
            </>
        </ScrollView>
    )
}

export default FollowUpDetailsItem