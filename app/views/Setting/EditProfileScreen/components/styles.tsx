import { StyleSheet } from "react-native";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import { BLACK_COLOR, GRAY_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerStyle: {
        backgroundColor: PRIMARY_THEME_COLOR,
    },
    headerTextStyle: {
        color: WHITE_COLOR,
      },
      leftImageIconStyle:{
        tintColor: WHITE_COLOR
      },
      wrap: {
        flex: 1,
        margin: normalizeSpacing(20),
        alignItems: 'center'
      },
      imageCircle: {
        backgroundColor: GRAY_COLOR,
        marginVertical: normalizeSpacing(10),
        borderRadius: normalizeSpacing(100),
        height: normalizeHeight(100),
        width: normalizeWidth(100),
        alignItems: 'center',
        justifyContent: 'center'
      },
      inputWrap: {
        marginTop: normalizeSpacing(30),
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
      radioTxt : {
        fontSize: normalize(18),
      },
});

export default styles;