// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import {
  Lexend_100Thin as LexendThin,
  Lexend_200ExtraLight as LexendExtraLight,
  Lexend_300Light as LexendLight,
  Lexend_400Regular as LexendRegular,
  Lexend_500Medium as LexendMedium,
  Lexend_600SemiBold as LexendSemiBold,
  Lexend_700Bold as LexendBold,
  Lexend_800ExtraBold as LexendExtraBold,
  Lexend_900Black as LexendBlack,
} from "@expo-google-fonts/lexend"

export const customFontsToLoad = {
  LexendThin,
  LexendExtraLight,
  LexendLight,
  LexendRegular,
  LexendMedium,
  LexendSemiBold,
  LexendBold,
  LexendExtraBold,
  LexendBlack,
}

const fonts = {
  lexend: {
    // Cross-platform Google font.
    thin: "LexendThin",
    extralight: "LexendExtraLight",
    light: "LexendLight",
    regular: "LexendRegular",
    medium: "LexendMedium",
    semibold: "LexendSemiBold",
    bold: "LexendBold",
    extrabold: "LexendExtraBold",
    black: "LexendBlack",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.lexend,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
