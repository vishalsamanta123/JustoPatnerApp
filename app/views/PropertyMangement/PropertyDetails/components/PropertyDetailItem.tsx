import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { GRAY_COLOR } from "../../../../components/utilities/constant";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import images from "../../../../assets/images";

const PropertyDetailItem = (props: any) => {

  const imagearray = props.propertydocument?.filter((el: any)  => {
    const count = el.document_type == 'image'
    return count
    })
  const videoarray = props.propertydocument?.filter((el : any) => {
    const count = el.document_type == 'video'
    return count
    })
  /* console.log("PropertyDetailItem -> props.propertydocument", props.propertydocument)
  console.log("PropertyDetailItem -> final", final) */

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.status}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Project Name </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.Projectname}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of visitor </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.visitor}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of site visit </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.siteVisit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Close visit </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.closeVisit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Location </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.Location}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property Type </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.propertyType}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Start Date </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.startDate}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>End Date </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.EndDate}</Text>
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
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          {//console.log("PropertyDetailItem -> props.items.configuration", props.configurations)
          }
          {/* "1BHK / Min-25 L / Max-75 L" */}
          {props.configurations.map((configuration: any) => (
            <Text
              style={[
                styles.nameTxt,
                {
                  borderBottomColor: GRAY_COLOR,
                  borderBottomWidth: 1,
                  width: '100%',
                },
              ]}
            >

              {configuration.configuration_type}/ Min - {configuration.min_rate}{configuration.min_rate_type}/ Max - {configuration.max_rate}{configuration.max_rate_type}
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
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>

          {props.amenity.map((amenity: any) => (
            <Text
              style={[
                styles.nameTxt,
                {
                  borderBottomColor: GRAY_COLOR,
                  borderBottomWidth: 1,
                  width: '100%',
                },
              ]}
            >

              {amenity.title}
            </Text>
          ))}

          <Text
            style={[
              styles.nameTxt,
              {
                borderBottomColor: GRAY_COLOR,
                borderBottomWidth: 1,
                width: '100%',
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
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>Images</Text>
          <View style={styles.ImageSliderContainer}>

            {
              
              imagearray.map((imagearray: any) => (


               /*  console.log("PropertyDetailItem -> imagearray.base_url+imagearray.document", imagearray.base_url+imagearray.document) */
                
               <Image
                  source={{uri:imagearray.base_url+imagearray.document}}
                  style={styles.imageSlider}
                
                /> 
              ))
              
              }
    
            

           
           {/*  <Image
              source={images.buildings}
              style={styles.imageSlider}
            />
            <Image
              source={images.buildings}
              style={styles.imageSlider}
            /> */}
            <TouchableOpacity style={styles.shadowView} onPress={() => props.onpresContent('ImageContent',imagearray)}>
              <Image
                source={images.forwardArrow}
                style={styles.arrow}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameTxt}>Videos</Text>
          <View style={styles.ImageSliderContainer}>
            <Image
              source={images.buildings}
              style={styles.imageSlider}
            />
            <Image
              source={images.buildings}
              style={styles.imageSlider}
            />
            <Image
              source={images.buildings}
              style={styles.imageSlider}
            />
            <TouchableOpacity style={styles.shadowView} onPress={() => props.onpresContent('VideoContent')}>
              <Image
                source={images.forwardArrow}
                style={styles.arrow}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameTxt}>Catalogue</Text>
          <View style={styles.ImageSliderContainer}>
            <Image
              source={images.buildings}
              style={styles.imageSlider}
            />
            <Image
              source={images.buildings}
              style={styles.imageSlider}
            />
            <Image
              source={images.buildings}
              style={styles.imageSlider}
            />
            <TouchableOpacity style={styles.shadowView} onPress={() => props.onpresContent('CatalogueContent')}>
              <Image
                source={images.forwardArrow}
                style={styles.arrow}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.Txtview, { borderBottomWidth: 0 }]}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup Allowed </Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.pickup}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PropertyDetailItem;
