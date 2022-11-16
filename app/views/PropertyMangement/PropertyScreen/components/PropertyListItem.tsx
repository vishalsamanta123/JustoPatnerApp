import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import strings from '../../../../components/utilities/Localization';
import { BLACK_COLOR, YELLOW_COLOR,GOLDEN_COLOR,GREEN_COLOR,RED_COLOR } from '../../../../components/utilities/constant';
import images from '../../../../assets/images';
import moment from 'moment';

const PropertyListItem = (props: any) => {
  
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Project Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.property_title}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Location :</Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.location}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor :</Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.total_visitor}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Site Visit :</Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.site_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Colse Visit :</Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.close_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
         <Text style={[styles.nameTxt,{
          color: props.items.approve_status === 1 ? BLACK_COLOR : 
          props.items.approve_status === 2 ? YELLOW_COLOR : RED_COLOR
        }]}>{props.items.approve_status === 1 ? strings.pendingconfirm : 
          props.items.approve_status === 2 ? strings.subscribe : strings.unsubscribe}</Text>
        </View>
      </View>
      <View style={[styles.Txtview,{borderBottomWidth: 0}]} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Create Date :</Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{moment(props.items.createdDate).format('MM/DD/YYYY')}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={() => props.items.approve_status === 2 ? props.setIsVisible(true) : null}
         style={[styles.button, {
          borderColor: props.items.approve_status === 1 ? GREEN_COLOR : 
          props.items.approve_status === 2 ? RED_COLOR : GOLDEN_COLOR
        }]} >
          <Text style={[styles.buttonTxt,{
          color: props.items.approve_status === 1 ? GREEN_COLOR : 
          props.items.approve_status === 2 ? RED_COLOR : GOLDEN_COLOR
          }]}>{
            props.items.approve_status === 1 ? strings.active : 
            props.items.approve_status === 2 ? strings.unsubscribe : strings.subscribe 
          
          }</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Viewbutton} onPress={() => props.onPressView(props.items)} >
        <Image 
            source={images.forwardArrow}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PropertyListItem;
