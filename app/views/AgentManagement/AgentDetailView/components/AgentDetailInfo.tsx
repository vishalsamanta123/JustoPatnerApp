import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { BLACK_COLOR, GRAY_COLOR } from "../../../../components/utilities/constant";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import { ScrollView } from "react-native-gesture-handler";
import strings from "app/components/utilities/Localization";
import FastImages from "app/components/FastImage";
import Modal from "react-native-modal";


const agentDetailItem = (props: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const [onPressData, setOnPressData] = useState<any>('');

  return (
    <ScrollView>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.status ? strings.active : strings.deactive}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Name</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.AgentName}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Mobile no</Text>
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
          <Text style={styles.projectTxt}>Email</Text>
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
          <Text style={styles.projectTxt}>Whatsapp no.</Text>
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
          <Text style={styles.projectTxt}>RERA No.</Text>
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
          <Text style={styles.projectTxt}>Aadhaar no.</Text>
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
          <Text style={styles.projectTxt}>Pancard no.</Text>
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
          <Text style={styles.projectTxt}>Location</Text>
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
          <Text style={styles.projectTxt}>Working from</Text>
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
          <Text style={styles.projectTxt}>Working Location</Text>
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
          <Text style={styles.projectTxt}>Rera Certificate</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={[styles.nameContainer, { alignItems: 'center' }]}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true)
              setOnPressData(props.items.rera_certificate)
            }}
          >
            <FastImages
              source={{ uri: props.items.rera_certificate }}
              style={{
                width: normalizeWidth(80),
                height: normalizeHeight(80),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: normalize(10)
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Proprietorship declaration letter</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={[styles.nameContainer, { alignItems: 'center' }]}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true)
              setOnPressData(props.items.rera_certificate)
            }}
          >
            <FastImages
              source={{ uri: props.items.propidership_declaration_letter }}
              style={{
                width: normalizeWidth(80),
                height: normalizeHeight(80),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: normalize(10)
              }}
            />
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
