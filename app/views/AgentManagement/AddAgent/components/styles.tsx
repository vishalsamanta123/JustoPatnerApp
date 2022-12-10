import { StyleSheet } from 'react-native';
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';
import {
  BLACK_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from '../../../../components/utilities/constant';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  headerTextStyle: {
    color: WHITE_COLOR,
  },
  mainContainer: {
    flex: 1,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  wrap: {
    flex: 1,
    margin: normalizeSpacing(20),
  },
  DummyloginBanner: {
    width: normalizeSpacing(80),
    height: normalizeSpacing(80),
    borderRadius: normalizeSpacing(50),
  },
  editView: {
    position: 'absolute',
    top: 5,
    bottom: 0,
    right: 0
  },
  editImage: {
    width: normalizeWidth(20),
    height: normalizeHeight(20),
    backgroundColor: GRAY_COLOR,
    borderRadius: 100
  },
  wraptop: {
    flex: 5.2,
    margin: normalizeSpacing(20),
    alignItems: 'center'
  },

  wrapbottum: {
    flex: 0.8,
    margin: normalizeSpacing(20),
    alignItems: 'center'
  },

  headingText: {
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: PRIMARY_THEME_COLOR,
    textAlign: 'center'
  },
  underlineStyle: {
    width: normalizeWidth(60),
    height: normalizeHeight(1),
    backgroundColor: GRAY_COLOR,
    marginTop: normalizeSpacing(5),
  },
  imageCircle: {
    backgroundColor: GRAY_COLOR,
    marginVertical: normalizeSpacing(10),
    borderRadius: normalizeSpacing(100),
    height: normalizeHeight(100),
    width: normalizeWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  imageVw: {
    width: normalizeWidth(100),
    height: normalizeHeight(100),
    borderRadius: 50
  },
  inputWrap: {
    marginTop: normalizeSpacing(30),
    // alignItems: 'center'
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
  workingView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalizeSpacing(10),
    alignItems: 'center'
  },
  browseVw: {
    width: "25%",
    backgroundColor: WHITE_COLOR,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 10,
    paddingVertical: normalize(12)
  },
  addBtn: {
    backgroundColor: PRIMARY_THEME_COLOR,
    width: normalizeWidth(140),
    height: normalizeHeight(25),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addTxt: {
    color: WHITE_COLOR,
    textTransform: 'uppercase',
    fontSize: normalize(13),
    fontFamily: FONT_FAMILY_EXTRABOLD
  },
  workTxt: {
    color: BLACK_COLOR,
    textTransform: 'uppercase',
    fontSize: normalize(13),
    fontFamily: FONT_FAMILY_EXTRABOLD
  },
  inputBoxVw: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    padding: normalizeSpacing(5),
    borderColor: GRAY_COLOR,
    width: '100%',
    marginTop: normalize(6)
  },
  inputBoxItmVw: {
    paddingVertical: normalize(5),
    borderBottomWidth: 0.6,
    borderColor: BLACK_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputBoxItmTxt: {
    fontSize: normalize(16),
    paddingRight: normalizeSpacing(30),
    // paddingLeft: normalizeSpacing(Isios ? 5 : 15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    opacity: 0.6,
    color: BLACK_COLOR,
    width: '90%'
  },
  crossVw: {
    width: normalizeWidth(18),
    height: normalizeHeight(18),
    marginHorizontal: 5,
    tintColor: BLACK_COLOR
  },
  btnView: {
    marginBottom: normalizeSpacing(20),
  }
});

export default styles;
