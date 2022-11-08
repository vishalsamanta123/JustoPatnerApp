import { Dimensions, StyleSheet } from "react-native";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
      },
      logoView: {
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'red'
      },
      loginBanner: {
        width: width,
        //height: 220,
      },
      logoImage: {
        height: normalizeHeight(100),
        width: normalizeWidth(150),
      },
      inputView: {
        flex: 1,
      },
      DescbottomView:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginHorizontal: normalizeSpacing(30),
        marginTop: normalizeSpacing(30),
        
      },
      bottomView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 30
      },
      bottomWrap: {
        flexDirection: 'row'
      },
      bottomText: {
        textAlign: 'center',
        fontSize: normalize(16),
        lineHeight: normalizeHeight(25),
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: GRAY_LIGHT_COLOR
      },
      spanTouch: {
        // backgroundColor: 'red',
        flexDirection: 'row'
      },
      spanText: {
        textAlign: 'center',
        fontSize: normalize(16),
        lineHeight: normalizeHeight(25),
        color: PRIMARY_THEME_COLOR,
        fontFamily: FONT_FAMILY_SEMIBOLD,
      },
      headingText: {
        fontSize: normalize(20),
        lineHeight: normalizeHeight(25),
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: PRIMARY_THEME_COLOR,
        marginVertical: 10
      },
      otpView: {
        flex: 0.5,
        marginHorizontal: '15%',
        marginVertical: '5%'
        // backgroundColor: 'red',
      },
      borderStyleBase: {
        width: 30,
        height: 45
      },
      borderStyleHighLighted: {
        borderColor: PRIMARY_THEME_COLOR,
        // borderWidth: 1
      },
      underlineStyleBase: {
        width: normalizeWidth(50),
        height: normalizeHeight(60),
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: WHITE_COLOR,
        //shadowColor: BLACK_COLOR,
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 1,
        color: PRIMARY_THEME_COLOR,
        fontSize: normalize(20),
      },
      underlineStyleHighLighted: {
        borderColor: PRIMARY_THEME_COLOR,
      },
      btnView:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    btntouch: {
        height: normalizeHeight(50),
        width: 250,
        backgroundColor: PRIMARY_THEME_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    btnText:{
        color: WHITE_COLOR,
        fontSize: normalize(16),
        fontFamily: FONT_FAMILY_SEMIBOLD,
    }
});

export default styles;