import { isEmpty, isNull } from "lodash"
import moment from "moment"

export const dateFormat = {
  L: "L", // 10/13/2020
  LT: "LT", // 8:49 AM
  LTS: "LTS", // 8:49:26 AM
  ShortDateDash: "DD - MM - YYYY",
  ShortDate: "DD/MM/YYYY",
  ShortDateDD: "dd/MM/yyyy",
  LongDate: "HH:mm DD/MM/YYYY",
  ShortDateTime: "HH:mm DD/MM",
  TIME24H: "HH:mm:ss", // 14:21:20
  TIMEHHmm: "HH:mm",
  MMYYYY: "MM/YYYY",
  DD: "DD",
}

export function getFormatDate(date: string, format: string) {
  if (isEmpty(date) || isNull(date)) return ""
  return (date && moment(date).format(format)) || ""
}

export function getToday() {
  return moment().toISOString()
}

export function sundaysInMonth(m, y) {
  const days = new Date(y, m, 0).getDate()
  const date = m + "/01/" + y

  const firstDate = new Date(date).getDay()
  const sundays = [firstDate === 0 ? 1 : 8 - firstDate]

  for (let i = sundays[0] + 7; i < days; i += 7) {
    sundays.push(i)
  }
  return sundays
}
