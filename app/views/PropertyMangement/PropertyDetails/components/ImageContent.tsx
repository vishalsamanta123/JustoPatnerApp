import {
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Header from "../../../../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "../../../../components/scaleFontSize";
import Modal from "react-native-modal";
import FastImages from "app/components/FastImage";
import Button from "app/components/Button";
import Share from "react-native-share";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import RNFetchBlob from "rn-fetch-blob";
import { useDispatch } from "react-redux";

const ImageContent = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const { array, base_url } = route?.params || [];
  const [isVisible, setIsVisible] = useState(false);
  const [onPressData, setOnPressData] = useState<any>({});
  const [mediaArr, setMediaArr] = useState<any>([]);
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleSharePress = async (data: any) => {
    console.log('data: ', data);
    dispatch({ type: START_LOADING });

    const fs = RNFetchBlob.fs;
    // const mediaUrls = data?.map((item: any) => {
    //   return `${base_url}${item?.document}`;
    // });
    const mediaUrls = [`${base_url}${data?.document}`];
    let newArr: any = [];
    console.log('mediaUrls: ', mediaUrls);

    const finalUrls = mediaUrls.map((url: any) => {
      let imagePath: any = null;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch("GET", url)
        // the image is now dowloaded to device's storage
        .then((resp) => {
          // the image path you can use it directly with Image component
          imagePath = resp.path();
          return resp.readFile("base64");
        })
        .then(async (base64Data) => {
          // here's base64 encoded image
          // console.log(`data:image/png;base64,${base64Data}`);
          // mediaArr.push();
          // return JSON.stringify(base64Data);
          // remove the file from storage
          await newArr.push(`data:image/png;base64,${base64Data}`);
          setMediaArr(newArr);
          // console.log("newArr: ", newArr);
          // return fs.unlink(imagePath);
          // if (data?.length === newArr.length) {
            const options = {
              title: `${data?.title}`,
              urls: newArr,
            };
            const shareResponse = await Share.open(options).then((res: any) => {
              // console.log("ressd", res);
            });
            setMediaArr(null)
            dispatch({ type: STOP_LOADING });
          // }
        }).catch( () => dispatch({ type: STOP_LOADING })
        );
    });
    
  };
  const handleSharePressAll = async (data: any) => {
    console.log('data: ', data);
    dispatch({ type: START_LOADING });

    const fs = RNFetchBlob.fs;
    const mediaUrls = data?.map((item: any) => {
      return `${base_url}${item?.document}`;
    });
    // const mediaUrls = [`${base_url}${data?.document}`];
    let newArr: any = [];
    console.log('mediaUrls: ', mediaUrls);

    const finalUrls = mediaUrls.map((url: any) => {
      let imagePath: any = null;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch("GET", url)
        // the image is now dowloaded to device's storage
        .then((resp) => {
          // the image path you can use it directly with Image component
          imagePath = resp.path();
          return resp.readFile("base64");
        })
        .then(async (base64Data) => {
          // here's base64 encoded image
          // console.log(`data:image/png;base64,${base64Data}`);
          // mediaArr.push();
          // return JSON.stringify(base64Data);
          // remove the file from storage
          await newArr.push(`data:image/png;base64,${base64Data}`);
          setMediaArr(newArr);
          // console.log("newArr: ", newArr);
          // return fs.unlink(imagePath);
          if (data?.length === newArr.length) {
            const options = {
              title: `${data?.title}`,
              urls: newArr,
            };
            const shareResponse = await Share.open(options).then((res: any) => {
              // console.log("ressd", res);
            });
            setMediaArr(null)
            dispatch({ type: STOP_LOADING });
          }
        }).catch( () => dispatch({ type: STOP_LOADING })
        );
    });
    
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.imagecontentHeader}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
      />
      <View style={{flex:1}}>
        {typeof array === "string" ? (
          <View style={{ padding: normalizeSpacing(10) }}>
            <Image
              source={{ uri: array }}
              style={{
                width: "100%",
                height: normalizeHeight(300),
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
        ) : (
          <FlatList
            data={array}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(true);
                  setOnPressData(item);
                }}
                style={{ padding: normalizeSpacing(10) }}
              >
                <FastImages
                  source={{ uri: base_url + item.document }}
                  style={{
                    width: "100%",
                    height: normalizeHeight(300),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                 <TouchableOpacity
                    onPress={() => {
                      handleSharePress(item)
                    }}
                    style={styles.shareIconTouch}
                  >
                    <Image
                      source={images.shareIcon}
                      resizeMode={"contain"}
                      style={styles.shareImg}
                    />
                  </TouchableOpacity>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <View style={{ height: normalizeHeight(100) }} />
            )}
          />
        )}
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button
          width={135}
          buttonText={strings.shareFiles}
          handleBtnPress={() => handleSharePressAll(array)}
        />
      </View>
      <Modal 
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      backdropOpacity={0.9}
      >
        <View>
          <FastImages
            source={{ uri: base_url + onPressData.document }}
            style={{
              width: "100%",
              height: normalizeHeight(300),
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ImageContent;