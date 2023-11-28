import { Platform, PermissionsAndroid, Linking, Alert } from "react-native"
import * as ImagePicker from "react-native-image-picker"
import appConfig from "../../app.json"
import { translate } from "../i18n"
import {
  check,
  checkMultiple,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from "react-native-permissions"
import { PHOTO_TEMP_PATH } from "./constants"
import RNFS from "react-native-fs"
import Geolocation from "react-native-geolocation-service"

export const checkCameraPermission = async () => {
  return await check(
    Platform.OS === "android" ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA,
  )
}

export const requestCameraPermission = async () => {
  return await request(
    Platform.OS === "android" ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA,
  )
}

export const checkCamAndStoragePermission = async () => {
  const res = await checkMultiple(
    Platform.OS === "android"
      ? [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]
      : [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY],
  )
  if (Platform.OS === "android") {
    if (
      res[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED &&
      res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED
    ) {
      return RESULTS.GRANTED
    } else if (
      res[PERMISSIONS.ANDROID.CAMERA] === RESULTS.DENIED ||
      res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.DENIED
    ) {
      return RESULTS.DENIED
    } else if (
      res[PERMISSIONS.ANDROID.CAMERA] === RESULTS.LIMITED ||
      res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.LIMITED
    ) {
      return RESULTS.LIMITED
    } else if (
      res[PERMISSIONS.ANDROID.CAMERA] === RESULTS.BLOCKED ||
      res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.BLOCKED
    ) {
      return RESULTS.BLOCKED
    } else {
      return RESULTS.UNAVAILABLE
    }
  } else {
    if (
      res[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED &&
      res[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED
    ) {
      return RESULTS.GRANTED
    } else if (
      res[PERMISSIONS.IOS.CAMERA] === RESULTS.DENIED ||
      res[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.DENIED
    ) {
      return RESULTS.DENIED
    } else if (
      res[PERMISSIONS.IOS.CAMERA] === RESULTS.LIMITED ||
      res[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.LIMITED
    ) {
      return RESULTS.LIMITED
    } else if (
      res[PERMISSIONS.IOS.CAMERA] === RESULTS.BLOCKED ||
      res[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.BLOCKED
    ) {
      return RESULTS.BLOCKED
    } else {
      return RESULTS.UNAVAILABLE
    }
  }
}

export const requestCamAndStoragePermission = async () => {
  const res = await requestMultiple(
    Platform.OS === "android"
      ? [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]
      : [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY],
  )
  if (Platform.OS === "android") {
    if (
      res[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED &&
      res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED
    ) {
      return RESULTS.GRANTED
    } else if (
      res[PERMISSIONS.ANDROID.CAMERA] === RESULTS.DENIED ||
      res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.DENIED
    ) {
      return RESULTS.DENIED
    } else if (
      res[PERMISSIONS.ANDROID.CAMERA] === RESULTS.LIMITED ||
      res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.LIMITED
    ) {
      return RESULTS.LIMITED
    } else if (
      res[PERMISSIONS.ANDROID.CAMERA] === RESULTS.BLOCKED ||
      res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.BLOCKED
    ) {
      return RESULTS.BLOCKED
    } else {
      return RESULTS.UNAVAILABLE
    }
  } else {
    if (
      res[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED &&
      res[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED
    ) {
      return RESULTS.GRANTED
    } else if (
      res[PERMISSIONS.IOS.CAMERA] === RESULTS.DENIED ||
      res[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.DENIED
    ) {
      return RESULTS.DENIED
    } else if (
      res[PERMISSIONS.IOS.CAMERA] === RESULTS.LIMITED ||
      res[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.LIMITED
    ) {
      return RESULTS.LIMITED
    } else if (
      res[PERMISSIONS.IOS.CAMERA] === RESULTS.BLOCKED ||
      res[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.BLOCKED
    ) {
      return RESULTS.BLOCKED
    } else {
      return RESULTS.UNAVAILABLE
    }
  }
}

const hasLocationPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert("Unable to open settings")
    })
  }
  const status = await Geolocation.requestAuthorization("whenInUse")

  if (status === "granted") {
    return true
  }

  if (status === "denied") {
    Alert.alert(translate("Location_Is_Denied"))
  }

  if (status === "disabled") {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
      "",
      [
        { text: "Go to Settings", onPress: openSetting },
        { text: "Don't Use Location", onPress: () => {} },
      ],
    )
  }

  return false
}

export const hasLocationPermission = async (error) => {
  if (Platform.OS === "ios") {
    const hasPermission = await hasLocationPermissionIOS()
    return hasPermission
  }

  if (Platform.OS === "android" && Platform.Version < 23) {
    return true
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )

  if (hasPermission) {
    return true
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true
  }

  if (
    status === PermissionsAndroid.RESULTS.DENIED ||
    status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
  ) {
    error({ message: translate("Location_Is_Denied") })
  }

  return false
}

export const getLocation = async (hightAccuracy, access, error) => {
  const hasLocation = await hasLocationPermission(error)

  if (!hasLocation) {
    return
  }

  Geolocation.getCurrentPosition(access, error, {
    ...LOCATION_OPTIONS,
    enableHighAccuracy: hightAccuracy,
  })
}

export const createTempFolderIfNeed = async () => {
  await RNFS.exists(PHOTO_TEMP_PATH)
    .then((yes) => {
      if (!yes) {
        RNFS.mkdir(PHOTO_TEMP_PATH)
      }
    })
    .catch((_) => {
      RNFS.mkdir(PHOTO_TEMP_PATH)
    })
}

export const selectPhoto = (callback, onlyTake = true) => {
  createTempFolderIfNeed()
  if (onlyTake) {
    ImagePicker.launchCamera(
      {
        quality: 0.7,
        maxWidth: 960,
        maxHeight: 960,
        saveToPhotos: false,
        cameraType: "back",
        mediaType: "photo",
      },
      callback,
    )
  } else {
    ImagePicker.launchImageLibrary(
      {
        quality: 0.7,
        maxWidth: 960,
        maxHeight: 960,
        mediaType: "photo",
      },
      callback,
    )
  }
}

export const LOCATION_ERROR = {
  1: "Yêu cầu quyền sử dụng vị trí (GPS)",
  2: "Yêu cầu mở vị trí (GPS)",
  5: "Yêu cầu mở vị trí (GPS)",
}

export const LOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 20000,
  distanceFilter: 30,
  forceRequestLocation: true,
  showLocationDialog: true,
}

export const requestWritePermission = async () => {
  if (Platform.OS === "android" && Platform.Version > 23) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.warn(err)
      return false
    }
  } else {
    return true
  }
}

export const requestAndroidCameraPermission = async () => {
  if (Platform.OS === "android" && Platform.Version > 23) {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ])
      if (granted["android.permission.CAMERA"] !== PermissionsAndroid.RESULTS.GRANTED) {
        return { success: false, error: translate("Camera_Is_Denied") }
      } else if (
        granted["android.permission.READ_EXTERNAL_STORAGE"] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        return { success: false, error: translate("Storage_Is_Denied") }
      } else if (
        granted["android.permission.READ_EXTERNAL_STORAGE"] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        return { success: false, error: translate("Storage_Is_Denied") }
      }
      return { success: true, error: null }
    } catch (err) {
      return { success: false, error: translate("errors.unknowError") }
    }
  } else {
    return { success: true, error: null }
  }
}

export function deleteFile(uri: string) {
  RNFS.exists(uri).then((result) => {
    if (result) {
      console.log("RNFS - Unlink: ", result, uri)
      RNFS.unlink(uri)
        .then((res) => {
          console.log("RNFS - Success: ", res)
        })
        .catch((error) => {
          console.log("RNFS - Falied: ", error)
        })
    } else {
      console.log("RNFS - Nothing", uri)
    }
  })
}

export async function isExisted(uri: string) {
  return await RNFS.exists(uri)
}

export async function fileInfo(uri: string) {
  return await RNFS.stat(uri)
}

export const getFilePath = (fileName) =>
  Platform.OS === "android"
    ? `file://${PHOTO_TEMP_PATH}${fileName}`
    : `${PHOTO_TEMP_PATH}${fileName}`
