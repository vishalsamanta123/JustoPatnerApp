import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles'
import strings from '../utilities/Localization'
import { PRIMARY_THEME_COLOR_DARK, PRIMARY_THEME_COLOR } from '../utilities/constant'
import { useSelector } from 'react-redux';

const Loader = (props: any) => {
  // const { loading } = useSelector((state: any) => state.loadingReducer);
  return (
    <View style={styles.containerStyle}>
      <View style={styles.indicatorViewStyle}>
        {<ActivityIndicator size={'large'} color={PRIMARY_THEME_COLOR} />}
      </View>
    </View>
)
  

};

export default Loader;