import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "app/components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "app/components/utilities/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: WHITE_COLOR,
    },
    headerStyle: {
        backgroundColor: PRIMARY_THEME_COLOR,
    },
    RightFirstIconStyle: {
        tintColor: WHITE_COLOR,
    },
    listView: {
        flex: 1,
    },
    IteamView: {
        flex: 1,
        backgroundColor: WHITE_COLOR,
        marginHorizontal: normalizeSpacing(10),
        borderRadius: 10,
        marginVertical: normalizeSpacing(10),
    },
    dataView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    Txtview: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: GRAY_COLOR,
        borderBottomWidth: 1,
        padding: normalizeSpacing(4),
        marginTop: normalizeSpacing(2),
        paddingVertical: normalizeSpacing(6)
    },
    projectContainer: {
        flex: 2.5,
        alignItems: "flex-end",
    },
    projectTxt: {
        fontSize: normalize(15),
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: GRAY_LIGHT_COLOR,
    },
    nameContainer: {
        flex: 3.5,
        alignItems: "flex-start",
    },
    nameTxt: {
        fontSize: normalize(15),
        fontFamily: FONT_FAMILY_EXTRABOLD,
        color: BLACK_COLOR,
        marginHorizontal: normalizeSpacing(10),
    },
    docImg: {
        width: normalizeWidth(45),
        height: normalizeHeight(45),
        borderRadius: normalize(10)
    },
    docModalVw: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    contentVw: {
        backgroundColor: WHITE_COLOR,
        marginHorizontal: normalizeSpacing(20),
        alignItems: 'center',
        paddingVertical: normalizeSpacing(5)
    },
    crossVw: {
        position: 'absolute',
        right: 0,
    },
    crossImg: {
        width: normalizeWidth(30),
        height: normalizeHeight(30),
    },
    contentImgs: {
        width: normalizeWidth(250),
        height: normalizeHeight(250),
    },
})

export default styles