import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import styles from './Styles'
import moment from 'moment'

const UserAppointmentDtailsItem = (props : any) => {
  const appdetail = props?.status || {}
  return (
    <ScrollView>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Date</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{moment(appdetail.appointment_date).format('DD-MM-YYYY')}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment Type</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{appdetail.appointment_type_title}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Time</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{appdetail?.appointment_time}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment With</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{appdetail.sender_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{
            appdetail.appointment_status == 1 ? 'Pending' :
              appdetail.appointment_status == 2 ? 'Confirm' :
                appdetail.appointment_status == 3 ? 'Complete' : 'Appointment cancel'
          }</Text>
        </View>
      </View>
      { appdetail.appointment_status === 'Complete' ? <>
      <View style={styles.bottomView}>
        <Text style={styles.topTxt}>SH update information</Text>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Location</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>Ei-Tara powai mumbai maharashtra 452012</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>SM Note</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English</Text>
        </View>
      </View>
     </> : null }
    </ScrollView>
  )
}

export default UserAppointmentDtailsItem