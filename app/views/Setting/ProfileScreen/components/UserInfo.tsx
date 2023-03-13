import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import strings from "app/components/utilities/Localization";
import moment from "moment";
import { normalize, normalizeSpacing } from "app/components/scaleFontSize";
import images from "app/assets/images";

const UserInfo = (props: any) => {
  const { allDetails } = props;
  console.log('allDetails: ', allDetails);

  return (
    <ScrollView style={styles.InformationView}>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>Name</Text>
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
          <Text style={styles.keyText}>Aadhaar No.</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>{allDetails?.adhar_no}</Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>Pancard No.</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>{allDetails?.pancard_no}</Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>Gender</Text>
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
          <Text style={styles.keyText}>Date of Birth</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {moment(allDetails?.date_of_birth).format("DD/MM/YYYY")}
          </Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>Mobile No.</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>{allDetails?.primary_mobile}</Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>What'sapp No</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>{allDetails?.whatsapp_number}</Text>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>Email</Text>
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
          <Text style={styles.keyText}>Sourcing Manager</Text>
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
        <Text style={styles.subHeadTxt}>Bank Info</Text>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>Bank Name</Text>
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
          <Text style={styles.keyText}>Branch Name</Text>
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
          <Text style={styles.keyText}>Account No</Text>
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
          <Text style={styles.keyText}>IFSC Code</Text>
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
          <Text style={styles.keyText}>Rera Certificate No.</Text>
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
          <Text style={styles.keyText}>Rera Certificate</Text>
        </View>
        <View style={styles.ImageSliderContainer}>
          <Image
            source={{ uri: `${allDetails?.rera_certificate}` }}
            style={styles.imageSlider}
          />
          <TouchableOpacity
            style={styles.shadowView}
            onPress={() =>
              props.onpresContent("ImageContent", {
                array: allDetails?.rera_certificate,
              })
            }
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>Property declaration Letter</Text>
        </View>
        <View style={styles.ImageSliderContainer}>
          <Image
            source={{ uri: `${allDetails?.propidership_declaration_letter}` }}
            style={styles.imageSlider}
          />
          <TouchableOpacity
            style={styles.shadowView}
            onPress={() =>
              props.onpresContent("ImageContent", {
                array: allDetails?.propidership_declaration_letter,
              })
            }
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>Property declaration Letter</Text>
        </View>
        <View style={styles.ImageSliderContainer}>
          <Image
            source={{ uri: `${allDetails?.base_url}${allDetails?.cp_bank_detail?.cancel_cheaque}` }}
            style={styles.imageSlider}
          />
          <TouchableOpacity
            style={styles.shadowView}
            onPress={() =>
              props.onpresContent("ImageContent", {
                array: allDetails?.base_url + allDetails?.cp_bank_detail?.cancel_cheaque,
              })
            }
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserInfo;
