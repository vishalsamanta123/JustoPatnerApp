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
import { PRIMARY_THEME_COLOR_DARK } from "../../../../components/utilities/constant";
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

const ImageContent = ({ navigation, route }: any) => {
  const { array, base_url } = route?.params || [];
  const [isVisible, setIsVisible] = useState(false);
  const [onPressData, setOnPressData] = useState<any>({});
  const handleBackPress = () => {
    navigation.goBack();
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
      <View>
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
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <View style={{ height: normalizeHeight(100) }} />
            )}
          />
        )}
      </View>
      <Modal 
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
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
