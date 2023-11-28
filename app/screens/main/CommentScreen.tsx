/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  Image,
  Platform,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { Header, Screen, Text } from "../../components"
import { colors, typography } from "../../theme"
import { AppStackScreenProps } from "../../navigators"
import { useStores } from "../../models"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native-gesture-handler"
import ProcessingView from "../../components/ProcessingView"
import { dateFormat, getFormatDate } from "../../utils/date-util"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { isEmpty } from "lodash"
import { useKeyboardOffsetChanged } from "../../utils/hooks/useKeyboardOffset"

interface CommentScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Comment">> {}

export const CommentScreen: FC<CommentScreenProps> = observer(function CommentScreen({ route }) {
  const { id, post } = route.params as any

  const firstComment = {
    ...post,
    userName: post.name,
  }

  const {
    loadingStore: { loading },
    postStore: { sendComment, listComment },
    authenticationStore: { isMe },
  } = useStores()

  const { navigate } = useNavigation()
  const offset = useKeyboardOffsetChanged()

  const [text, setText] = useState("")
  const [enableSend, setEnableSend] = useState(false)
  const [comments, setComments] = useState([])

  const listCommentRef = useRef<FlatList>()

  const loadComments = () => {
    listComment({ ref_id: id })
      .then((res) => {
        setComments([firstComment, ...res.data])
      })
      .catch((err) => {
        console.log("LOGGGG", err)
      })
  }

  useEffect(() => {
    loadComments()
  }, [])

  const onChangeText = (value) => {
    setText(value)
    setEnableSend(!isEmpty(value))
  }

  const onSendComment = () => {
    sendComment({
      ref_id: id,
      text,
    }).then(() => {
      setText("")
      loadComments()
      setTimeout(() => {
        listCommentRef.current && listCommentRef.current.scrollToEnd()
      }, 500)
    })
  }

  const onRefresh = () => {
    loadComments()
  }

  const renderCommentItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: isMe(item.owner_id) ? "row-reverse" : "row",
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            borderRadius: 99,
            marginHorizontal: 8,
            borderColor: colors.border,
          }}
        >
          <Image
            source={{ uri: item.avatar }}
            style={{ width: 28, aspectRatio: 1, borderRadius: 24 }}
          />
        </View>
        <View style={{ flex: 1, alignItems: isMe(item.owner_id) ? "flex-end" : "flex-start" }}>
          <Text
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: isMe(item.owner_id) ? colors.primary : colors.white,
              borderRadius: 8,
              overflow: "hidden",
              maxWidth: "80%",
              color: isMe(item.owner_id) ? colors.white : colors.title,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            {item.text}
          </Text>
          <Text
            weight="light"
            style={{
              color: colors.subtitle,
              fontSize: 10,
              lineHeight: 12,
              textAlign: "right",
              margin: 2,
            }}
          >
            {getFormatDate(item.createdAt, dateFormat.ShortDateTime)}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <Screen
      safeAreaEdges={["bottom"]}
      style={{
        backgroundColor: colors.background,
        paddingBottom: Platform.OS === "android" ? offset : 0,
      }}
      statusBarStyle={"dark-content"}
      statusBarColor={colors.primary}
      headerComponent={
        <Header
          title={post.sumary}
          style={{ backgroundColor: colors.primary }}
          textStyle={{ color: "white" }}
          iconStyle={{ tintColor: "white" }}
        />
      }
    >
      <View style={{ height: 0.2, width: "100%", backgroundColor: colors.border }} />
      <FlatList
        refreshControl={<RefreshControl refreshing={loading.listComment} onRefresh={onRefresh} />}
        ref={listCommentRef}
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 12 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{ flex: 1 }}
        data={comments}
        renderItem={renderCommentItem}
        ItemSeparatorComponent={() => (
          <View style={{ height: 4, backgroundColor: colors.background }} />
        )}
        ListFooterComponent={() => {
          if (loading.listComment) {
            return <ActivityIndicator color={colors.transparent50} style={{ margin: 12 }} />
          } else {
            return <View />
          }
        }}
      />
      <View
        style={{
          margin: 8,
          backgroundColor: colors.white,
          borderRadius: 8,
          borderWidth: 0.5,
          borderColor: colors.border,
          flexDirection: "row",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <TextInput
          style={{
            marginHorizontal: 12,
            marginVertical: 12,
            flex: 1,
            maxHeight: 120,
            fontSize: 16,
            includeFontPadding: false,
            textAlignVertical: "center",
            paddingBottom: 0,
            paddingTop: 0,
            fontFamily: typography.primary.regular,
          }}
          textAlignVertical="center"
          placeholder="Viết bình luận"
          onChangeText={onChangeText}
          value={text}
          numberOfLines={1}
          multiline={true}
          maxLength={500}
        />
        <TouchableOpacity onPress={onSendComment}>
          <FontAwesomeIcon
            icon={"paper-plane"}
            size={20}
            style={{
              marginRight: 12,
              marginVertical: 12,
              color: enableSend ? colors.primary : colors.subtitle,
            }}
          />
        </TouchableOpacity>
      </View>
      <ProcessingView isLoading={loading.sendComment} />
    </Screen>
  )
})
