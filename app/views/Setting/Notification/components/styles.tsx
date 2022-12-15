import { normalize, normalizeSpacing } from "app/components/scaleFontSize";
import {
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "app/components/utilities/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  leftImageIconStyle: {
    tintColor: WHITE_COLOR,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    // alignItems: 'center',
    backgroundColor: WHITE_COLOR,
    borderBottomColor: "black",
    // borderBottomWidth: 1,
    justifyContent: "center",
    // height: 50,
    // margin: normalizeSpacing(20),
    marginHorizontal: normalizeSpacing(20),
    marginVertical: normalizeSpacing(10),
    borderRadius: normalizeSpacing(10),
    padding :normalizeSpacing(10)
},
rowBack: {
    backgroundColor: WHITE_COLOR,
    flex: 1,
    flexDirection: "row",
    paddingLeft: 15,
    marginVertical: normalizeSpacing(10),
    marginHorizontal: normalizeSpacing(20),
    borderRadius: normalizeSpacing(10),
    padding :normalizeSpacing(10)

  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    // borderRadius: normalizeSpacing(10),
    borderTopRightRadius: normalizeSpacing(10),
    borderBottomRightRadius: normalizeSpacing(10),


  },
  subjectText: {
    fontSize: normalize(16),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    padding: normalizeSpacing(5),
  },
  messageText: {
    fontSize: normalize(14),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    padding: normalizeSpacing(5),
  },
});

export default styles;
