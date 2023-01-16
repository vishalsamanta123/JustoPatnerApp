import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import strings from "app/components/utilities/Localization";
import moment from "moment";
import images from "app/assets/images";

const UserBankInfo = (props: any) => {
  const { allDetails } = props;
  console.log("allDetails: ", allDetails);
  return (
    <ScrollView style={styles.InformationView}>
      <View style={styles.fieldView}>
        <View style={styles.keyView}>
          <Text style={styles.keyText}>Sourcing Manager</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.valueView}>
          <Text style={styles.valueText}>
            {allDetails?.sourcing_manager_name !== ""
              ? allDetails?.sourcing_manager_name?.toUpperCase()
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
            source={{ uri: allDetails?.rera_certificate }}
            style={styles.imageSlider}
          />
          <TouchableOpacity
            style={styles.shadowView}
            onPress={() =>
              props.onpresContent("ImageContent", allDetails?.rera_certificate)
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
            source={{ uri: allDetails?.propidership_declaration_letter }}
            style={styles.imageSlider}
          />
          <TouchableOpacity
            style={styles.shadowView}
            onPress={() =>
              props.onpresContent(
                "ImageContent",
                allDetails?.propidership_declaration_letter
              )
            }
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
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
    </ScrollView>
  );
};

export default UserBankInfo;
