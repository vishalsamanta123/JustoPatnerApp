import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { BLACK_COLOR, GRAY_COLOR, RED_COLOR } from "../../../../components/utilities/constant";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import { ScrollView } from "react-native-gesture-handler";
import strings from "app/components/utilities/Localization";
import FastImages from "app/components/FastImage";
import Modal from "react-native-modal";
import images from "app/assets/images";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import ErrorMessage from "app/components/ErrorMessage";

const agentDetailItem = (props: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const [onPressData, setOnPressData] = useState<any>('');

  const reraType = props.items.rera_certificate?.substring(
    props.items.rera_certificate?.lastIndexOf(".") + 1
  )
  const latterType = props.items.propidership_declaration_letter?.substring(
    props.items.propidership_declaration_letter?.lastIndexOf(".") + 1
  )
  const cancelType = props.items.cancel_cheaque?.substring(
    props.items.cancel_cheaque?.lastIndexOf(".") + 1
  )

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
    <ScrollView>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.status}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.status ? strings.active : strings.deactive}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.name}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.AgentName}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.mobileNo}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.Mobileno === '' ||
            props.items.Mobileno === undefined || props.items.Mobileno === "undefined" ?
            strings.notfount : props.items.Mobileno
          }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.email}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.Email === '' ||
            props.items.Email === undefined || props.items.Email === "undefined" ?
            strings.notfount :
            props.items.Email}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.whatsappNo}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.whatsappno === '' ||
            props.items.whatsappno === undefined || props.items.whatsappno === "undefined" ?
            strings.notfount :
            props.items.whatsappno}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.RERA + " " + strings.shortNum}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.rerano === '' ||
            props.items.rerano === undefined || props.items.rerano === "undefined" ?
            strings.notfount :
            props.items.rerano}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.aadhar + " " + strings.shortNum}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.aadharno === '' ||
            props.items.aadharno === undefined || props.items.aadharno === "undefined" ?
            strings.notfount :
            props.items.aadharno}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.pancard + " " + strings.shortNum}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.pancardno === '' ||
            props.items.pancardno === undefined || props.items.pancardno === "undefined" ?
            strings.notfount :
            props.items.pancardno}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.location}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.location === '' ||
            props.items.location === undefined || props.items.location === "undefined" ?
            strings.notfount :
            props.items.location}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.joinNow}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.workingfrom === '' ||
            props.items.workingfrom === undefined || props.items.workingfrom === "undefined" ?
            strings.notfount :
            props.items.workingfrom}</Text>
        </View>
      </View>
      <View style={[styles.Txtview, { alignItems: 'flex-start' }]}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.workingLocation}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          {props?.items?.workinglocation?.length > 0 ?
            props?.items?.workinglocation?.map((item: any) => {
              return (
                <Text
                  style={[
                    styles.nameTxt,
                    {
                      borderBottomColor: GRAY_COLOR,
                      borderBottomWidth: 1,
                      width: '100%',
                      marginVertical: normalizeSpacing(5)
                    },
                  ]}
                >
                  {item.location}
                </Text>
              )
            })
            : <Text style={styles.nameTxt}>{strings.notfount}</Text>
          }
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.reraCertificate}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={[styles.nameContainer, { alignItems: 'center' }]}>
          <TouchableOpacity
            onPress={() => {
              if (reraType === 'pdf') {
                OpenDoc(props.items.rera_certificate)
              } else {
                // setIsVisible(true)
                // setOnPressData(props.items.rera_certificate)
                OpenDoc(props.items.rera_certificate)
              }
            }}
          >
            {reraType === 'pdf' ?
              <Image
                source={images.pdfIcone}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10)
                }}
              />
              :
              (<FastImages
                source={{ uri: props.items.rera_certificate }}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10)
                }}
              />)}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.proprietorDeclarLttr}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={[styles.nameContainer, { alignItems: 'center' }]}>
          <TouchableOpacity
            onPress={() => {
              if (latterType === 'pdf') {
                OpenDoc(props.items.propidership_declaration_letter)
              } else {
                // setIsVisible(true)
                // setOnPressData(props.items.propidership_declaration_letter)
                OpenDoc(props.items.propidership_declaration_letter)
              }
            }}
          >
            {latterType === 'pdf' ?
              <Image
                source={images.pdfIcone}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10)
                }}
              />
              :
              (<FastImages
                source={{ uri: props.items.propidership_declaration_letter }}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10)
                }}
              />)}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headingView}>
        <Text style={styles.headingTxt}>{strings.bankDetail}</Text>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.bankName}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.bank_name === '' ||
            props.items.bank_name === undefined || props.items.bank_name === "undefined" ?
            strings.notfount :
            props.items.bank_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.accountNo}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.account_no === '' ||
            props.items.account_no === undefined || props.items.account_no === "undefined" ?
            strings.notfount :
            props.items.account_no}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.branchName}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.branch_name === '' ||
            props.items.branch_name === undefined || props.items.branch_name === "undefined" ?
            strings.notfount :
            props.items.branch_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.ifscCode}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.ifsc_code === '' ||
            props.items.ifsc_code === undefined || props.items.ifsc_code === "undefined" ?
            strings.notfount :
            props.items.ifsc_code}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.cancelCheque}</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={[styles.nameContainer, { alignItems: 'center' }]}>
          <TouchableOpacity
            onPress={() => {
              if (cancelType === 'pdf') {
                OpenDoc(props.items.base_url + props.items.cancel_cheaque)
              } else {
                // setIsVisible(true)
                // setOnPressData(props.items.base_url + props.items.cancel_cheaque)
                OpenDoc(props.items.base_url + props.items.cancel_cheaque)
              }
            }}
          >
            {cancelType === 'pdf' ?
              <Image
                source={images.pdfIcone}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10)
                }}
              />
              :
              (<FastImages
                source={{ uri: props.items.base_url + props.items.cancel_cheaque }}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10)
                }}
              />)}
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        onBackButtonPress={() => setIsVisible(false)}
      >
        <View>
          <FastImages
            source={{ uri: onPressData }}
            style={{
              width: "100%",
              height: normalizeHeight(300),
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </Modal>

    </ScrollView>
  );
};

export default agentDetailItem;
