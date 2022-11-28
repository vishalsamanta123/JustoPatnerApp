import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import { BLACK_COLOR, MAP_KEY, PRIMARY_THEME_COLOR_DARK } from '../utilities/constant';
import images from '../../assets/images';
import { normalize, normalizeHeight, normalizeSpacing } from '../scaleFontSize';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import strings from '../utilities/Localization';

const LocationInput = (props: any) => {
    const {
        inputWidth = '90%',
        editable = true,
        multiline = false,
        inputheight = 50,
        keyboardtype = 'default',
        topping = 2
    } = props
    return (
        <View>
            <View style={styles.inputHeadinView}>
                <Text style={[styles.inputHeadingText, {
                    width: props.headingTextWidth
                }]}>{props.headingText}</Text>
            </View>
            <View style={styles.mainContainer}>
                <GooglePlacesAutocomplete
                    fetchDetails={true}
                    placeholder={strings.location}
                    textInputProps={{
                        placeholderTextColor: PRIMARY_THEME_COLOR_DARK,
                    }}
                    styles={{
                        textInputContainer: {
                            borderWidth: 1.5,
                            borderColor: PRIMARY_THEME_COLOR_DARK,
                            borderRadius: normalize(8),
                            paddingVertical: normalizeSpacing(5),
                        },
                        textInput: {
                            height: normalizeHeight(30),
                            color: PRIMARY_THEME_COLOR_DARK,
                            fontSize: normalize(14),
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb',
                        },
                    }}
                    onPress={(data, details = null) => {
                        // onPressSelect(data, details)
                    }}
                    query={{
                        key: MAP_KEY,
                        language: 'en',
                    }}
                />
                <TouchableOpacity
                    onPress={props.handleInputBtnPress}
                    disabled={!props.handleInputBtnPress}>
                    <Image style={styles.rightImage} source={props.rightImgSrc} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LocationInput;
