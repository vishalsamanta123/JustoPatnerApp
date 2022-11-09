import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './Styles'
import strings from '../../../../components/utilities/Localization'
import images from '../../../../assets/images'
import { PURPLE_COLOR, CALL_COLOR } from '../../../../components/utilities/constant'

const VisitorAppointment = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visit Date time</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.SiteVisitDateTime}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Customer Name</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.Customername}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead No.</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.Leadno}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.Pickup}</Text>
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
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visiting Score</Text>
        </View>
         <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.VisitingScore}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        { props.items.Status !== 'Confirmed' && props.items.Status !== 'Visitor not interested' ?
        (<TouchableOpacity
          style={[styles.button,{borderColor:PURPLE_COLOR}]}
        // onPress={() => props.onPressEdit()}
        >
          <Text style={[styles.buttonTxt,{color:PURPLE_COLOR}]}>{strings.edit}</Text>
        </TouchableOpacity>)
        : null
        }
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

export default VisitorAppointment