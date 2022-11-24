import { View, Text, StatusBar, FlatList, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { PRIMARY_THEME_COLOR_DARK } from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Header from "../../../../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import { DATA } from "../../../../components/utilities/DemoData";

const ImageContent = ({ navigation,route }: any) => {
  const insets = useSafeAreaInsets();

  const dataimage = route?.params || []
  console.log('dataimage: ', typeof dataimage === 'string');
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
        headerText={strings.imagecontentHeader}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
      />
      <View>
        {typeof dataimage === 'string' ? 
        <View style={{padding:normalizeSpacing(10)}}>
            
        <Image
          source={{uri:dataimage}}

          style={{
            width: '100%',
            height: normalizeHeight(300),
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      </View> :
        <FlatList data={dataimage}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
        }}
         renderItem={({item}) => (
          <View style={{padding:normalizeSpacing(10)}}>
            
            <Image
              source={{uri:item.base_url+item.document}}

              style={{
                width: '100%',
                height: normalizeHeight(300),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          </View>
         )} 
         ListFooterComponent={() => (
          <View style={{height: normalizeHeight(100)}} />
         )}
          />}
      </View>
    </View>
  );
};

export default ImageContent;
