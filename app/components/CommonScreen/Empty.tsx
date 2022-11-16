import React from 'react'
import { View ,Text} from 'react-native';
import styles from './styles'
import strings from '../utilities/Localization'

const Empty = (props: any) => {
 return (
    <View style={styles.centered}>
        <Text style={styles.title}>{props.message+' '+strings.notfount}</Text>
       {/*  <Text style={styles.subtitle}>Using Flexbox</Text> */}
  </View>
 )

};

export default Empty;