import { View, Text, StatusBar, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import { normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';
import { DATA } from '../../../../components/utilities/DemoData';
import Videoplay from './Videoplay';
import Button from 'app/components/Button';

const VideoContent = ({navigation,route}: any) => {

  const [playerVisible,setPlayerVisible] = useState(false)
  const [itemDetail,setItemDetail] = useState({})
  const { array, base_url } = route?.params || [];
  const handleBackPress = () => {
    navigation.goBack();
  };
  const playvideo = (item : any) => {
    setItemDetail(item)
    setPlayerVisible(true)
  };

  return (
    <View style={styles.mainContainer}>
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
        <FlatList data={array}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
         /*  justifyContent: 'center',
          alignItems: 'center' */
        }}
         renderItem={({item}) => (
          <View style={{padding:10}} >
           
          
            <Image
              source={{uri: base_url + item?.video_thumbnail}}
              style={{
                width: '100%',
                height: normalizeHeight(300),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
            <View style={styles.playbtntch}>
             <Button width={48} 
               handleBtnPress = {() => playvideo(item)} 
                buttonText={strings.playVideo}
                />
                </View>
          </View>
         )} 
         ListFooterComponent={() => (
          <View style={{height: normalizeHeight(100)}} />
         )}
          />
      </View>

      <Videoplay
        Visible={playerVisible}
        setIsVisible={setPlayerVisible}
        itemDetail={itemDetail}
        base_url={base_url}
      />

    </View>
    
  )
}

export default VideoContent