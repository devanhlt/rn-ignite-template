/* eslint-disable no-useless-escape */
export function isVietnamesePhoneNumber(number: string) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(number)
}

export function isEmail(email: string) {
  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(String(email).toLowerCase())
}

export function isValidPassword(password: string) {
  const pattern =
    /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])(?!.*\\s)[0-9a-zA-Z!@#$%^&*()]*$/
  return pattern.test(String(password))
}

export function isSerialValid(serial: string) {
  const pattern = /^[a-z\sA-Z\s0-9\s_-]*$/
  return pattern.test(String(serial))
}

export function isNumber(value: string) {
  const pattern = /^[0-9]*$/
  return pattern.test(String(value))
}

export function isDecimalNumber(value: string) {
  const pattern = /^([0-9]+\.?[0-9]*|[0-9]+\,?[0-9]*|\[0-9]+)*$/
  return pattern.test(String(value))
}

export function isDecimalNumberShort(value: string) {
  const pattern = /^([0-9]*[\.\,]?[0-9]*)$/
  return pattern.test(String(value))
}

export function isUserNameValid(name: string) {
  const pattern = /^[a-z\sA-Z\s0-9\s_.]*$/
  return pattern.test(String(name))
}
