/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon, Screen, Text } from "../../components"
import { colors } from "../../theme"
import { AppStackScreenProps, navNext } from "../../navigators"
import { useStores } from "../../models"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native-gesture-handler"
import ProcessingView from "../../components/ProcessingView"
import { PostView } from "../../components/PostView"

interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const {
    appStore: { getSetting },
    authenticationStore: { user },
    loadingStore: { loading },
    postStore: { listPost },
  } = useStores()
  const { navigate } = useNavigation()
  const [posts, setPosts] = useState([])
  const nextCursor = useRef(-1)

  useEffect(() => {
    listPost()
      .then((res) => {
        nextCursor.current = res.data.nextCursor
        setPosts(res.data.items)
      })
      .catch((err) => {
        console.log("LOGGGG", err)
      })
  }, [])

  const openProfile = () => {
    navNext("ProfileInformation")
  }

  const onViewComments = (id, post) => {
    navNext("Comment", { id, post })
  }

  const renderFeedItem = ({ item }) => {
    switch (item.type) {
      case "ADS":
        break
      default:
        return <PostView postItem={item} viewComments={onViewComments} />
    }
  }

  return (
    <Screen
      style={{ backgroundColor: colors.background }}
      statusBarStyle={"dark-content"}
      statusBarColor={colors.background}
      showHeader={false}
    >
      <View style={$container}>
        <TouchableOpacity style={$addPostButton} onPress={openProfile}>
          <Text weight={"bold"} style={$postButtonText}>
            Đăng bài
          </Text>
          <Icon icon="add_promote" size={36} color="white" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity style={$profileAvatarContainer} onPress={openProfile}>
            <Image
              source={{ uri: user.avatar }}
              style={{ flex: 1, alignSelf: "stretch", borderRadius: 64, margin: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 0.2, width: "100%", backgroundColor: colors.border }} />
      <FlatList
        contentContainerStyle={{ paddingBottom: 64 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{ flex: 1 }}
        data={posts}
        renderItem={renderFeedItem}
        ItemSeparatorComponent={() => (
          <View style={{ height: 16, backgroundColor: colors.background }} />
        )}
      />
      {loading.getSetting && <ProcessingView isLoading={loading.getSetting} />}
    </Screen>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  paddingRight: 12,
  paddingVertical: 4,
  alignItems: "center",
}

const $postButtonText: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: "white",
}
const $addPostButton: ViewStyle = {
  backgroundColor: colors.primary,
  borderTopEndRadius: 28,
  borderBottomEndRadius: 28,
  height: 44,
  borderColor: colors.primary,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingLeft: 12,
  paddingRight: 8,
  elevation: 8,
}
const $profileAvatarContainer: ViewStyle = {
  backgroundColor: "white",
  width: 48,
  height: 48,
  borderRadius: 28,
  borderWidth: 2,
  borderColor: colors.primary,
}
