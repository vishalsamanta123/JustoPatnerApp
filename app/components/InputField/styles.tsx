import { StyleSheet } from 'react-native';
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from '../scaleFontSize';
import {
  BLACK_COLOR,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from '../utilities/constant';

const styles = StyleSheet.create({
  mainContainer: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
    backgroundColor: WHITE_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: normalizeSpacing(Isios ? 15 : 5),
    borderColor: GRAY_COLOR,
  },
  input: {
    fontSize: normalize(16),
    paddingRight: normalizeSpacing(30),
    paddingLeft: normalizeSpacing(Isios ? 5 : 15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    opacity: 0.6,
    color: BLACK_COLOR
  },
  rightImage: {
    height: normalizeHeight(20),
    width: normalizeWidth(20),
    opacity: 1,
    marginRight: 20,
  },
  inputHeadinView: {
    position: 'absolute',
    top: normalizeSpacing(-10),
    left: normalizeSpacing(20),
    zIndex: 1,
    // backgroundColor: 'transparent',
  },
  inputHeadingText: {
    fontSize: normalize(Isios ? 14 : 16),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: PRIMARY_THEME_COLOR,
  },
});

export default styles;
