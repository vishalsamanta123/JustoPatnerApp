import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import images from '../../../../assets/images';
import { normalize, normalizeHeight, normalizeWidth } from '../../../../components/scaleFontSize';
import { GRAY_COLOR } from '../../../../components/utilities/constant';

const LeaderBoardCPItems = (props: any) => {
    return (
        <View style={styles.IteamView}>
            <Text style={styles.txtStyle}>{props?.items?.projectname}</Text>
            <Text style={styles.txtStyle}>{props?.items?.rank}</Text>
            <Text style={styles.txtStyle}>{props?.items?.sold_out}</Text>
        </View>
    );
};

export default LeaderBoardCPItems;
