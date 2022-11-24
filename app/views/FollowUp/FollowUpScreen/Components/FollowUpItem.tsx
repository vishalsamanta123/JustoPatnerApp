import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Styles'
import images from '../../../../assets/images'
import { BLACK_COLOR, YELLOW_COLOR, PURPLE_COLOR, PRIMARY_THEME_COLOR_DARK, PRIMARY_THEME_COLOR } from '../../../../components/utilities/constant'
import strings from '../../../../components/utilities/Localization'

const FollowUpItem = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead No. :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lead_no}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Score :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.visit_score}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Follow-Up Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.followup_date}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Customer Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.customer_first_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Configration :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.configuration}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget :</Text>
        </View>
        <View style={styles.nameContainer}>
          {props.items?.min_budget && props.items?.max_budget ? 
          <Text style={styles.nameTxt}>
          {`${props.items?.min_budget} ${props.items?.min_budget_type}`} - {`${props.items?.max_budget} ${props.items?.max_budget_type}`}
          </Text>
          : null }
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Followup Type :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props.items.followup_for == 1 ? 'Lead' :
            props.items.followup_for == 2 ? 'Site visit' :
            props.items.followup_for == 3 ? 'Booking' : 'regstration'
          }</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { borderColor: PURPLE_COLOR }]}
          onPress={() => props.onPressEdit(props.items)}
        >
          <Text style={[styles.buttonTxt, { color: PURPLE_COLOR }]}>{strings.edit}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { borderColor: PRIMARY_THEME_COLOR }]}
          onPress={() => props.onPressAllFollowUp(props.items)}
        >
          <Text style={[styles.buttonTxt, { color: PRIMARY_THEME_COLOR }]}>{strings.allfollowup}</Text>
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

export default FollowUpItem