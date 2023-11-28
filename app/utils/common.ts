import { Linking } from "react-native"

export const openUrl = (url) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url)
    } else {
      console.log("Don't know how to open URI: " + url)
    }
  })
}

export function numberWithThousandSeparator(value: number, separator: string) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}
