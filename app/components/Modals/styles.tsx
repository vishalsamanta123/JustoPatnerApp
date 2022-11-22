import { StyleSheet } from "react-native";
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "../scaleFontSize";
import {
  BLACK_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  WHITE_COLOR,
  PRIMARY_THEME_COLOR,
  FONT_FAMILY_REGULAR,
} from "../utilities/constant";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 5,
  },
  borderView: {
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
  },
  topContainer: {
    flexDirection: "row",
    marginVertical: normalizeSpacing(10),
    justifyContent: "space-between",
    marginHorizontal: normalizeSpacing(10),
    color:PRIMARY_THEME_COLOR
  },
  conteconfirm: {
    flexDirection: "column",
    
  },
  topTxt: {
    color: BLACK_COLOR,
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_EXTRABOLD,
  },
  bottomTxt: {
    color: BLACK_COLOR,
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    textAlign: "center",
  },
  MiddleContainer: {
    marginVertical: normalizeSpacing(25),
    marginHorizontal: normalizeSpacing(30),
   
  },
  closeIcon: {
    tintColor: "red",
    width: normalizeWidth(25),
    height: normalizeHeight(25),
  },
  btnview: {
    width: '50%',
    height: normalizeHeight(50),
  },
  dropdown: {
    margin: 5,
    height: 60,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: GRAY_LIGHT_COLOR
  },
  placeholderStyle: {
    fontSize: 16,
    color: GRAY_LIGHT_COLOR
  },
  selectedTextStyle: {
    fontSize: 16,
    color: GRAY_LIGHT_COLOR,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputWrap: {
    marginTop: normalizeSpacing(30),
  },cancelModalVw: {
    position: 'absolute',
    alignSelf: 'center',
    top: -30,
    backgroundColor: PRIMARY_THEME_COLOR,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(5)
  },
  pickerModal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  pickerModalCon: {
    backgroundColor: PRIMARY_THEME_COLOR,
    paddingHorizontal: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: normalize(20)
  },
  straightVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  componentsVw: {
    paddingVertical: normalize(5),
    borderWidth: 1,
    borderColor: WHITE_COLOR,
    alignItems: 'center',
    marginHorizontal: normalize(10),
    borderRadius: 10,
    width: normalizeWidth(70)
  },
  componentsImg: {
    width: normalizeWidth(24),
    height: normalizeHeight(24),
    tintColor: WHITE_COLOR,
  },
  componentsTxt: {
    fontSize: normalize(14),
    color: WHITE_COLOR,
    fontFamily: FONT_FAMILY_REGULAR
  },
  fullContainer: {
    marginLeft: 0,
    width: '100%',
    marginBottom: 0,
  },
});

export default styles;
