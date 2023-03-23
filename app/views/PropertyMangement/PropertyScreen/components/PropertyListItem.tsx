import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import strings from '../../../../components/utilities/Localization';
import { BLACK_COLOR, YELLOW_COLOR, GOLDEN_COLOR, GREEN_COLOR, RED_COLOR, DATE_TIME_FORMAT } from '../../../../components/utilities/constant';
import images from '../../../../assets/images';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { statusUpdate } from 'app/Redux/Actions/propertyActions';
import usePermission from 'app/components/utilities/UserPermissions';

const PropertyListItem = (props: any) => {
  const dispatch: any = useDispatch()
  const { status, view } = usePermission({
    status: 'property_status_update',
    view: 'view_property',
  })
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
          <Text style={styles.projectTxt}>Locality :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.location}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Location :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.area ? props.items.area : strings.notfount}</Text>
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
          <Text style={styles.projectTxt}>Closer Visit :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.close_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Approve Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt, {
            color: typeof props.items.property_active_status === 'undefined' || props.items.property_active_status ?
              props.items.approve_status === 1 ? BLACK_COLOR :
                props.items.approve_status === 2 ? YELLOW_COLOR :
                  RED_COLOR : RED_COLOR
          }]}>{
              typeof props.items.property_active_status === 'undefined' || props.items.property_active_status ?
                props.items.approve_status === 1 ? strings.pending :
                  props.items.approve_status === 2 ? strings.subscribe :
                    props.items.approve_status === 3 && strings.unsubscribe
                : strings.inprocess

            }</Text>
        </View>
      </View>
      <View style={[styles.Txtview, { borderBottomWidth: 0 }]} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt, {
            color: props.items.status ? GREEN_COLOR : RED_COLOR
          }]}>{props.items.status ? 'Active' : 'Inactive'}</Text>
        </View>
      </View>
      <View style={[styles.Txtview, { borderBottomWidth: 0 }]} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Create Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{moment(props.items.createdDate).format(DATE_TIME_FORMAT)}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {status ? typeof props.items.property_active_status === 'undefined' || props.items.property_active_status ?
          (<TouchableOpacity
            /* onPress={() => props.items.approve_status === 2 ? props.setIsVisible(true) : props.setIsVisible(true)} */
            onPress={() => props.confirmStatus(props.items)}
            style={[styles.button, {
              borderColor: props.items.approve_status === 1 ? GREEN_COLOR :
                props.items.approve_status === 2 ? RED_COLOR : GOLDEN_COLOR
            }]} >
            <Text style={[styles.buttonTxt, {
              color: props.items.approve_status === 1 ? GREEN_COLOR :
                props.items.approve_status === 2 ? RED_COLOR : GOLDEN_COLOR
            }]}>{
                props.items.approve_status === 1 ? strings.accept :
                  props.items.approve_status === 2 ? strings.unsubscribe : strings.subscribe

              }</Text>
          </TouchableOpacity>)
          :
          // (<TouchableOpacity
          //   onPress={() => {
          //     dispatch(statusUpdate({
          //       property_id: props?.items?.property_id,
          //       approve_status: 3,
          //       resion_id: '',
          //     }))
          //   }}
          //   style={[styles.button, {
          //     borderColor: RED_COLOR
          //   }]} >
          //   <Text style={[styles.buttonTxt, {
          //     color: RED_COLOR
          //   }]}>{
          //       'DeActive'
          //     }</Text>
          // </TouchableOpacity>)
          <View></View>
          : <View/>
        }
        {view &&
          (<TouchableOpacity style={styles.Viewbutton} onPress={() => props.onPressView(props.items)} >
            <Image
              source={images.forwardArrow}
              style={styles.arrow}
            />
          </TouchableOpacity>)}
      </View>
    </View>
  );
};

export default PropertyListItem;
