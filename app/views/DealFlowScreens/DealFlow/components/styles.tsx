import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from 'app/components/scaleFontSize';
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, PRIMARY_THEME_COLOR, WHITE_COLOR } from 'app/components/utilities/constant';
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
    straightVw: {
        // flexDirection: 'row',
        // alignItems: 'center',
        flex: 1,
    },
    mainCont: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: normalizeSpacing(5),
        elevation: 2,
        backgroundColor: WHITE_COLOR,
        borderRadius: 10,
    },
    projectImgVw: {
        width: normalizeWidth(85),
        height: normalizeHeight(85),
        borderRadius: normalize(8),
    },
    smallTxt: {
        fontSize: normalize(10),
        textAlign: 'center',
        fontFamily: FONT_FAMILY_REGULAR,
        color: BLACK_COLOR,
    },
    textArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: normalize(5)
    },
    textVws: {
        paddingVertical: normalizeSpacing(2.5)
    },
    commonTxt: {
        fontSize: normalize(18),
        fontFamily: FONT_FAMILY_EXTRABOLD,
        color: BLACK_COLOR,
        textTransform: 'capitalize',
    },
    subHeadTxt: {
        fontSize: normalize(12),
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: BLACK_COLOR,
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
        width: normalizeWidth(24),
        height: normalizeHeight(24)
    },
})
export default styles