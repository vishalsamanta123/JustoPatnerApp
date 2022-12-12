import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import images from '../../../../assets/images';
import { normalizeHeight, normalizeWidth } from '../../../../components/scaleFontSize';

const LeaderBoardItems = (props: any) => {
    return (
        <View style={styles.IteamView}>
            <Image
                source={props?.items?.projectImg}
                resizeMode={'contain'}
                style={{ width: normalizeWidth(100), height: normalizeHeight(100) }}
            />
            <View style={styles.Txtview}>
                <View>
                    <Text style={styles.projectTxt}>{props?.items?.projectname}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.columnVw}>
                            <Text style={styles.nameTxt}>TOTAL FLAT</Text>
                            <Text style={styles.txtStyle}>{props?.items?.totalFlat}</Text>
                        </View>
                        <View style={styles.columnVw}>
                            <Text style={styles.nameTxt}>SOLD OUT</Text>
                            <Text style={styles.txtStyle}>{props?.items?.sold_out}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.Viewbutton} onPress={props.onPressView}>
                    <Image
                        source={images.forwardArrow}
                        style={styles.arrow}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LeaderBoardItems;
