export const compose = (...fns: any[]) => {
  return (result: any): any => {
    while(fns.length > 0){
      result = fns.pop()(result)
    }
    return result
  }
}

export const conditionally = <T, U>(options: {
  if: (t: T) => boolean;
  then: (t: T) => U;
  else: (t: T) => U;
}) => (t: T): U => {
  return options.if(t) ? options.then(t) : options.else(t)
}

export const takeFirst = <T>(values: T[]): T => {
  return values && values[0]
}

export const map = <T, U>(fn: (t: T) => U): (t: T[]) => U[] => {
  return (t: T[]) : U[] => {
    return t.map(val => fn(val))
  }
}