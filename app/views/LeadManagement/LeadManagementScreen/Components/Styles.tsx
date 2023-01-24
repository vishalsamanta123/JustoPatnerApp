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
  PURPLE_COLOR,
} from '../../../../components/utilities/constant';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  mainContainer: {
    flex: 1,
  },
  propertyListView: {
    flex: 1,
    margin: normalizeSpacing(5),
  },
  TopBtnView: {
    flexDirection: 'row',
    marginVertical: normalizeSpacing(10),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },
  IteamView: {
    backgroundColor: WHITE_COLOR,
    marginHorizontal: normalizeSpacing(10),
    borderRadius: 10,
    marginVertical: normalizeSpacing(10),
  },
  Txtview: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
    padding: normalizeSpacing(4),
    marginTop: normalizeSpacing(2),
  },
  projectContainer: {
    flex: 2.5,
    alignItems: 'flex-end',
  },
  projectTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: GRAY_LIGHT_COLOR
  },
  nameContainer: {
    flex: 3.5,
    alignItems: 'flex-start',
  },
  nameTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    color: BLACK_COLOR,
    marginHorizontal: normalizeSpacing(10)
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: normalizeSpacing(10),
  },
  button: {
    top: 10,
    backgroundColor: WHITE_COLOR,
    width: normalizeWidth(100),
    height: normalizeHeight(30),
    marginLeft: normalizeSpacing(10),
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10
  },
  buttonedit: {
    top: 10,
    backgroundColor: WHITE_COLOR,
    width: normalizeWidth(100),
    height: normalizeHeight(25),
    marginLeft: normalizeSpacing(10),
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: PURPLE_COLOR,
  },
  Viewbutton: {
    top: 10,
    backgroundColor: PRIMARY_THEME_COLOR,
    borderBottomEndRadius: 10,
    borderTopLeftRadius: 10,
    padding: normalizeSpacing(5)
  },
  arrow: {
    tintColor: WHITE_COLOR,
    width: normalizeWidth(30),
    height: normalizeHeight(30)
  },
  buttonTxt: {

    textAlign: 'center'
  },
  BulkMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadView: {
    backgroundColor: GRAY_COLOR,
    width: '90%',
    height: normalizeHeight(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadTxt: {
    color: BLACK_COLOR,
    fontSize: normalize(18),
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  browseView:{
    alignItems: 'center',
    justifyContent: "center",
    margin: normalizeSpacing(20),
    flex: 2,
  },
  uploadImage:{
    flex: 2
  },
  uploadButton:{
    flex: 2,
    justifyContent: 'flex-end',
    marginBottom: normalizeSpacing(10)
  }
});

export default styles;
