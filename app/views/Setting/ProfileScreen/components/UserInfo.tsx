import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import strings from "app/components/utilities/Localization";
import moment from "moment";
import { normalize, normalizeSpacing } from "app/components/scaleFontSize";
import images from "app/assets/images";
import { OpenDoc } from "app/components/utilities/GlobalFuncations";
import { GRAY_COLOR } from "app/components/utilities/constant";

const UserInfo = (props: any) => {
  const { allDetails } = props;
  const reraType = allDetails?.rera_certificate?.substring(
    allDetails?.rera_certificate?.lastIndexOf(".") + 1
  )
  const latterType = allDetails?.propidership_declaration_letter?.substring(
    allDetails?.propidership_declaration_letter?.lastIndexOf(".") + 1
  )
  const chequeType = allDetails?.cp_bank_detail?.cancel_cheaque?.substring(
    allDetails?.cp_bank_detail?.cancel_cheaque?.lastIndexOf(".") + 1
  )

  return (
    <ScrollView style={styles.InformationView}>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.name}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {allDetails?.agent_name?.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.aadhaar}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>{allDetails?.adhar_no}</Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.pancard + " " + strings.shortNum}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>{allDetails?.pancard_no}</Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.gender}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {allDetails?.gender === 1 ? strings.male : strings.female}
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.dateOfBirth}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {allDetails?.date_of_birth ? moment(allDetails?.date_of_birth).format("DD/MM/YYYY"): strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.mobileNo}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>{allDetails?.primary_mobile}</Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.whatsappNo}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>{allDetails?.whatsapp_number ? allDetails?.whatsapp_number : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.email}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={[styles.valueView]}>
          <Text
            style={[
              styles.valueText,
              {
                width: "100%",
                fontSize: normalize(14),
                paddingLeft: normalizeSpacing(15),
              },
            ]}
          >
            {allDetails?.email}
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.workingLocation}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={[styles.valueView]}>
        {allDetails?.working_location?.length > 0 ?
            allDetails?.working_location?.map((item: any) => {
              return (
                <Text
                  style={[
                    styles.valueText,
                    {
                      borderBottomColor: GRAY_COLOR,
                      borderBottomWidth: 1,
                      // width: '100%',
                      marginVertical: normalizeSpacing(5),
                      paddingLeft: 10,
                      textAlign: 'right'
                    },
                  ]}
                >
                  {item.location}
                </Text>
              )
            })
            : <Text style={styles.valueText}>{strings.notfount}</Text>
          }
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.sourcingMngr}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          {allDetails?.sourcing_managers?.length > 0 ? (
            allDetails?.sourcing_managers?.map((el: any, index: any) => {
              return (
                <Text style={styles.valueText}>
                  {el?.user_name}
                  {index < allDetails?.sourcing_managers?.length - 1 && ","}
                </Text>
              );
            })
          ) : (
            <Text style={styles.valueText}>{strings.notfount}</Text>
          )}
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
            {allDetails?.cp_bank_detail?.bank_name !== ""
              ? allDetails?.cp_bank_detail?.bank_name
              : strings.notfount}
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
            {allDetails?.cp_bank_detail?.branch_name !== ""
              ? allDetails?.cp_bank_detail?.branch_name
              : strings.notfount}
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
            {allDetails?.cp_bank_detail?.account_no !== ""
              ? allDetails?.cp_bank_detail?.account_no
              : strings.notfount}
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
            {allDetails?.cp_bank_detail?.ifsc_code !== ""
              ? allDetails?.cp_bank_detail?.ifsc_code
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.reraCertificate + " " + strings.shortNum}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {allDetails?.rera_certificate_no}
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.reraCertificate}</Text>
        </View>
        <View style={styles.ImageSliderContainer}>
          {reraType === 'pdf' ?
            <Image
              source={images.pdfIcone}
              style={styles.imageSlider}
            />
            :
            (
              <Image
                source={{ uri: `${allDetails?.rera_certificate}` }}
                style={styles.imageSlider}
              />
            )}
          <TouchableOpacity
            style={styles.shadowView}
            onPress={() => {
              if (reraType === 'pdf') {
                OpenDoc(allDetails?.rera_certificate)
              } else {
                props.onpresContent("ImageContent", {
                  array: allDetails?.rera_certificate,
                })
              }
            }}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.proprietorDeclarLttr}</Text>
        </View>
        <View style={styles.ImageSliderContainer}>
          {latterType === 'pdf' ?
            <Image
              source={images.pdfIcone}
              style={styles.imageSlider}
            />
            :
            (
              <Image
                source={{ uri: `${allDetails?.propidership_declaration_letter}` }}
                style={styles.imageSlider}
              />
            )}
          <TouchableOpacity
            style={styles.shadowView}
            onPress={() => {
              if (latterType === 'pdf') {
                OpenDoc(allDetails?.propidership_declaration_letter)
              } else {
                props.onpresContent("ImageContent", {
                  array: allDetails?.propidership_declaration_letter,
                })
              }
            }}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>{strings.cancelCheque}</Text>
        </View>
        <View style={styles.ImageSliderContainer}>
          {chequeType === 'pdf' ?
            <Image
              source={images.pdfIcone}
              style={styles.imageSlider}
            />
            :
            (<Image
              source={{ uri: `${allDetails?.base_url}${allDetails?.cp_bank_detail?.cancel_cheaque}` }}
              style={styles.imageSlider}
            />)}
          <TouchableOpacity
            style={styles.shadowView}
            onPress={() => {
              if (chequeType === 'pdf') {
                OpenDoc(allDetails?.base_url + allDetails?.cp_bank_detail?.cancel_cheaque)
              } else {
                props.onpresContent("ImageContent", {
                  array: allDetails?.base_url + allDetails?.cp_bank_detail?.cancel_cheaque,
                })
              }
            }}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserInfo;
