import * as fnutils from '../../src/utils/functional_utils'
test('compose', () => {
  let adder = (val1: number) => {
    return (val2: number) : number => {
      return val1 + val2
    }
  }

  let add2 = adder(4)
  let add5 = adder(5)

  let result = fnutils.compose(add2, add5)(1)

  expect(result).toBe(10)
})