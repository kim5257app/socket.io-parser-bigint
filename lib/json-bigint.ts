export function parseJSON(text: string, reviver?: (this: any, key: string, value: any) => any): any {
  return JSON.parse(text, (k, v) => {
    if (typeof v === 'string' && /^BigInt\([0-9]*\)/.test(v)) {
      v = BigInt(v.slice(7, -1));
    }
    return typeof reviver === 'function' ? reviver(k, v) : v
  })
}

/**
 * @param {*} value
 * @param {(function(any,any):any)|((number|string)[])=} replacer
 * @param {string|number=} space
 */
export function stringifyJSON(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string {
  return JSON.stringify(value, (k, v) => {
    if (typeof v === 'bigint') {
      v = `BigInt(${v.toString()})`
    }
    return typeof replacer === 'function' ? replacer(k, v) : v
  }, space);
}

export default {
  parse: parseJSON,
  stringify: stringifyJSON,
}