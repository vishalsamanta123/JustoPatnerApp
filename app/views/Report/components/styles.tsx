import { normalizeSpacing, normalize, normalizeHeight, normalizeWidth } from 'app/components/scaleFontSize';
import { FONT_FAMILY_SEMIBOLD, PRIMARY_THEME_COLOR, WHITE_COLOR } from 'app/components/utilities/constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerStyle: {
        backgroundColor: PRIMARY_THEME_COLOR,
    },
    RightFirstIconStyle: {
        tintColor: WHITE_COLOR,
    },
    mainView: {
        backgroundColor: WHITE_COLOR,
        marginVertical: normalizeSpacing(10),
        padding: normalizeSpacing(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: normalize(10)
    },
    reportTxt: {
        fontSize: normalize(18),
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    btnView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: PRIMARY_THEME_COLOR,
        borderTopLeftRadius: normalize(10),
        borderBottomRightRadius: normalize(10),
    },
    downloadImg: {
        width: normalizeWidth(40),
        height: normalizeHeight(40),
        tintColor: WHITE_COLOR
    }
})
export default styles