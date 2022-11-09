import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import styles from './Styles'
import images from '../../../../assets/images'

const AppointmentDtailsItem = () => {
  return (
    <ScrollView>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>Visitor Score </Text>
          <Text style={styles.topTxt}>250</Text>
        </View>
        <Image
          source={images.qrCode}
          style={styles.qrImg}
        />
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>ABC</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>50L to 75L</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>When to buy</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>ASAP</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Configratiohn</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>2 BHK</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Site Visit Date Time</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>27/11/2022 11:00 AM</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>Abc Property Name</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>Pending</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment Craete by</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>Abc User Name</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>Yes</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup Location</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>197 Settelighttownship Bijalpur indore MP 452012</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Drop up Location</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>197 Settelighttownship Bijalpur indore MP 452012</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of Guest</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>3</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default AppointmentDtailsItem