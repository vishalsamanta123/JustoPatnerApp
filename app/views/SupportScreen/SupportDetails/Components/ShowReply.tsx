import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { GREEN_COLOR, PRIMARY_THEME_COLOR, RED_COLOR } from 'app/components/utilities/constant'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen'

const ShowReply = () => {
  const navigation: any = useNavigation()
  const [replyData, setReplyData] = useState<any>([])
  const { response = {}, detail = false } = useSelector((state: any) => state.SupportData) || []

  useFocusEffect(
    React.useCallback(() => {
      setReplyData(response.data)
      return () => { };
    }, [navigation])
  )


  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.ticketReply}
        handleOnLeftIconPress={() => handleBackPress()}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        leftImageIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={'light-content'}
      />
      <ScrollView>
        <View style={styles.topDetailsView}>
          <View style={styles.topTxtView}>
            <Text style={styles.topTxt}>{strings.ticket + " " + strings.shortNum} </Text>
            <Text style={styles.topTxt}>{replyData?.ticket_number ? replyData?.ticket_number : strings.notfount}</Text>
          </View>
        </View>
        <View>
          <FlatList
            data={Array.isArray(replyData?.reply_support_ticket) ? replyData?.reply_support_ticket : []}
            renderItem={({ item }: any) => {
              return (
                <View style={styles.replyView}>
                  <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                      <Text style={styles.projectTxt}>{strings.updatedBy} </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt}>{item.update_by_name ? item.update_by_name : strings.notfount}</Text>
                    </View>
                  </View>
                  <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                      <Text style={styles.projectTxt}>{strings.status} </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                      <Text style={[styles.nameTxt, {
                        color: item.status === 1 ? GREEN_COLOR : RED_COLOR
                      }]}>
                        {
                          item.status === 1 ? strings.open :
                            item.status === 2 && strings.close
                        }
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.Txtview, { borderBottomWidth: 0 }]}>
                    <View style={styles.projectContainer}>
                      <Text style={styles.projectTxt}>{strings.description} </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt}>{item.remark ? item.remark : strings.notfount}</Text>
                    </View>
                  </View>
                </View>
              )
            }}
            ListEmptyComponent={() => (
              <EmptyListScreen message={strings.ticketReply} />
            )}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default ShowReply