import {StyleSheet} from 'react-native';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../../../components/scaleFontSize';

const styles = StyleSheet.create({
  imageStyle: {
    height: normalizeHeight(80),
    width: normalizeWidth(80),
  },
});

export default styles;
