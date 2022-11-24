import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import strings from 'app/components/utilities/Localization'
import moment from 'moment'

const UserInfo = (props: any) => {
  const {allDetails} = props;
  return (
    <View style={styles.InformationView}>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Name</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.agent_name?.toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Aadhar No.</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.adhar_no}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Pancard No.</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.pancard_no}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Gender</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.gender === 1 ? strings.male : strings.female}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Date of Birth</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{moment(allDetails?.date_of_birth).format('DD/MM/YYYY')}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Mobile No.</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.primary_mobile}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>What'sapp No</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.whatsapp_number}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Email</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.email}</Text>
            </View>
          </View>
        </View>
  )
}

export default UserInfo;