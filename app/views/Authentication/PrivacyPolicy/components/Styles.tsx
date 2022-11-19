import { Dimensions, StyleSheet } from "react-native";
import { normalize, normalizeHeight, normalizeSpacing } from "../../../../components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_SEMIBOLD, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
const {width, height} = Dimensions.get('window');

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
  logoView: {
    alignItems: "center",
    justifyContent: "center",
  },
  loginBanner: {
    width: width,
    height: 220,
  },
  inputView: {
    flex: 4,
    //justifyContent: 'flex-end',
    marginTop:normalizeSpacing(15),
    height:normalizeHeight(375),
   },
  inputWrap: {
    marginVertical: normalizeSpacing(10),
    marginHorizontal: normalizeSpacing(20),
  },
  btnView: {
    marginVertical: 20
  },
  bottomView: {
    flex: 2,
    alignContent: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: normalizeSpacing(10),
   
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
  wrap: {
    flexGrow: 1,
    marginHorizontal: normalizeSpacing(10),
    marginVertical: normalizeSpacing(5),
    alignItems: 'center'
  },
});

export default styles;
