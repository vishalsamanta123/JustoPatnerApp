import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Styles'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import { PURPLE_COLOR, CALL_COLOR } from '../../../../components/utilities/constant'

const SmAppointment = (props: any) => {
  return (
    <View style={styles.IteamView}>
    <View style={styles.Txtview}>
      <View style={styles.projectContainer}>
        <Text style={styles.projectTxt}>Date</Text>
      </View>
       <View><Text>:</Text></View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.date}</Text>
      </View>
    </View>
    <View style={styles.Txtview}>
      <View style={styles.projectContainer}>
        <Text style={styles.projectTxt}>Appointment Type</Text>
      </View>
       <View><Text>:</Text></View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.appointmentType}</Text>
      </View>
    </View>
    <View style={styles.Txtview}>
      <View style={styles.projectContainer}>
        <Text style={styles.projectTxt}>Time</Text>
      </View>
       <View><Text>:</Text></View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.time}</Text>
      </View>
    </View>
    <View style={styles.Txtview}>
      <View style={styles.projectContainer}>
        <Text style={styles.projectTxt}>Appointment With</Text>
      </View>
       <View><Text>:</Text></View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.appointmentWith}</Text>
      </View>
    </View>
    <View style={styles.Txtview}>
      <View style={styles.projectContainer}>
        <Text style={styles.projectTxt}>Status</Text>
      </View>
       <View><Text>:</Text></View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{props.items.Status}</Text>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button,{borderColor:PURPLE_COLOR}]}
        // onPress={() => props.onPressEdit()}
      >
        <Text style={[styles.buttonTxt,{color:PURPLE_COLOR}]}>{strings.edit}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button,{borderColor:CALL_COLOR}]}
        // onPress={() => props.onPressAllFollowUp()}
         >
        <Text style={[styles.buttonTxt,{color:CALL_COLOR}]}>{strings.call}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Viewbutton} onPress={() => props.onPressView(props.items)}>
        <Image
          source={images.forwardArrow}
          style={styles.arrow}
        />
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default SmAppointment