import { StyleSheet } from "react-native";
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "../../../../components/scaleFontSize";
import {
  BLACK_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
  PURPLE_COLOR,
} from "../../../../components/utilities/constant";

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  inputWrap: {
    flex: 1,
    marginTop: normalizeSpacing(30),
    marginHorizontal: normalizeSpacing(20),
  },
  mainContainer: {
    flex: 1,
  },
  propertyListView: {
    flex: 1,
    margin: normalizeSpacing(5),
  },
  TopBtnView: {
    flexDirection: "row",
    marginVertical: normalizeSpacing(10),
    alignItems: "flex-end",
  },
  IteamView: {
    backgroundColor: WHITE_COLOR,
    marginHorizontal: normalizeSpacing(10),
    borderRadius: 10,
    marginVertical: normalizeSpacing(10),
  },
  Txtview: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
    padding: normalizeSpacing(4),
    marginTop: normalizeSpacing(2),
  },
  projectContainer: {
    flex: 2.5,
    alignItems: "flex-end",
  },
  projectTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: GRAY_LIGHT_COLOR,
  },
  nameContainer: {
    flex: 3.5,
    alignItems: "flex-start",
  },
  nameTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    color: BLACK_COLOR,
    marginHorizontal: normalizeSpacing(10),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: normalizeSpacing(10),
  },
  button: {
    top: 10,
    backgroundColor: WHITE_COLOR,
    width: normalizeWidth(100),
    height: normalizeHeight(30),
    marginLeft: normalizeSpacing(10),
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonedit: {
    top: 10,
    backgroundColor: WHITE_COLOR,
    width: normalizeWidth(100),
    height: normalizeHeight(25),
    marginLeft: normalizeSpacing(10),
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: PURPLE_COLOR,
  },
  Viewbutton: {
    top: 10,
    backgroundColor: PRIMARY_THEME_COLOR,
    borderBottomEndRadius: 10,
    borderTopLeftRadius: 10,
    padding: normalizeSpacing(5),
  },
  arrow: {
    tintColor: WHITE_COLOR,
    width: normalizeWidth(30),
    height: normalizeHeight(30),
  },
  buttonTxt: {
    textAlign: "center",
  },
  BulkMainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadView: {
    backgroundColor: PRIMARY_THEME_COLOR,
    width: "90%",
    height: normalizeHeight(100),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: normalizeSpacing(10),
  },
  uploadTxt: {
    color: WHITE_COLOR,
    fontSize: normalize(18),
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  browseView: {
    margin: normalizeSpacing(20),
    flex: 1,
  },
  uploadImage: {
    flex: 3,
    alignItems: "center",
    borderRadius: 20,
  },
  image: {
    height: normalizeHeight(250),
    width: normalizeWidth(250),
    borderRadius: 20,
  },
  uploadButton: {
    flex: 1,
    justifyContent: "flex-start",
    // marginBottom: normalizeSpacing(20),
  },
  notFoundView: {
    flex: 2,
    alignItems: "center",
  },
  notFoundText: {
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: BLACK_COLOR,
    marginHorizontal: normalizeSpacing(10),
  },
  attachView: {
    width: normalizeWidth(8),
    height: normalizeHeight(8),
    marginLeft: normalizeSpacing(5),
    marginBottom: normalizeSpacing(5),
  },
  browseVw: {
    width: normalizeWidth(120),
    height: normalizeHeight(50),
    backgroundColor: WHITE_COLOR,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 10,
  },
  AttachViewWrap: {
    flex: 1,
  },
  butttonMargin: { marginTop: normalize(20) },
});

export default styles;
