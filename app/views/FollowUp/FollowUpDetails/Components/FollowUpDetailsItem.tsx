import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './Styles'
import strings from '../../../../components/utilities/Localization'

const FollowUpDetailsItem = (props: any) => {
    const data = props?.data || {}
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.topDetailsView}>
                <View style={styles.topTxtView}>
                    <Text style={styles.topTxt}>Lead No. </Text>
                    <Text style={styles.topTxt}>{
                        data?.lead_no === '' ||
                            data?.lead_no === undefined ||
                            data?.lead_no === null ? strings.notfount
                            : data?.lead_no}</Text>
                </View>
            </View>
            <View style={styles.topDetailsView}>
                <View style={styles.topTxtView}>
                    <Text style={styles.topTxt}>Visitor Score </Text>
                    <Text style={styles.topTxt}>{data?.visit_score === '' ||
                        data?.visit_score === undefined ||
                        data?.visit_score === null ? strings.notfount
                        : data?.visit_score}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Property Name </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{data?.property?.property_title === '' ||
                        data?.property?.property_title === undefined ||
                        data?.property?.property_title === null ? strings.notfount
                        : data?.property?.property_title}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Last Interacted </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{data?.followup_date === '' ||
                        data?.followup_date === undefined ||
                        data?.followup_date === null ? strings.notfount
                        : data?.followup_date}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Source </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{data?.lead_source === '' ||
                        data?.lead_source === undefined ||
                        data?.lead_source === null ? strings.notfount
                        : data?.lead_source}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Status </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{data?.followup_status_title === '' ||
                        data?.followup_status_title === undefined ||
                        data?.followup_status_title === null ? strings.notfount
                        : data?.followup_status_title}</Text>
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
                        <Text style={styles.nameTxt}>{data?.customer?.configuration === '' ||
                            data?.customer?.configuration === undefined ||
                            data?.customer?.configuration === null ? strings.notfount
                            : data?.customer?.configuration}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Area (in sq.ft) </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.customer?.areain_sqlft === '' ||
                            data?.customer?.areain_sqlft === undefined ||
                            data?.customer?.areain_sqlft === null ? strings.notfount
                            : data?.customer?.areain_sqlft}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Budget </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        {data?.customer?.min_budget && data?.customer?.max_budget ?
                            <Text style={styles.nameTxt}>
                                {`${data?.customer?.min_budget} ${data?.customer?.min_budget_type}`} - {`${data?.customer?.max_budget} ${data?.customer?.max_budget_type}`}
                            </Text>
                            :
                            <Text style={styles.nameTxt}>{strings.notfount}</Text>}
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Nature Of Funding </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.customer?.funding_type === '' ||
                            data?.customer?.funding_type === undefined ||
                            data?.customer?.funding_type === null ? strings.notfount
                            : data?.customer?.funding_type}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Purpose </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.customer?.purpose === '' ||
                            data?.customer?.purpose === undefined ||
                            data?.customer?.purpose === null ? strings.notfount
                            : data?.customer?.purpose}</Text>
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
                        <Text style={styles.nameTxt}>{`${data?.customer?.first_name === '' ||
                            data?.customer?.first_name === undefined ||
                            data?.customer?.first_name === null ? strings.notfount
                            : data?.customer?.first_name}`}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Location</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.customer?.location === '' ||
                            data?.customer?.location === undefined ||
                            data?.customer?.location === null ? strings.notfount
                            : data?.customer?.location}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Age </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.customer?.location === '' ||
                            data?.customer?.location === undefined ||
                            data?.customer?.location === null ? strings.notfount
                            : data?.customer?.age}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Gender</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{
                            data?.customer?.gender === 1 ? 'Male' :
                                data?.customer?.gender === 2 ? 'Female' : strings.notfount}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Locality</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.customer?.locality === '' ||
                            data?.customer?.locality === undefined ||
                            data?.customer?.locality === null ? strings.notfount
                            : data?.customer?.locality}</Text>
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
                        <Text style={styles.nameTxt}>{data?.customer?.occupation === '' ||
                            data?.customer?.occupation === undefined ||
                            data?.customer?.occupation === null ? strings.notfount
                            : data?.customer?.occupation}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Company Name</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.customer?.coumpany_name === '' ||
                            data?.customer?.coumpany_name === undefined ||
                            data?.customer?.coumpany_name === null ? strings.notfount
                            : data?.customer?.coumpany_name}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Designation</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.customer?.desigantion === '' ||
                            data?.customer?.desigantion === undefined ||
                            data?.customer?.desigantion === null ? strings.notfount
                            : data?.customer?.desigantion}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Office Address</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.customer?.office_address === '' ||
                            data?.customer?.office_address === undefined ||
                            data?.customer?.office_address === null ? strings.notfount
                            : data?.customer?.office_address}</Text>
                    </View>
                </View>
            </>
        </ScrollView>
    )
}

export default FollowUpDetailsItem