/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { FlatList, Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "../theme"
import { Text } from "./Text"
import { numberWithThousandSeparator } from "../utils/common"
import { Chip } from "./Chip"
import { MediaView } from "./MediaView"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { dateFormat, getFormatDate } from "../utils/date-util"
import stc from "string-to-color"

export const PostView = ({ postItem, viewComments }: { postItem: any; viewComments: any }) => {
  const renderComment = () => (
    <TouchableOpacity
      onPress={viewAllComments}
      style={{
        padding: 8,
        backgroundColor: colors.background,
        marginVertical: 4,
        marginHorizontal: 2,
        borderRadius: 6,
      }}
    >
      <Text numberOfLines={3}>
        <Text
          weight={"semibold"}
          text={`${postItem.name} `}
          style={{
            color: colors.title,
            fontSize: 14,
            lineHeight: 18,
            fontWeight: "600",
            marginRight: 4,
          }}
        />
        <Text
          text={postItem.text}
          style={{ color: colors.title, fontSize: 14, lineHeight: 18, flex: 1 }}
        />
      </Text>
      <Text
        text={`Xem ${postItem.commentCount} thảo luận`}
        style={{
          color: colors.primaryLight,
          fontSize: 14,
          lineHeight: 20,
          textDecorationLine: "underline",
        }}
      />
    </TouchableOpacity>
  )

  const viewAllComments = () => {
    // navigate to list comment screen
    viewComments && viewComments(postItem.id, postItem)
  }

  return (
    <View key={postItem.id} style={$postContainer}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 8,
          paddingLeft: 8,
          paddingRight: 12,
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderWidth: 1,
            padding: 2,
            borderRadius: 99,
            borderColor: colors.primary,
          }}
        >
          <Image
            source={{ uri: postItem.avatar }}
            style={{ width: 28, aspectRatio: 1, borderRadius: 24 }}
          />
        </View>
        <View style={{ flex: 1, alignItems: "flex-start", marginLeft: 6, alignSelf: "center" }}>
          <Text
            weight={"semibold"}
            style={{
              color: colors.title,
              fontSize: 12,
              lineHeight: 14,
            }}
          >
            {postItem.name}
          </Text>
          <Text
            style={{
              color: colors.subtitle,
              fontSize: 10,
              lineHeight: 12,
            }}
          >
            {getFormatDate(postItem.createdAt, dateFormat.ShortDate)}
          </Text>
        </View>
        <FontAwesomeIcon icon="bookmark" size={18} color={colors.transparent20} />
      </View>
      <View>
        <MediaView
          medias={postItem.medias}
          style={{
            width: "100%",
            aspectRatio: 4 / 3,
            flexDirection: "row",
            paddingHorizontal: 2,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
            top: 4,
            left: 4,
            right: 0,
          }}
        >
          <Chip
            label={postItem.category}
            onPress={() => {
              // open search
            }}
            color={colors.white}
            backgroundColor={colors.transparent50}
            icon={"hashtag"}
            textStyle={{ fontWeight: "bold" }}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "stretch",
          padding: 4,
          paddingBottom: 8,
          marginTop: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              ellipsizeMode="tail"
              weight={"semibold"}
              style={{
                color: colors.primary,
                fontSize: 16,
                lineHeight: 16,
              }}
            >
              {postItem.price != null ? numberWithThousandSeparator(postItem.price, ".") : "0"} đ
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={viewAllComments}
              style={{ flexDirection: "row", alignItems: "center", marginRight: 12 }}
            >
              <Text
                style={{ fontSize: 14, marginRight: 2, lineHeight: 16, color: colors.title }}
                text={postItem.commentCount}
              />
              <FontAwesomeIcon icon={"comments"} size={18} color={colors.title} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 14, marginRight: 2, lineHeight: 16, color: colors.title }}
                text="186"
              />
              <FontAwesomeIcon icon={"eye"} size={18} color={colors.title} />
            </View>
          </View>
        </View>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          weight={"semibold"}
          style={{
            color: colors.title,
            fontSize: 16,
            lineHeight: 18,
            textAlignVertical: "center",
            margin: 4,
            marginTop: 4,
          }}
        >
          {postItem.sumary}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginLeft: 2,
            marginBottom: 4,
          }}
        >
          <FontAwesomeIcon icon={"map-marker-alt"} size={14} color={colors.subtitle} />
          <Text
            style={{
              color: colors.title,
              fontSize: 14,
              marginLeft: 2,
              lineHeight: 20,
              textAlignVertical: "center",
            }}
            text={postItem.address || "Chưa xác định"}
          />
        </View>
        {renderComment()}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={postItem.tags.split(",")}
          renderItem={({ item }) => {
            return (
              <Chip key={item} label={item} onPress={() => {}} color={stc(item)} icon={"circle"} />
            )
          }}
        />
      </View>
    </View>
  )
}

const $postContainer: ViewStyle = {
  alignItems: "center",
  backgroundColor: colors.white,
}
