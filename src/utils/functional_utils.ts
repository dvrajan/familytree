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