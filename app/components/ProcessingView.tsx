/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native"
import { colors } from "../theme"
import { Text } from "./Text"

const ProcessingView = ({ label = undefined, isLoading = false }) => {
  return (
    <>
      {isLoading && (
        <Modal visible={isLoading} transparent>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: colors.transparent50,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <View
              style={{
                backgroundColor: colors.transparent50,
                borderRadius: 12,
                padding: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size={"small"} color={colors.darkContent} />
              {label && (
                <Text
                  weight="regular"
                  size="xl"
                  style={{ color: colors.darkContent, marginTop: 12 }}
                >
                  {label}
                </Text>
              )}
            </View>
          </View>
        </Modal>
      )}
    </>
  )
}
export default ProcessingView
