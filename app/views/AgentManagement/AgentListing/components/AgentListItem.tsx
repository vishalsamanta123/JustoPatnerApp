import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import strings from '../../../../components/utilities/Localization';
import { BLACK_COLOR, YELLOW_COLOR, PURPLE_COLOR, GREEN_COLOR, RED_COLOR } from '../../../../components/utilities/constant';
import images from '../../../../assets/images';

const AgentListItem = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Agent Name</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.agent_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Location</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props.items.location === '' || props.items.location === undefined || props.items.location === "undefined" ?
              strings.notfount : props.items.location}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>RERA No.</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props.items.rera_certificate_no === '' || props.items.rera_certificate_no === undefined ?
              strings.notfount : props.items.rera_certificate_no
          }</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of Visit</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.total_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Total Site Visit</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.total_site_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of Closer Visit</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.total_closing_lead}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt, {
            // color: props.items.status ? GREEN_COLOR : RED_COLOR
          }]}>{props.items.status ? strings.active : strings.deactive}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {props.edit ?
          (<TouchableOpacity
            onPress={() => props.onPressView(props.items, 'edit')}
            style={[styles.buttonbox, {
              borderColor: PURPLE_COLOR
            }]} >
            <Text style={[styles.buttonTxt, {
              color: PURPLE_COLOR
            }]}>{strings.edit}</Text>
          </TouchableOpacity>)
          : <View />
        }
        {/* <TouchableOpacity
          onPress={() => { props.setIsVisible(true), props.setChangeStatus(props.items) }}
          style={[styles.buttonbox, {
            borderColor: props.items.status ? RED_COLOR : GREEN_COLOR
          }]} >
          <Text style={[styles.buttonTxt, {
            color: props.items.status ? RED_COLOR : GREEN_COLOR
          }]}>{props.items.status ? strings.deactive : strings.active}</Text>
        </TouchableOpacity> */}
        {props.view &&
          (<TouchableOpacity style={styles.Viewbutton} onPress={() => props.onPressView(props.items, 'view')} >
            <Image
              source={images.forwardArrow}
              style={styles.arrow}
            />
          </TouchableOpacity>)
        }
      </View>
    </View>
  );
};

export default AgentListItem;
