import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { GRAY_COLOR } from "../../../../components/utilities/constant";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import { ScrollView } from "react-native-gesture-handler";
import strings from "app/components/utilities/Localization";

const agentDetailItem = (props: any) => {
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
          <Text style={styles.projectTxt}>Agent Name</Text>
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

    </ScrollView>
  );
};

export default agentDetailItem;
