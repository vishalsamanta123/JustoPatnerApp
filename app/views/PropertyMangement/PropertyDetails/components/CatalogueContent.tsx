import { View, Text, StatusBar, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { PRIMARY_THEME_COLOR_DARK, GRAY_LIGHT_COLOR, RED_COLOR } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import { DATA } from '../../../../components/utilities/DemoData';
import { normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import ErrorMessage from 'app/components/ErrorMessage';
import Button from 'app/components/Button';
import { STOP_LOADING } from 'app/Redux/types';
import RNFetchBlob from 'rn-fetch-blob';
import { useDispatch } from 'react-redux';
import Share from 'react-native-share';

const CatalogueContent = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()

  const { array, base_url } = route?.params || [];
  const [mediaArr, setMediaArr] = useState<any>([]);

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
        ErrorMessage({
          msg: error?.message,
          backgroundColor: RED_COLOR
        })
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
      <View style={{flex:1}}>
        <FlatList data={array}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            /*  justifyContent: 'center',
             alignItems: 'center' */
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => OpenDoc(`${base_url}${item?.document}`)}
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
      {/* <View style={{ marginBottom: 10 }}>
        <Button
          width={135}
          buttonText={strings.shareFiles}
          handleBtnPress={() => handleSharePress(array)}
        />
      </View> */}
    </View>
  )
}

export default CatalogueContent