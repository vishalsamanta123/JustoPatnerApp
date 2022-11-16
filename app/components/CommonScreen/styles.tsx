import {StyleSheet} from 'react-native';
import {normalize, normalizeHeight, normalizeSpacing, normalizeWidth} from '../scaleFontSize';
import {
  BLACK_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  GRAY_LIGHT_COLOR,
} from '../utilities/constant';

const styles = StyleSheet.create({
 
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:'70%'
  },
  title: {
    fontSize: 20,
    marginVertical: 2,
    fontFamily:FONT_FAMILY_SEMIBOLD,
    color:PRIMARY_THEME_COLOR
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
  },
 
});

export default styles;