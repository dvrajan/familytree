const compose = (...fns: any[]) => {
  return (result: any): any => {
    while(fns.length > 0){
      result = fns.pop()(result)
    }
    return result
  }
}

export { compose }