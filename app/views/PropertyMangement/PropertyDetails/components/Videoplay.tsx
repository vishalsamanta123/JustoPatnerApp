import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Video from "react-native-video";

const Videoplay = (props: any) => {
    console.log('props.itemDetail: ', props.itemDetail);

    return (
        <View>
            <Modal isVisible={props.Visible}>
                <View style={styles.mainContainer}>
                    <View style={styles.topContainer}>
                        <Text style={styles.topTxt}>{strings.playVideo}</Text>
                        <View>
                            <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                                <Image source={images.close} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.borderView} />
                    <View style={{ marginHorizontal: 5 }}>

                      { 
                       props.itemDetail?.document_type ==='video' ? 

                        <Video
                            ref={ref => {
                                this.video = ref;
                            }}
                            source={{uri:props?.base_url+props.itemDetail?.document}}
                            //poster={item.videos[0].thumbnail}
                            // shouldPlay={false}
                            repeat
                            // onReadyForDisplay={this.loading}
                            //paused={this.state.stop ? true : this.state.paused}
                            //isLooping
                            resizeMode="contain"
                            // posterResizeMode={"contain"}
                            style={{
                                height: 500,
                                width: '100%',
                            }}
                            selectedVideoTrack={{
                                type: "resolution",
                                value: 480
                            }}
                        />
                        : 
                        <Image 
                        source={{uri:props?.base_url+props.itemDetail?.document}}
                        />
                        
                        }



                    </View>
                 
                </View>
            </Modal>



        </View>
    );
};

export default Videoplay;
