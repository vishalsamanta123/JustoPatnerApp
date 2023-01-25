import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import styles from "./Styles";
import Header from "app/components/Header";
import Button from "app/components/Button";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "app/components/scaleFontSize";
import DocumentPicker from "react-native-document-picker";
import { BLACK_COLOR, FONT_FAMILY_SEMIBOLD, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR } from "app/components/utilities/constant";
import DropdownInput from "app/components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { getAllAlloctaeProperty } from "app/Redux/Actions/propertyActions";
import Styles from "../../../../components/Modals/styles"
import { useFocusEffect } from "@react-navigation/native";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";

const CSVUpload = ({ navigation }: any) => {
  const propertyData = useSelector((state: any) => state.propertyData) || {};
  
    const dispatch: any = useDispatch();

    const [allProperty, setAllProperty] = useState<any>([]);
    const [formData, setFormData] = useState<any>({
      property_id: "",
      property_type_title: "",
      property_title: "",
    });
    const [csvData, setCsvData] = useState<any>({});
    useEffect(() => {
      if (propertyData?.response?.status === 200) {
        setAllProperty(propertyData?.response?.data);
      }
    }, [navigation]);
    useFocusEffect(
      React.useCallback(() => {
      dispatch(
        getAllAlloctaeProperty({
          offset: 0,
        })
      );
    }, [navigation]));
  
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleBrowsePress =async ()=>{
    const result: any = await DocumentPicker.pick({
      type: [DocumentPicker.types.csv],
    });
    setCsvData(result[0].uri)
    console.log('result[0].type: ', result);
  }
  const OpenDoc = async () => {
    let url = csvData
    const urlComponents = url.split('/')
    const fileNameAndExtension = urlComponents[urlComponents.length - 1]
    const localFile = `${RNFS.DocumentDirectoryPath}/${fileNameAndExtension}`

    console.log('file://' , 'file://' + localFile,);
    const options = {
      fromUrl: url,
      toFile: 'file://' + localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open('file://' + localFile))
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
        handleOnLeftIconPress={handleBackPress}
        leftImageIconStyle={styles.RightFirstIconStyle}
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.uploadCSV}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
      //   handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      <View style={[styles.inputWrap]}>
        <DropdownInput
          require={true}
          headingText={"Property"}
          placeholder={
            formData?.property_title ? formData?.property_title : "Property"
          }
          data={allProperty}
          inputWidth={"100%"}
          paddingLeft={16}
          maxHeight={300}
          labelField="property_title"
          valueField={"_id"}
          value={formData?.property_id}
          onChange={(item: any) => {
            setFormData({
              ...formData,
              property_id: item.property_id,
              property_type_title: item.property_type,
              property_title: item.property_title,
            });
          }}
          newRenderItem={(item: any) => {
            return (
              <>
                <View style={Styles.item}>
                  <Text style={Styles.textItem}>{item.property_title}</Text>
                </View>
              </>
            );
          }}
        />
      </View>
      <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' ,  marginHorizontal:normalizeSpacing(15)}}>
              <Text style={{
                fontSize: normalize(15),
                fontFamily: FONT_FAMILY_SEMIBOLD,
                color: PRIMARY_THEME_COLOR,
                textAlign: "center",
              }}>Upload CSV file</Text>
              <Image
                source={images.star}
                style={{
                  width: normalizeWidth(8),
                  height: normalizeHeight(8),
                  marginLeft: normalizeSpacing(5),
                  marginBottom: normalizeSpacing(5),
                }}
              />
            </View>
            <View style={{
               marginHorizontal:normalizeSpacing(15)
            }} >
              <TouchableOpacity
                style={{

                }}
                onPress={() => { handleBrowsePress()
                }}
              >
                <Text style={{ color: PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
              </TouchableOpacity>
            </View>
          </View>
        <TouchableOpacity
              style={{ width: '100%',marginVertical : normalizeHeight(20)}}
              onPress={()=> OpenDoc()}
              >
              <Image
                source={images.pdfIcone}
                style={{
                  width: '100%',
                  height: normalizeHeight(300),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            </TouchableOpacity>
        <View style={styles.uploadButton}>
        <TouchableOpacity style={{ marginVertical: normalizeHeight(50) }} >
          <Text style={styles.uploadTxt}>{strings.dowloadCSV}</Text>
        </TouchableOpacity>
          <Button
            buttonText={"Upload"}
            width={200}
            height={50}
            btnTxtsize={20}
            handleBtnPress={() => { }}
          />
        </View>
      </View>
  );
};

export default CSVUpload;
