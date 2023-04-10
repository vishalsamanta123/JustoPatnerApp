import { View, Text, Image, TouchableOpacity, } from "react-native";
import React, { useState } from "react";
import styles from "./Styles";
import strings from "../../../../components/utilities/Localization";
import { DATE_TIME_FORMAT, GREEN_COLOR, RED_COLOR, } from "../../../../components/utilities/constant";
import moment from "moment";
import { normalizeSpacing } from "app/components/scaleFontSize";
import ContentView from "./ContentView";

const ImageCsvDataView = (props: any) => {
    const [documentView, setDocumentView] = useState(false)
    const item = props?.items || {};
    console.log('item: ImageCsvDataView', item);
    return (
        <View style={styles.IteamView}>
            <View style={styles.dataView}>
                {props.keyType === 'first' ?
                    <TouchableOpacity style={{ marginHorizontal: normalizeSpacing(6) }}
                        onPress={() => setDocumentView(true)}>
                        <Image
                            source={{ uri: item?.document }}
                            style={styles.docImg}
                        />
                    </TouchableOpacity>
                    : null
                }
                <View style={{ flex: 2, }}>
                    <View style={styles.Txtview}>
                        <View style={[styles.projectContainer, {
                            alignItems: props.keyType === 'first' ?
                                "flex-start" : "flex-end"
                        }]}>
                            <Text style={styles.projectTxt}>{(props.keyType === 'first' ? strings.cpCapital : strings.visitor) + " " + strings.name}</Text>
                        </View>
                        <View>
                            <Text>:</Text>
                        </View>
                        <View style={styles.nameContainer}>
                            {props.keyType === 'first' ? <Text style={styles.nameTxt}>
                                {item?.user_name === "" || item?.user_name === undefined
                                    || item?.user_name === null ? strings.notfount
                                    : item?.user_name}
                            </Text> :
                            <Text style={styles.nameTxt}>
                                {item?.first_name === "" || item?.first_name === undefined
                                    || item?.first_name === null ? strings.notfount
                                    : item?.first_name}
                            </Text>}
                        </View>
                    </View>
                    <View style={styles.Txtview}>
                        <View style={[styles.projectContainer, {
                            alignItems: props.keyType === 'first' ?
                                "flex-start" : "flex-end"
                        }]}>
                            <Text style={styles.projectTxt}>{strings.property + " " + strings.name}</Text>
                        </View>
                        <View>
                            <Text>:</Text>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text numberOfLines={2}
                                style={styles.nameTxt}>{item?.property_title === "" || item?.property_title === undefined
                                    || item?.property_title === null ? strings.notfount
                                    : item?.property_title}</Text>
                        </View>
                    </View>
                    {props.keyType === 'second' ?
                        <View style={styles.Txtview}>
                            <View style={styles.projectContainer}>
                                <Text style={styles.projectTxt}>{strings.createdDate}</Text>
                            </View>
                            <View>
                                <Text>:</Text>
                            </View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>
                                    {item?.created_date === "" || !item?.created_date
                                        ? strings.notfount
                                        : `${moment(item?.created_date).format(DATE_TIME_FORMAT)}`}
                                </Text>
                            </View>
                        </View> : null
                    }
                    <View style={[styles.Txtview, {
                        borderBottomWidth: 0
                    }]}>
                        <View style={[styles.projectContainer, {
                            alignItems: props.keyType === 'first' ?
                                "flex-start" : "flex-end"
                        }]}>
                            <Text style={styles.projectTxt}>{strings.status}</Text>
                        </View>
                        <View>
                            <Text>:</Text>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={[styles.nameTxt, {
                                color: item?.lead_status === 2 ? GREEN_COLOR : RED_COLOR
                            }]}>{item?.lead_status === 1 ?
                                strings.STSPending : item?.lead_status === 2 ? strings.STSConfirm : strings.notfount}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ContentView
                Visible={documentView}
                setIsVisible={setDocumentView}
                contentData={item?.document}
            />
        </View>
    );
};

export default ImageCsvDataView;
