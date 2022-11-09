import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './style';
import images from '../../../assets/images';
import Header from '../../../components/Header';
import strings from '../../../components/utilities/Localization';

const NotificationView = (props: any) => {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.mainContainer}>
        <Header
          leftImageSrc={images.menu}
          rightImageScr={images.notification}
          headerText={strings.notificationHeader}
          handleOnLeftIconPress={props.handleDrawerPress}
        />
        <View style={styles.dashboardWrap}>
          <Text>notification section</Text>
        </View>
        <View style={styles.secondPortion}>
          <Text>notification section</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationView;
