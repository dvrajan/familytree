import { mother, father, siblings, brothers, sisters } from './../src/relatives'
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

describe('siblings', () => {
  test('siblings exist', () => {
    let king = newPerson("Arthur", Gender.Male)
    let queen = newPerson('Margret', Gender.Female)
    marry(king, queen)

    let child1 = newPerson("Ted", Gender.Male)
    let child2 = newPerson('Louis', Gender.Male)
    let child3 = newPerson("Dominique", Gender.Male)

    reproduce(queen, child1)
    reproduce(queen, child2)
    reproduce(queen, child3)

    let result = siblings(child2)

    expect(result).toHaveLength(2)
    expect(result).toStrictEqual([child1, child3])
  })

  test('siblings does not exist', () => {
    let king = newPerson("Arthur", Gender.Male)
    let queen = newPerson('Margret', Gender.Female)
    marry(king, queen)

    let child1 = newPerson("Victoire", Gender.Female)
    reproduce(queen, child1)

    let result = brothers(child1)

    expect(result).toHaveLength(0)
  })
})

describe('brothers', () => {
  test('brothers exist', () => {

    let king = newPerson("Arthur", Gender.Male)
    let queen = newPerson('Margret', Gender.Female)
    marry(king, queen)

    let child1 = newPerson("Ted", Gender.Male)
    let child2 = newPerson('Louis', Gender.Female)
    let child3 = newPerson("Dominique", Gender.Male)

    reproduce(queen, child1)
    reproduce(queen, child2)
    reproduce(queen, child3)

    let result = brothers(child2)

    expect(result).toHaveLength(2)
    expect(result).toStrictEqual([child1, child3])
  })

  test('brothers does not exist', () => {
    let king = newPerson("Arthur", Gender.Male)
    let queen = newPerson('Margret', Gender.Female)
    marry(king, queen)

    let child1 = newPerson("Victoire", Gender.Female)
    let child2 = newPerson('Louis', Gender.Female)
    reproduce(queen, child1)
    reproduce(queen, child2)

    let result = brothers(child1)

    expect(result).toHaveLength(0)
  })
})


describe('sisters', () => {
  test('sisters exist', () => {

    let king = newPerson("Arthur", Gender.Male)
    let queen = newPerson('Margret', Gender.Female)
    marry(king, queen)

    let child1 = newPerson("Ted", Gender.Male)
    let child2 = newPerson('Louis', Gender.Female)
    let child3 = newPerson("Dominique", Gender.Female)

    reproduce(queen, child1)
    reproduce(queen, child2)
    reproduce(queen, child3)

    let result = sisters(child2)

    expect(result).toHaveLength(1)
    expect(result).toStrictEqual([child3])
  })

  test('sisters does not exist', () => {
    let king = newPerson("Arthur", Gender.Male)
    let queen = newPerson('Margret', Gender.Female)
    marry(king, queen)

    let child1 = newPerson("Victoire", Gender.Female)
    let child2 = newPerson('Louis', Gender.Male)
    reproduce(queen, child1)
    reproduce(queen, child2)

    let result = sisters(child1)

    expect(result).toHaveLength(0)
  })
})


