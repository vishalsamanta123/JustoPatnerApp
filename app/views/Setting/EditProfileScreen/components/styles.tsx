import { StyleSheet } from "react-native";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";

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
  browseVw:  {
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
});

export default styles;