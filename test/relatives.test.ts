import { mother, father } from './../src/relatives'
import { newPerson, Gender, marry, reproduce } from './../src/models/person'

describe('mother', () => {
  test('mother exists', () => {
    let queen = newPerson('Margret', Gender.Female)
    let prince = newPerson('Charlie', Gender.Male)
    reproduce(queen, prince)

    let result = mother(prince)

    expect(result).toStrictEqual(queen)
  })

  test('mother does not exist', () => {
    let prince = newPerson('Charlie', Gender.Male)
    let result = mother(prince)
    expect(result).toBeUndefined
  })
})

describe('father', () => {
  test('father exists', () => {
    let king = newPerson("Arthur", Gender.Male)
    let queen = newPerson('Margret', Gender.Female)
    let prince = newPerson("Charlie", Gender.Male)

    marry(king, queen)
    reproduce(queen, prince)

    let result = father(prince)

    expect(result).toStrictEqual(king)
  })

  test('father does not exist', () => {
    let prince = newPerson('Charlie', Gender.Male)
    let result = father(prince)
    expect(result).toBeUndefined
  })
})


