/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import React from "react"
import { Blurhash } from "react-native-blurhash"
import { colors } from "../theme"
import { Text } from "./Text"

export const MediaView = ({ style, medias }: { style: ViewStyle; medias: any }) => {
  return (
    <View style={style}>
      <View style={{ flex: 1, borderRadius: 6, overflow: "hidden" }}>
        <Blurhash blurhash={medias[0].blurHash} style={StyleSheet.absoluteFill} />
        <Image source={{ uri: medias[0].url }} style={StyleSheet.absoluteFill} />
      </View>
      {medias[1] && (
        <View style={{ flex: 1, marginLeft: 2, borderRadius: 6, overflow: "hidden" }}>
          {medias[1] && (
            <View style={{ flex: 1, borderRadius: 6, overflow: "hidden" }}>
              <Blurhash blurhash={medias[1].blurHash} style={StyleSheet.absoluteFill} />
              <Image source={{ uri: medias[1].url }} style={StyleSheet.absoluteFill} />
            </View>
          )}
          {medias[2] && (
            <View style={{ flex: 1, marginTop: 2, borderRadius: 6, overflow: "hidden" }}>
              <View style={{ flex: 1 }}>
                <Blurhash blurhash={medias[2].blurHash} style={StyleSheet.absoluteFill} />
                <Image source={{ uri: medias[2].url }} style={StyleSheet.absoluteFill} />
              </View>
              {medias[3] && (
                <TouchableOpacity style={$viewMore}>
                  <Text style={$viewMoreText}>+{medias.length - 2}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  )
}

const $viewMoreText: TextStyle = {
  color: colors.darkContent,
  fontSize: 46,
  lineHeight: 50,
  textAlign: "center",
  textAlignVertical: "center",
}
const $viewMore: ViewStyle = {
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: colors.transparent50,
  justifyContent: "center",
  alignItems: "center",
}
