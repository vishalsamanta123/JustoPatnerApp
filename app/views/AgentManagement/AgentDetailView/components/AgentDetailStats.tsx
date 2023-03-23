import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { GRAY_COLOR } from "../../../../components/utilities/constant";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import strings from "app/components/utilities/Localization";

const agentDetailItem = (props: any) => {
  return (
    <View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Closing Percentage</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.closingper === '' ||
            props.items.closingper === undefined || props.items.closingper === "undefined" ?
            strings.notfount :
            props.items.closingper}</Text>
        </View>
      </View>

      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of visit</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.visitor === '' ||
            props.items.visitor === undefined || props.items.visitor === "undefined" ?
            strings.notfount :
            props.items.visitor}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Total Site Visit</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.siteVisit === '' ||
            props.items.siteVisit === undefined || props.items.siteVisit === "undefined" ?
            strings.notfount :
            props.items.siteVisit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.total_closing_lead === '' ||
            props.items.total_closing_lead === undefined || props.items.total_closing_lead === "undefined" ?
            strings.notfount :
            props.items.total_closing_lead}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Login</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lastlogin === '' ||
            props.items.lastlogin === undefined || props.items.lastlogin === "undefined" ?
            strings.notfount :
            props.items.lastlogin}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Lead Create </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lastvisit === '' ||
            props.items.lastvisit === undefined || props.items.lastvisit === "undefined" ?
            strings.notfount :
            props.items.lastvisit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last site visit</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lastsitevisit === '' ||
            props.items.lastsitevisit === undefined || props.items.lastsitevisit === "undefined" ?
            strings.notfount :
            props.items.lastsitevisit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lastclosevisit === '' ||
            props.items.lastclosevisit === undefined || props.items.lastclosevisit === "undefined" ?
            strings.notfount :
            props.items.lastclosevisit}</Text>
        </View>
      </View>

    </View>
  );
};

export default agentDetailItem;
