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

test('conditionally', ()=> {
  let gt10 = (val: number) => {
    return val > 10
  }

  const conditionalFn = fnutils.conditionally<number, boolean>({
    if: gt10,
    then: (val :number): boolean => true,
    else: (val :number): boolean => false
  })

  expect(conditionalFn(11)).toBe(true)
  expect(conditionalFn(9)).toBe(false)
})