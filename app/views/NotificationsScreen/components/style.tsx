import { StyleSheet } from "react-native";
import {normalizeSpacing} from "../../../components/scaleFontSize";
import { PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../components/utilities/constant";

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
      },
      mainContainer: {
        flex: 1,
        backgroundColor: PRIMARY_THEME_COLOR,
      },
      dashboardWrap: {
        flex: 1,
        padding: normalizeSpacing(10),
      },
      secondPortion: {
        flex: 3,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: WHITE_COLOR,
        padding: 10,
      },
});

export default styles;