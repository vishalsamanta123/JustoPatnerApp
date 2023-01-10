import { View, Text, StatusBar, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { PRIMARY_THEME_COLOR_DARK, GRAY_LIGHT_COLOR } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import { DATA } from '../../../../components/utilities/DemoData';
import { normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";

const CatalogueContent = ({ navigation, route }: any) => {

  const datadocuments = route?.params || []

  const handleBackPress = () => {
    navigation.goBack();
  };
  const OpenDoc = async (url: any) => {
    function getUrlExtension(url: any) {
      return url.split(/[#?]/)[0].split(".").pop().trim();
    }
    const extension = getUrlExtension(url);

    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
      })
      .catch((error) => {
        console.log("error", error);
        // error
      });
  };
  return (
    <View style={styles.mainContainer}>
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
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => OpenDoc(`${item?.base_url}${item?.document}`)}
              style={{ padding: 10, borderColor: GRAY_LIGHT_COLOR, borderWidth: 1 }} >
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
            </TouchableOpacity>
          )}
          ListFooterComponent={() => (
            <View style={{ height: normalizeHeight(100) }} />
          )}
        />
      </View>
    </View>
  )
}

export default CatalogueContent