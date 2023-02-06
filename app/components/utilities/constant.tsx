import { Platform } from "react-native";

export const FONT_FAMILY_LIGHT = 'Nunito-Light';
export const FONT_FAMILY_REGULAR = 'Nunito-Regular';
export const FONT_FAMILY_MEDIUM = 'Nunito-Medium';
export const FONT_FAMILY_SEMIBOLD = 'Nunito-SemiBold';
export const FONT_FAMILY_EXTRABOLD = 'Nunito-ExtraBold';

export const PRIMARY_THEME_COLOR = '#162b70';
export const PRIMARY_THEME_COLOR_DARK = '#102054';

export const BLACK_COLOR = '#000000';
export const WHITE_COLOR = '#ffffff';
export const WHITE_COLOR_LIGHT = '#f5f5e9';
export const YELLOW_COLOR = '#d68904';
export const BLUE_COLOR = '#0493d6';
export const PURPLE_COLOR = '#b93cff';
export const GRAY_COLOR = '#bdbbbb';
export const TABBAR_COLOR = '#F5CB44';
export const GRAY_LIGHT_COLOR = '#757070';
export const BG_MAIN_COLOUR = '#eeeef1';
export const GOLDEN_COLOR = '#E4D00A';
export const GREEN_COLOR = '#008000';
export const RED_COLOR = '#FF0000';
export const CALL_COLOR = '#52a4ff';
export const BORDER_COLOR = '#d9effa';


export const validateEmail =
  /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const checkSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const Isios = Platform.OS === 'ios'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'LT'
export const DATE_TIME_FORMAT = 'YYYY-MM-DD, h:mm a'
export const AMOUNT_TYPE = [{ value: "Cr" }, { value: "L" }, { value: "K" }]
export const ONE_MONTH_DATES = new Date(new Date().setDate(new Date().getDate() + 31));

export const GLOBAL_URL = 'http://192.168.1.27:3000'
// export const GLOBAL_URL = 'https://api.justoverse.com:3000'
// export const GLOBAL_URL = 'https://itinformatix.org:3044'
// export const  MAP_KEY = 'AIzaSyDdLk5tb75SiJvRk9F2B4almu-sBAi1-EM'
export const MAP_KEY = 'AIzaSyCbDx7Lk4eTMzptrQKXZvOPYgEMggrq8o4'

export const Regexs = {
  AadharRegex: new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/),
  panRegex: new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
  emailRegex: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  phoneNumRegex: new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/),
  emailOrPhone: new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/)
}