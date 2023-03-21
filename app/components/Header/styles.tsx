import {StyleSheet} from 'react-native';
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from '../scaleFontSize';
import {FONT_FAMILY_SEMIBOLD, WHITE_COLOR} from '../utilities/constant';

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: normalizeSpacing(10),
  },
  leftView : {
    flex:1,
  },
  imageStyle: {
    height: normalizeHeight(30),
    width: normalizeWidth(30),
  },
  headerTextView: {
    //justifyContent: 'center',
    //textAlign:'center',
    flex:4,
    alignItems:'center'

  },
  headerText: {
    fontSize: normalize(20),
    color: WHITE_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  rightIconsWrap: {
    flexDirection: 'row',
    flex:1,
  },
  badget: {
    borderWidth: 0,
    alignItems: 'center',
  }
});

export default styles;
