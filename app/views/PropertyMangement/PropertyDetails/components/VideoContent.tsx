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
import Video, { FilterType } from 'react-native-video';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Videoplay from './Videoplay';
import Button from 'app/components/Button';

const VideoContent = ({navigation,route}: any) => {

  const [playerVisible,setPlayerVisible] = useState(false)
  const [itemDetail,setItemDetail] = useState({})
  const insets = useSafeAreaInsets();
  const datavideos = route?.params || []
  // console.log("ImageContent -> items", datavideos)
  const handleBackPress = () => {
    navigation.goBack();
  };
  const playvideo = (item : any) => {
    //console.log(item)
    setItemDetail(item)
    setPlayerVisible(true)
  };

  //const playerRef = React.useRef<Video>(null);

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
        {/*  <VideoPlayer
        video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
        videoWidth={1600}
        videoHeight={900}
        thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
        /> */}
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
      />

    </View>
    
  )
}

export default VideoContent