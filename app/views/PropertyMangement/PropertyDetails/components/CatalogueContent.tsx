import { View, Text, StatusBar, FlatList, Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import { DATA } from '../../../../components/utilities/DemoData';
import { normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';

const CatalogueContent = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
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
        <FlatList data={DATA}
        numColumns={3}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
         renderItem={({item}) => (
          <View>
            <Image
              source={item.image}

              style={{
                width: normalizeWidth(110),
                height: normalizeHeight(110),
                margin: normalizeSpacing(5),
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