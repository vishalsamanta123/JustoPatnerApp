import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { BLACK_COLOR, GRAY_COLOR, RED_COLOR, YELLOW_COLOR } from "../../../../components/utilities/constant";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import images from "../../../../assets/images";
import strings from "app/components/utilities/Localization";

const PropertyDetailItem = (props: any) => {
  const imagearray = props.propertydocument?.filter((el: any) => {
    const images = el.document_type == "image";
    return images;
  });
  const videoarray = props.propertydocument?.filter((el: any) => {
    const videos = el.document_type == "video";
    return videos;
  });
  const documentarray = props.propertydocument?.filter((el: any) => {
    const count = el.document_type == "document";
    return count;
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt, {
            color: typeof props.items.property_active_status === 'undefined' || props.items.property_active_status ?
              props.items.approve_status === 1 ? BLACK_COLOR :
                props.items.approve_status === 2 ? YELLOW_COLOR :
                  RED_COLOR : RED_COLOR
          }]}>{
              typeof props.items.property_active_status === 'undefined' || props.items.property_active_status ?
                props.items.approve_status === 1 ? strings.pendingconfirm :
                  props.items.approve_status === 2 ? strings.subscribe :
                    props.items.approve_status === 3 && strings.unsubscribe
                : 'Pending Allocation'

            }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Project Name </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.property_title}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of visitor </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.total_visitor}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of site visit </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.site_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Close visit </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.close_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Location </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.location}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property Type </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.property_type_title}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Start Date </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.start_date}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>End Date </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.end_date}</Text>
        </View>
      </View>
      {/*  <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead Assign to </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lead}</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Configuration </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          {props.configurations.map((configuration: any) => (
            <Text
              key={configuration._id}
              style={[
                styles.nameTxt,
                {
                  borderBottomColor: GRAY_COLOR,
                  borderBottomWidth: 1,
                  width: "100%",
                },
              ]}
            >
              {configuration.configuration_type}/ Min - {configuration.min_rate}
              {configuration.min_rate_type}/ Max - {configuration.max_rate}
              {configuration.max_rate_type}
            </Text>
          ))}
          {/*   <Text
            style={[
              styles.nameTxt,
              {
                borderBottomColor: GRAY_COLOR,
                borderBottomWidth: 1,
                width: '100%',
              },
            ]}
          >
            {props.items.configuration}
          </Text>
          <Text
            style={[
              styles.nameTxt,
              {
                borderBottomColor: GRAY_COLOR,
                borderBottomWidth: 1,
                width: '100%',
                marginVertical: normalizeSpacing(5)
              },
            ]}
          >{props.items.configuration}</Text>
          <Text style={styles.nameTxt}>
            {props.items.configuration}</Text> */}
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Amenity </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          {props.amenity.map((amenity: any) => (
            <Text
              key={amenity._id}
              style={[
                styles.nameTxt,
                {
                  borderBottomColor: GRAY_COLOR,
                  borderBottomWidth: 1,
                  width: "100%",
                },
              ]}
            >
              {amenity.title}
            </Text>
          ))}

          <Text
            key={imagearray._id}
            style={[
              styles.nameTxt,
              {
                borderBottomColor: GRAY_COLOR,
                borderBottomWidth: 1,
                width: "100%",
              },
            ]}
          >
            {props.items.amenity}
          </Text>
          {/* <Text
            style={[
              styles.nameTxt,
              {
                borderBottomColor: GRAY_COLOR,
                borderBottomWidth: 1,
                width: '100%',
                marginVertical: normalizeSpacing(5)
              },
            ]}
          >{props.items.amenity}</Text>
          <Text style={styles.nameTxt}>{props.items.amenity}</Text> */}
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Content </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          {/* <Text style={styles.nameTxt}>Images</Text>
          <View style={styles.ImageSliderContainer}>

            { imagearray.map((imagearray: any) => (
               <Image
                  source={{uri:imagearray.base_url+imagearray.document}}
                  style={styles.imageSlider}
                
                /> 
              ))
              
              }
            <TouchableOpacity style={styles.shadowView} onPress={() => props.onpresContent('ImageContent',imagearray)}>
              <Image
                source={images.forwardArrow}
                style={styles.arrow}
              />
            </TouchableOpacity>
          </View> */}

          {imagearray.length > 0 ? (
            <>
              <Text style={styles.nameTxt}>Images</Text>
              <View style={styles.ImageSliderContainer}>
                {imagearray.map((imagearray: any, index: any) =>
                  index <= 2 ? (
                    <Image
                      key={index}
                      source={{
                        uri: imagearray.base_url + imagearray.document,
                      }}
                      style={styles.imageSlider}
                    />
                  ) : null
                )}
                <TouchableOpacity
                  style={styles.shadowView}
                  onPress={() =>
                    props.onpresContent("ImageContent", imagearray)
                  }
                >
                  <Image source={images.forwardArrow} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </>
          ) : null}

          {videoarray.length > 0 ? (
            <>
              <Text style={styles.nameTxt}>Videos</Text>
              <View style={styles.ImageSliderContainer}>
                {videoarray.map((videos: any, index: any) =>
                  index <= 2 ? (
                    <Image
                      key={index}
                      source={images.buildings}
                      style={styles.imageSlider}
                    />
                  ) : null
                )}
                <TouchableOpacity
                  style={styles.shadowView}
                  onPress={() =>
                    props.onpresContent("VideoContent", videoarray)
                  }
                >
                  <Image source={images.forwardArrow} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </>
          ) : null}

          {documentarray.length > 0 ? (
            <>
              <Text style={styles.nameTxt}>Catalogue</Text>
              <View style={styles.ImageSliderContainer}>
                {documentarray.map((documents: any, index: any) =>
                  index <= 2 ? (
                    <Image
                      key={index}
                      source={images.pdfIcone}
                      style={styles.imageSlider}
                    />
                  ) : null
                )}

                <TouchableOpacity
                  style={styles.shadowView}
                  onPress={() =>
                    props.onpresContent("CatalogueContent", documentarray)
                  }
                >
                  <Image source={images.forwardArrow} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </View>
      </View>
      <View style={[styles.Txtview, { borderBottomWidth: 0 }]}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup Allowed </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.pickup}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PropertyDetailItem;
