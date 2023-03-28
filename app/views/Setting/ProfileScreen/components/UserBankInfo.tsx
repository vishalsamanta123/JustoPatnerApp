import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import strings from "app/components/utilities/Localization";
import moment from "moment";
import images from "app/assets/images";
import { OpenDoc } from "app/components/utilities/GlobalFuncations";

const UserBankInfo = (props: any) => {
  const { allDetails } = props;

  const declarationType = allDetails?.agencies?.declaration_letter_of_company?.substring(
    allDetails?.agencies?.declaration_letter_of_company?.lastIndexOf(".") + 1
  )
  return (
    <ScrollView style={styles.InformationView}>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.agency + " " + strings.name}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {allDetails?.agency_name !== ""
              ? allDetails?.agency_name?.toUpperCase()
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.gst + " " + strings.shortNum}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {allDetails?.agencies?.gst !== ""
              ? allDetails?.agencies?.gst?.toUpperCase()
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.RERA + " " + strings.registration + " " + strings.shortNum}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {allDetails?.agencies?.rera_registration !== ""
              ? allDetails?.agencies?.rera_registration?.toUpperCase()
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.pancard}</Text>
        </View>
        <View style={styles.ImageSliderContainer}>
          <Image
            source={{ uri: allDetails?.base_url + allDetails?.agencies?.pancard }}
            style={styles.imageSlider}
          />
          <TouchableOpacity
            style={styles.shadowView}
            onPress={() =>
              props.onpresContent("ImageContent", { array: allDetails?.base_url + allDetails?.agencies?.pancard })
            }
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.declrLttrCom}</Text>
        </View>
        <View style={styles.ImageSliderContainer}>
          {declarationType === 'pdf' ?
            <Image
              source={images.pdfIcone}
              style={styles.imageSlider}
            />
            :
            (<Image
              source={{ uri: allDetails?.base_url + allDetails?.agencies?.declaration_letter_of_company }}
              style={styles.imageSlider}
            />)}
          <TouchableOpacity
            style={styles.shadowView}
            onPress={() => {
              if (declarationType === 'pdf') {
                OpenDoc(allDetails?.base_url + allDetails?.agencies?.declaration_letter_of_company)
              } else {
                props.onpresContent("ImageContent", { array: allDetails?.base_url + allDetails?.agencies?.declaration_letter_of_company })
              }
            }}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subHeadVw}>
        <Text style={styles.subHeadTxt}>{strings.bankinfo}</Text>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.bankName}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {allDetails?.agencies?.agency_bank_detail?.bank_name === "" ||
              allDetails?.agencies?.agency_bank_detail?.bank_name === null
              ? strings.notfount
              : allDetails?.agencies?.agency_bank_detail?.bank_name
            }
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.branchName}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {allDetails?.agencies?.agency_bank_detail?.branch_name === "" ||
              allDetails?.agencies?.agency_bank_detail?.branch_name === null
              ? strings.notfount
              : allDetails?.agencies?.agency_bank_detail?.branch_name
            }
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.accountNo}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {allDetails?.agencies?.agency_bank_detail?.account_no === "" ||
              allDetails?.agencies?.agency_bank_detail?.account_no === null
              ? strings.notfount
              : allDetails?.agencies?.agency_bank_detail?.account_no
            }
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.ifscCode}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {allDetails?.agencies?.agency_bank_detail?.ifsc_code === "" ||
              allDetails?.agencies?.agency_bank_detail?.ifsc_code === null
              ? strings.notfount
              : allDetails?.agencies?.agency_bank_detail?.ifsc_code}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserBankInfo;
