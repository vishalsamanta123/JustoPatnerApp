import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import styles from "./Styles";
import Header from "app/components/Header";
import Button from "app/components/Button";
import { normalize, normalizeHeight, normalizeSpacing } from "app/components/scaleFontSize";
import DocumentPicker from "react-native-document-picker";
import { BLACK_COLOR, FONT_FAMILY_REGULAR, GREEN_COLOR, PRIMARY_THEME_COLOR, RED_COLOR } from "app/components/utilities/constant";
import DropdownInput from "app/components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { getAllAlloctaeProperty } from "app/Redux/Actions/propertyActions";
import Styles from "../../../../components/Modals/styles";
import { useFocusEffect } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import { UploadCSVFileRemove, uploadCSVFile, getBulkCSVfile } from "app/Redux/Actions/LeadsActions";

const CSVUpload = ({ navigation }: any) => {
  const { response = {}, list = "" } =
    useSelector((state: any) => state.uploadVisitorDetailCSVFileData) || {};
  const propertyData = useSelector((state: any) => state.propertyData) || {};
  const bulkvisitorData = useSelector((state: any) => state.visitorData) || {};
  const [csvFileData, setCSVfileData] = useState<any>("")
  const dispatch: any = useDispatch();
  const [allProperty, setAllProperty] = useState<any>([]);
  const [formData, setFormData] = useState<any>({
    property_id: "",
    property_type_title: "",
    property_title: "",
    uri: "",
    name: "",
    type: "",
  });
  const [csvData, setCsvData] = useState<any>({});
  useEffect(() => {
    if (propertyData?.response?.status === 200) {
      setAllProperty(propertyData?.response?.data);
    } else {
      setAllProperty([]);
    }
  }, [navigation, propertyData]);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getAllAlloctaeProperty({
          offset: 0,
        })
      );
      dispatch(getBulkCSVfile({}));
    }, [navigation]));

  useEffect(() => {
    if (bulkvisitorData?.response?.status === 200) {
      setCSVfileData(bulkvisitorData?.response?.data?.base_url +
        bulkvisitorData?.response?.data?.file)
    } else {
      setCSVfileData("")
    }
  }, [bulkvisitorData])
  useEffect(() => {
    if (response?.status === 200) {
      dispatch(
        UploadCSVFileRemove()
      );
      ErrorMessage({
        msg: response?.message,
        backgroundColor: GREEN_COLOR,
      });
      navigation.goBack()
    }
  }, [response]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleBrowsePress = async () => {
    const result: any = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles, DocumentPicker.types.pdf],
    });
    setCsvData({
      uri: result[0]?.uri,
      name: result[0]?.name,
      type: result[0]?.type
    })
    setFormData({
      ...formData,
      uri: result[0]?.uri,
      name: result[0]?.name,
      type: result[0]?.type,
    })
  }
  const handleUploadPress = () => {
    if (validation()) {
      const paramFormData = new FormData();
      paramFormData.append("document", formData?.document);
      paramFormData.append("property_id", formData?.property_id);
      paramFormData.append("visitorFile", csvData);
      dispatch(uploadCSVFile(paramFormData));
    }
  };
  const onPressCSV = () => {
    if (csvFileData) {
      function getUrlExtension(url: any) {
        return csvFileData.split(/[#?]/)[0].split(".").pop().trim();
      }
      const extension = getUrlExtension(csvFileData);
      console.log('extension: ', extension);
      const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;
      console.log('localFile: ', localFile);
      const options = {
        fromUrl: csvFileData,
        toFile: localFile,
      };
      console.log('options: ', options);
      RNFS.downloadFile(options)
        .promise.then((res :any) => {
          console.log('res: ', res);
          if(res?.statusCode === 200) {
            ErrorMessage({
              msg: strings.downloadSuccessCsv,
              backgroundColor: GREEN_COLOR
            })
            FileViewer.open(localFile)
          }
        })
        .then(() => {
          // success
        })
        .catch((error) => {
          console.log("error", error);
          // error
          ErrorMessage({
            msg: error?.message,
            backgroundColor: RED_COLOR
          })
        });
    }
  }
  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (formData?.property_id === "" && formData?.property_type_title === "") {
      isError = false;
      errorMessage = "Please select property name";
    } else
    if (formData?.uri === "" || formData?.uri === null) {
      isError = false;
      errorMessage = "Please select CSV file";
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
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
          console.log('item: ', item);
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
      <View style={styles.browseView}>
        <View
          style={[
            styles.AttachViewWrap,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.notFoundText}>Upload CSV file</Text>
            <Image source={images.star} style={styles.attachView} />
          </View>
          <View>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                handleBrowsePress();
              }}
            >
              <Text
                style={{
                  color: PRIMARY_THEME_COLOR,
                  fontSize: normalize(15),
                }}
              >
                {strings.browse}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
      {csvData.name ? (
        <View style={styles.uploadImage}>
          <Image source={images.pdfIcone} style={styles.image} />
        </View>
      ) : (
        <View style={styles.notFoundView}>
          <Text style={styles.notFoundText}>{strings.browseToUploadCsv}</Text>
        </View>
      )}
      <View style={[styles.uploadButton, { justifyContent: 'flex-end', alignItems: 'center' }]}>
        <TouchableOpacity onPress={() => onPressCSV()}
          style={{ marginVertical: normalizeHeight(25) }} >
          <Text style={[styles.uploadTxt, { color: BLACK_COLOR, fontFamily: FONT_FAMILY_REGULAR }]}>{strings.dowloadCSV}</Text>
        </TouchableOpacity>
        <View style={{ marginVertical: normalizeSpacing(20) }}>
          <Button
            buttonText={"Upload"}
            width={200}
            height={50}
            btnTxtsize={20}
            handleBtnPress={() => { handleUploadPress() }}
          />
        </View>
      </View>
    </View>
  );
};

export default CSVUpload;
