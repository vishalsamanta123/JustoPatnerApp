import { Dimensions, StyleSheet } from "react-native";
import { normalize, normalizeHeight, normalizeSpacing } from "../../../../components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_SEMIBOLD, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: WHITE_COLOR,
  },
  headerTextStyle: {
    color: BLACK_COLOR,
  },
  logoView: {
    alignItems: "center",
    justifyContent: "center",
  },
  loginBanner: {
    width: width,
    height: 220,
  },
  inputView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  inputWrap: {
    marginVertical: normalizeSpacing(10),
    marginHorizontal: normalizeSpacing(20),
  },
  btnView: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  bottomView: {
    flex: 2,
    alignContent: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: normalizeSpacing(40),
    marginHorizontal: normalizeSpacing(30),
  },
  bottomText: {
    textAlign: 'center',
    fontSize: normalize(14),
    lineHeight: normalizeHeight(25),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: GRAY_LIGHT_COLOR
  },
  spanTouch: {
  },
  spanText: {
    textAlign: 'center',
    fontSize: normalize(14),
    lineHeight: normalizeHeight(25),
    color: PRIMARY_THEME_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
});

export default styles;
