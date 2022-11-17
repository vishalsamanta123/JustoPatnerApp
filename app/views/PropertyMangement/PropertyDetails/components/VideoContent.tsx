import { View, Text, StatusBar, FlatList, Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import { normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';
import { DATA } from '../../../../components/utilities/DemoData';

const VideoContent = ({navigation,route}: any) => {
  const insets = useSafeAreaInsets();
  const datavideos = route?.params || []
  console.log("ImageContent -> items", datavideos)
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR_DARK,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={"light-content"} />
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.videocontentHeader}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
      />
      <View>
        <FlatList data={datavideos}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
         /*  justifyContent: 'center',
          alignItems: 'center' */
        }}
         renderItem={({item}) => (
          <View style={{padding:10}} >
            
            <Image
              //source={item.image}
              source={images.buildings}

              style={{
                width: '100%',
                height: normalizeHeight(300),
                //margin: normalizeSpacing(5),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          </View>
         )} 
         ListFooterComponent={() => (
          <View style={{height: normalizeHeight(100)}} />
         )}
          />
      </View>
    </View>
  )
}

export default VideoContent