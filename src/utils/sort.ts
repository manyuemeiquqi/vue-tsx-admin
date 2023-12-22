import { cloneDeep } from 'lodash'

/**
 * @desc exchange array sort
 * @param array origin data source
 * @param beforeIdx array source index
 * @param newIdx array target index
 * @param isDeep array is nested ?
 * @returns exchanged array
 */
export const exchangeArray = <T extends Array<any>>(
  array: T,
  beforeIdx: number,
  newIdx: number,
  isDeep = false
): T => {
  const ret = isDeep ? cloneDeep(array) : array
  if (beforeIdx > -1 && newIdx > -1) {
    ret.splice(beforeIdx, 1, ret.splice(newIdx, 1, ret[beforeIdx]).pop())
  }
  return ret
}
