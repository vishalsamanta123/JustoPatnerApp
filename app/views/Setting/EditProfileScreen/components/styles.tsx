import { StyleSheet } from "react-native";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  headerTextStyle: {
    color: WHITE_COLOR,
  },
  leftImageIconStyle: {
    tintColor: WHITE_COLOR
  },
  wrap: {
    flexGrow: 1,
    margin: normalizeSpacing(20),
  },
  imageCircle: {
    backgroundColor: GRAY_COLOR,
    marginVertical: normalizeSpacing(10),
    borderRadius: normalizeSpacing(100),
    height: normalizeHeight(100),
    width: normalizeWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputWrap: {
    marginTop: normalizeSpacing(30),
    alignItems: 'center'
  },
  starightVw: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textVw: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  genderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: normalizeSpacing(10),
    width: '100%'
  },
  genderTxt: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: BLACK_COLOR,
  },
  radioView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalizeSpacing(10)
  },
  radioTxt: {
    fontSize: normalize(18),
  },
  headingText: {
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: PRIMARY_THEME_COLOR,
    textAlign: 'center',
  },
  userImage: {
    height: normalizeHeight(100),
    width: normalizeWidth(100),
    borderRadius: normalizeSpacing(80)
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
  addedTxt: {
    width: 120,
    fontSize: 12,
    alignSelf: 'flex-end',
    textAlign: 'center'
  },
  editView: {
    position: "absolute",
    top: 5,
    bottom: 0,
    right: 0,
  },
  editImage: {
    width: normalizeWidth(20),
    height: normalizeHeight(20),
    backgroundColor: GRAY_COLOR,
    borderRadius: 100,
  },
  straightVw: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalizeSpacing(16),
    marginTop: normalizeSpacing(6),
  },
  workingView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: normalizeSpacing(10),
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: PRIMARY_THEME_COLOR,
    width: normalizeWidth(140),
    height: normalizeHeight(25),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  addTxt: {
    color: WHITE_COLOR,
    textTransform: "uppercase",
    fontSize: normalize(13),
    fontFamily: FONT_FAMILY_EXTRABOLD,
  },
  workTxt: {
    color: BLACK_COLOR,
    textTransform: "uppercase",
    fontSize: normalize(13),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    marginLeft: normalize(5),
  },
  inputBoxVw: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    padding: normalizeSpacing(5),
    borderColor: GRAY_COLOR,
    width: "100%",
    marginTop: normalize(6),
  },
  inputBoxItmVw: {
    paddingVertical: normalize(5),
    borderBottomWidth: 0.6,
    borderColor: BLACK_COLOR,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBoxItmTxt: {
    fontSize: normalize(16),
    paddingRight: normalizeSpacing(30),
    // paddingLeft: normalizeSpacing(Isios ? 5 : 15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    opacity: 0.6,
    color: BLACK_COLOR,
    width: "90%",
  },
  crossVw: {
    width: normalizeWidth(18),
    height: normalizeHeight(18),
    marginHorizontal: 5,
    tintColor: BLACK_COLOR,
  },
});

export default styles;