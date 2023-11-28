// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral0: "#FFFFFF",
  neutral100: "#F5F5F5",
  neutral200: "#EEEEEE",
  neutral300: "#E0E0E0",
  neutral400: "#BDBDBD",
  neutral500: "#9E9E9E",
  neutral600: "#757575",
  neutral700: "#616161",
  neutral800: "#424242",
  neutral900: "#212121",

  primary100: "#BBDEFB",
  primary200: "#90CAF9",
  primary300: "#64B5F6",
  primary400: "#42A5F5",
  primary500: "#2196F3",
  primary600: "#1E88E5",
  primary700: "#1976D2",
  primary800: "#1565C0",
  primary900: "#0D47A1",

  secondary100: "#B2DFDB",
  secondary200: "#80CBC4",
  secondary300: "#4DB6AC",
  secondary400: "#26A69A",
  secondary500: "#009688",
  secondary600: "#00897B",
  secondary700: "#00796B",
  secondary800: "#00695C",
  secondary900: "#004D40",

  accent100: "#FFECB3",
  accent200: "#FFE082",
  accent300: "#FFD54F",
  accent400: "#FFCA28",
  accent500: "#FFC107",
  accent600: "#FFB300",
  accent700: "#FFA000",
  accent800: "#FF8F00",
  accent900: "#FF6F00",

  angry100: "#FFCDD2",
  angry200: "#EF9A9A",
  angry300: "#E57373",
  angry400: "#EF5350",
  angry500: "#F44336",
  angry600: "#E53935",
  angry700: "#D32F2F",
  angry800: "#C62828",
  angry900: "#B71C1C",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  palette,

  white: palette.neutral0,

  transparent: "rgba(0, 0, 0, 0)",

  primary: palette.primary800,

  primaryLight: palette.primary600,

  transparent20: palette.overlay20,

  transparent50: palette.overlay50,

  lightContent: palette.neutral900,

  darkContent: palette.neutral0,

  title: palette.neutral800,

  subtitle: palette.neutral600,

  background: palette.neutral100,

  backgroundHighlight: palette.accent100,

  border: palette.neutral400,

  separator: palette.neutral400,

  error: palette.angry500,

  money: palette.accent500,

  errorBackground: palette.angry100,
}
