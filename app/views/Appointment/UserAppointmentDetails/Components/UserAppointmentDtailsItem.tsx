import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './Styles'
import moment from 'moment'
import { RED_COLOR, YELLOW_COLOR, GREEN_COLOR, BLACK_COLOR, MAP_KEY } from 'app/components/utilities/constant'
import strings from 'app/components/utilities/Localization'
import Geocoder from 'react-native-geocoding'

const UserAppointmentDtailsItem = (props: any) => {
  const appdetail = props?.status || {}
  const [location, setLocation] = useState("");
  Geocoder.init(MAP_KEY);
  if (
    appdetail?.latitude !== undefined &&
    appdetail?.longitude !== undefined &&
    appdetail?.latitude !== "" &&
    appdetail?.longitude !== "" &&
    appdetail?.latitude !== null &&
    appdetail?.longitude !== null
  ) {
    Geocoder.from(appdetail?.latitude, appdetail?.longitude)
      .then((json: any) => {
        var addressComponent = json.results[0].formatted_address;
        setLocation(addressComponent);
      })
      .catch((error: any) => console.warn(error));
  } else {
  }

  return (
    <ScrollView>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.date}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{moment(appdetail.appointment_date).format('DD-MM-YYYY')}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.appointmentType}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{appdetail.appointment_type_title}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.time}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{appdetail?.appointment_time}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.appointmentWith}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{appdetail.sender_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.status}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color:
                  appdetail.appointment_status == 1 ||
                    appdetail.appointment_status == 4
                    ? RED_COLOR
                    : appdetail.appointment_status == 2
                      ? YELLOW_COLOR
                      : appdetail.appointment_status == 3
                        ? GREEN_COLOR
                        : BLACK_COLOR,
              },
            ]}
          >
            {appdetail.appointment_status == 1
              ? strings.STSPending
              : appdetail.appointment_status == 2
                ? strings.STSConfirm
                : appdetail.appointment_status == 3
                  ? strings.STSComplete
                  : appdetail.appointment_status == 4
                    ? strings.STSAppointMentCancl
                    : strings.notfount}
          </Text>
        </View>
      </View>
      {(appdetail.appointment_status === 3 || appdetail.appointment_status === 4) ? <>
        <View style={styles.bottomView}>
          <Text style={styles.topTxt}>{strings.update + " " + strings.information}</Text>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.location}</Text>
          </View>
          <View><Text>:</Text></View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{location ? location : strings.notfount}</Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.remark}</Text>
          </View>
          <View><Text>:</Text></View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{appdetail.remark ? appdetail.remark : strings.notfount}</Text>
          </View>
        </View>
      </> : null}
    </ScrollView>
  )
}

export default UserAppointmentDtailsItem