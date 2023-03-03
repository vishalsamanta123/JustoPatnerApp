import { StyleSheet } from 'react-native';
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from 'app/components/scaleFontSize';
import {
  BG_MAIN_COLOUR,
  BLACK_COLOR,
  BLUE_COLOR,
  BORDER_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  PRIMARY_THEME_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  PURPLE_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_LIGHT,
  YELLOW_COLOR,
} from 'app/components/utilities/constant';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR_DARK,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  mainContainerWrap: {
    backgroundColor: WHITE_COLOR,
    flex: 1,
  },
  topImgVw: {
    alignItems: 'center',
    paddingVertical: normalize(14),
    marginTop: normalize(10),
  },
  topImgCont: {
    paddingHorizontal: normalizeSpacing(10)
  },
  topImgStyl: {
    width: normalizeWidth(360),
    height: normalizeHeight(170),
    borderRadius: normalize(12),
  },
  txtCont: {
    flex: 1,
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(8)
  },
  straightRowVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headTxt: {
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    color: BLACK_COLOR,
    textTransform: 'capitalize',
  },
  subHeadTxt: {
    fontSize: normalize(12),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: WHITE_COLOR,
  },
  boxesVw: {
    paddingVertical: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(16),
    marginVertical: normalize(10),
    backgroundColor: GRAY_COLOR
  },
  smallTxt: {
    fontSize: normalize(16),
    textAlign: 'center',
    fontFamily: FONT_FAMILY_REGULAR,
    color: WHITE_COLOR,
  },
});

export default styles;
