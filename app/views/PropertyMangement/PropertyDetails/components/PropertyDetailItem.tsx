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
  console.log('videoarray: ', videoarray);
  const documentarray = props.propertydocument?.filter((el: any) => {
    const count = el.document_type == "document" || el.document_type == "";
    return count;
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.status} </Text>
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
                props.items.approve_status === 1 ? strings.pending :
                  props.items.approve_status === 2 ? strings.subscribe :
                    props.items.approve_status === 3 && strings.unsubscribe
                : strings.inprocess

            }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.project + " " + strings.name} </Text>
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
          <Text style={styles.projectTxt}>{strings.totalVisitor} </Text>
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
          <Text style={styles.projectTxt}>{strings.todaySiteVisit} </Text>
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
          <Text style={styles.projectTxt}>{strings.closerVisit} </Text>
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
          <Text style={styles.projectTxt}>{strings.locality} </Text>
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
          <Text style={styles.projectTxt}>{strings.location} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.area ? props.items.area : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.propertyType} </Text>
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
          <Text style={styles.projectTxt}>{strings.startDate} </Text>
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
          <Text style={styles.projectTxt}>{strings.endDate} </Text>
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
          <Text style={styles.projectTxt}>{strings.configurations} </Text>
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
              {configuration.configuration_title}/ Min - {configuration.min_rate}
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
          <Text style={styles.projectTxt}>{strings.amenities} </Text>
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
              {amenity.title},
            </Text>
          ))}

          {/* <Text
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
          </Text> */}
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
          <Text style={styles.projectTxt}>{strings.contents} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>

          {imagearray.length > 0 ? (
            <>
              <Text style={styles.nameTxt}>{strings.imagecontentHeader}</Text>
              <View style={styles.ImageSliderContainer}>
                {imagearray.map((imagearray: any, index: any) =>
                  index <= 2 ? (
                    <Image
                      key={index}
                      source={{
                        uri: `${props.items.base_url}${imagearray.document}`,
                      }}
                      style={styles.imageSlider}
                    />
                  ) : null
                )}
                <TouchableOpacity
                  style={styles.shadowView}
                  onPress={() =>
                    props.onpresContent("ImageContent", { array: imagearray, base_url: props.items.base_url })
                  }
                >
                  <Image source={images.forwardArrow} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </>
          ) : null}

          {videoarray.length > 0 ? (
            <>
              <Text style={styles.nameTxt}>{strings.videocontentHeader}</Text>
              <View style={styles.ImageSliderContainer}>
                {videoarray.map((videos: any, index: any) =>
                  index <= 2 ? (
                    <Image
                      key={index}
                      source={{
                        uri: `${props.items.base_url}${videos.video_thumbnail}`,
                      }}
                      style={styles.imageSlider}
                    />
                  ) : null
                )}
                <TouchableOpacity
                  style={styles.shadowView}
                  onPress={() =>
                    props.onpresContent("VideoContent", { array: videoarray, base_url: props.items.base_url })
                  }
                >
                  <Image source={images.forwardArrow} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </>
          ) : null}

          {documentarray.length > 0 ? (
            <>
              <Text style={styles.nameTxt}>{strings.cataloguecontentHeader}</Text>
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
                    props.onpresContent("CatalogueContent", { array: documentarray, base_url: props.items.base_url })
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
          <Text style={styles.projectTxt}>{strings.pickupFacility} </Text>
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
