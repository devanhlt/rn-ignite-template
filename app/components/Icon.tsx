import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"
import fontawesome from "@fortawesome/fontawesome"

import {
  faHeart,
  faComment,
  faBookmark,
  faEllipsisV,
  faComments,
  faMapPin,
  faLocationArrow,
  faTags,
  faCoins,
  faCodeBranch,
  faMapMarker,
  faBars,
  faHashtag,
  faSearch,
  faLink,
  faMapMarkerAlt,
  faCircle,
  faEye,
  faPaperPlane,
} from "@fortawesome/fontawesome-free-solid"

fontawesome.library.add(
  faHeart,
  faComment,
  faBookmark,
  faEllipsisV,
  faComments,
  faMapPin,
  faLocationArrow,
  faTags,
  faCoins,
  faCodeBranch,
  faMapMarker,
  faBars,
  faHashtag,
  faSearch,
  faLink,
  faMapMarkerAlt,
  faCircle,
  faEye,
  faPaperPlane,
)

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image
        style={[
          $imageStyle,
          color && { tintColor: color },
          size && { width: size, height: size },
          $imageStyleOverride,
        ]}
        source={iconRegistry[icon]}
      />
    </Wrapper>
  )
}

export const iconRegistry = {
  back: require("../../assets/icons/back.png"),
  bell: require("../../assets/icons/bell.png"),
  caretLeft: require("../../assets/icons/caretLeft.png"),
  caretRight: require("../../assets/icons/caretRight.png"),
  check: require("../../assets/icons/check.png"),
  clap: require("../../assets/icons/clap.png"),
  community: require("../../assets/icons/community.png"),
  components: require("../../assets/icons/components.png"),
  debug: require("../../assets/icons/debug.png"),
  github: require("../../assets/icons/github.png"),
  heart: require("../../assets/icons/heart.png"),
  hidden: require("../../assets/icons/hidden.png"),
  ladybug: require("../../assets/icons/ladybug.png"),
  lock: require("../../assets/icons/lock.png"),
  menu: require("../../assets/icons/menu.png"),
  more: require("../../assets/icons/more.png"),
  pin: require("../../assets/icons/pin.png"),
  podcast: require("../../assets/icons/podcast.png"),
  settings: require("../../assets/icons/settings.png"),
  slack: require("../../assets/icons/slack.png"),
  view: require("../../assets/icons/view.png"),
  x: require("../../assets/icons/x.png"),
  eye: require("../../assets/icons/eye.png"),
  eye_slash: require("../../assets/icons/eye_slash.png"),
  app_icon: require("../../assets/icons/app_icon.png"),
  call: require("../../assets/icons/ic_phone_call_support.png"),
  ic_scan_qr_code: require("../../assets/icons/ic_scan_qr_code.png"),
  flash: require("../../assets/icons/flash.png"),
  flash_off: require("../../assets/icons/flash_off.png"),
  search: require("../../assets/icons/search.png"),
  plus: require("../../assets/icons/plus.png"),
  add_promote: require("../../assets/icons/add_promote.png"),
  report: require("../../assets/icons/report.png"),
  home: require("../../assets/icons/home.png"),
  caret_down: require("../../assets/icons/caret_down.png"),
}

const $imageStyle: ImageStyle = {
  resizeMode: "contain",
}
