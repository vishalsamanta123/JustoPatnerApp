import {StyleSheet} from 'react-native';
import {normalize, normalizeHeight, normalizeSpacing, normalizeWidth} from '../../../../components/scaleFontSize';
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
  leftImageIconStyle: {
    tintColor: WHITE_COLOR,
  },
  mainContainer: {
    flex: 1,
  },
  propertyListView: {
    flex: 1,
    marginTop: normalizeSpacing(0),
    backgroundColor:WHITE_COLOR
  },
  IteamView: {
    backgroundColor: WHITE_COLOR,
    padding: normalizeSpacing(10),
    borderRadius: 10,
    marginVertical: normalizeSpacing(10),
  },
  Txtview : {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
    paddingVertical: normalizeSpacing(10),
  },
  projectContainer : {
    flex: 2,
    alignItems: 'flex-start',
    height: '100%',
    marginLeft:normalizeSpacing(15)
  },
  projectTxt : {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: GRAY_LIGHT_COLOR
  },
  nameContainer : {
    flex: 4,
    alignItems: 'flex-start',
  },
  nameTxt : {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    color: BLACK_COLOR,
    marginHorizontal: normalizeSpacing(10)
  },
  buttonContainer : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: normalizeSpacing(10),
    marginHorizontal: normalizeSpacing(10),
  },
  button : {
    backgroundColor: WHITE_COLOR,
    width: normalizeWidth(90),
    height: normalizeHeight(25),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5
  },
  buttonTxt : {
    textAlign: 'center'
  },
  ImageSliderContainer: {
    flexDirection: 'row',
    marginVertical: normalizeSpacing(5),
  },
  imageSlider: {
    width: normalizeWidth(60),
    height: normalizeHeight(60),
    borderRadius: 10,
    marginRight: 10
  },
  shadowView: {
    width: normalizeWidth(40),
    height: normalizeHeight(60),
    position: 'absolute',
    right: normalizeSpacing(-15),
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'flex-end',
    shadowColor: WHITE_COLOR,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 15,
  },
  arrow : {
    width: normalizeWidth(30),
    height: normalizeHeight(30),
  },
  btnContainer: {
    flexDirection: 'row',
    marginHorizontal: normalizeSpacing(10),
    marginVertical: normalizeSpacing(5)
  },
  playbtntch: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    
  },
  playpuceimg: {
    width: 30,
    height: 32,
  },
});

export default styles;
