import { View, Text, StatusBar, FlatList, Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { PRIMARY_THEME_COLOR_DARK, GRAY_LIGHT_COLOR } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import { DATA } from '../../../../components/utilities/DemoData';
import { normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';

const CatalogueContent = ({navigation,route}: any) => {
  const insets = useSafeAreaInsets();

  const datadocuments = route?.params || []
  // console.log("ImageContent -> items", datadocuments)

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
        headerText={strings.cataloguecontentHeader}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
      />
      <View>
        <FlatList data={datadocuments}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
         /*  justifyContent: 'center',
          alignItems: 'center' */
        }}
         renderItem={({item}) => (
          <View style={{padding:10,borderColor:GRAY_LIGHT_COLOR,borderWidth:1}} >
            
            <Image
              //source={item.image}
              source={images.pdfIcone}

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

export default CatalogueContent