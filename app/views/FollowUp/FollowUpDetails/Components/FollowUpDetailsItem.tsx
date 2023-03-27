import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './Styles'
import strings from '../../../../components/utilities/Localization'
import moment from 'moment'
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/components/utilities/constant'

const FollowUpDetailsItem = (props: any) => {
    const data = props?.data || {}
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.topDetailsView}>
                <View style={styles.topTxtView}>
                    <Text style={styles.topTxt}>{strings.leadNo} </Text>
                    <Text style={styles.topTxt}>{
                        data?.lead_no === '' ||
                            data?.lead_no === undefined ||
                            data?.lead_no === null ? strings.notfount
                            : data?.lead_no}</Text>
                </View>
            </View>
            <View style={styles.topDetailsView}>
                <View style={styles.topTxtView}>
                    <Text style={styles.topTxt}>{strings.visitorScore} </Text>
                    <Text style={styles.topTxt}>{data?.lead_score === '' ||
                        data?.lead_score === undefined ||
                        data?.lead_score === null ? strings.notfount
                        : data?.lead_score}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.propertyHeader + " " + strings.name} </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{data?.property_title === '' ||
                        data?.property_title === undefined ||
                        data?.property_title === null ? strings.notfount
                        : data?.property_title}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.lastInteracted} </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{data?.followup_date === '' ||
                        data?.followup_date === undefined ||
                        data?.followup_date === null ? strings.notfount
                        : moment(data?.followup_date).format(DATE_TIME_FORMAT)}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.source} </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{data?.created_name === '' ||
                        data?.created_name === undefined ||
                        data?.created_name === null ? strings.notfount
                        : data?.created_name}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.status} </Text>
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
                        <Text style={styles.projectTxt}>{strings.configurations}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.configuration === '' ||
                            data?.configuration === undefined ||
                            data?.configuration === null ? strings.notfount
                            : data?.configuration}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.areaSqft} </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.areain_sqlft === '' ||
                            data?.areain_sqlft === undefined ||
                            data?.areain_sqlft === null ? strings.notfount
                            : data?.areain_sqlft}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.budget} </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        {data?.min_budget && data?.max_budget ?
                            <Text style={styles.nameTxt}>
                                {`${data?.min_budget} ${data?.min_budget_type}`} - {`${data?.max_budget} ${data?.max_budget_type}`}
                            </Text>
                            :
                            <Text style={styles.nameTxt}>{strings.notfount}</Text>}
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.natureOfFunding} </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.funding_type === '' ||
                            data?.funding_type === undefined ||
                            data?.funding_type === null ? strings.notfount
                            : data?.funding_type}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.purpose} </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{data?.purpose === '' ||
                            data?.purpose === undefined ||
                            data?.purpose === null ? strings.notfount
                            : data?.purpose}</Text>
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
                        <Text style={styles.nameTxt}>{`${data?.customer?.first_name === '' ||
                            data?.customer?.first_name === undefined ||
                            data?.customer?.first_name === null ? strings.notfount
                            : data?.customer?.first_name}`}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.location}</Text>
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
                        <Text style={styles.projectTxt}>{strings.age} </Text>
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
                        <Text style={styles.projectTxt}>{strings.gender}</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{
                            data?.customer?.gender === 1 ? strings.male :
                                data?.customer?.gender === 2 ? strings.female : strings.notfount}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>{strings.locality}</Text>
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
                        <Text style={styles.projectTxt}>{strings.natureOfOccuptn}</Text>
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
                        <Text style={styles.projectTxt}>{strings.company + " " + strings.name}</Text>
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
                        <Text style={styles.projectTxt}>{strings.designation}</Text>
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
                        <Text style={styles.projectTxt}>{strings.offcAddress}</Text>
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