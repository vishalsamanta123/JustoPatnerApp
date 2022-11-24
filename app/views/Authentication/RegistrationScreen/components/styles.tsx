import { StyleSheet } from 'react-native';
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';
import {
  BLACK_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
  RED_COLOR,
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
  wrap: {
    flexGrow: 1,
    marginHorizontal: normalizeSpacing(10),
    marginVertical: normalizeSpacing(5),
    alignItems: 'center'
  },
  headingText: {
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: PRIMARY_THEME_COLOR,
    textAlign: 'center',
  },
  underlineStyle: {
    width: normalizeWidth(60),
    height: normalizeHeight(1),
    backgroundColor: GRAY_COLOR,
    marginTop: normalizeSpacing(5),
  },
  imageCircle: {
    //backgroundColor: RED_COLOR,
    marginTop: normalizeSpacing(5),
    borderRadius: normalizeSpacing(100),
    height: normalizeHeight(100),
    width: normalizeWidth(100),
    alignItems: 'center',
    justifyContent: 'center',

  },
  inputWrap: {
    marginTop: normalizeSpacing(20),
  },
  genderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: normalizeSpacing(10),
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
    alignItems: 'center',
    marginVertical: normalizeSpacing(10)
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
  btnView: {
    marginVertical: normalizeSpacing(20),
  },
  loginBanner: {
    width: normalizeSpacing(100),
    height: normalizeSpacing(100),
    borderRadius: normalizeSpacing(50),
  },
  DummyloginBanner: {
    width: normalizeSpacing(80),
    height: normalizeSpacing(80),
    borderRadius: normalizeSpacing(50),
  },
  loginBannerView: {
    height: '100%',
    width: '100%',
    // borderBottomLeftRadius: width,
    // borderBottomRightRadius: width,
    // // borderRadius: width,
    // width: width * 2,
    // height: width * 2,
    // marginLeft: -(width / 2),
    // position: 'absolute',
    // bottom: 0,
    // overflow: 'hidden',
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
  }
});

export default styles;
