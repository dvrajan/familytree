import { RelationshipType } from '../../src/models/relationship'
import {
  Gender,
  newPerson,
  marry,
  reproduce,
  children,
  filterMale,
  filterFemale,
  except
} from '../../src/models/person'

test('marry', () => {
  let king = newPerson('Arthur', Gender.Male)
  let queen = newPerson('Margret', Gender.Male)

  marry(king, queen)

  expect(king.relations[0]).toStrictEqual({
    person: queen,
    type: RelationshipType.Spouse
  })
  expect(queen.relations[0]).toStrictEqual({
    person: king,
    type: RelationshipType.Spouse
  })
})

test('reproduce', () => {
  let queen = newPerson('Margret', Gender.Male)
  let prince = newPerson('Charlie', Gender.Female)

  reproduce(queen, prince)

  expect(queen.relations[0]).toStrictEqual({
    person: prince,
    type: RelationshipType.Child
  })
  expect(prince.relations[0]).toStrictEqual({
    person: queen,
    type: RelationshipType.Parent
  })
})

describe('children', () => {
  let king = newPerson('Arthur', Gender.Male)
  let queen = newPerson('Margret', Gender.Female)
  marry(king, queen)

  let prince1 = newPerson('Charlie', Gender.Male)
  let prince2 = newPerson('Adam', Gender.Male)
  reproduce(queen, prince1)
  reproduce(queen, prince2)

  test('children', () => {
    let result = children(king)
    expect(result.length).toBe(2)
    expect(result[0]).toStrictEqual(prince1)
    expect(result[1]).toStrictEqual(prince2)
  })

  test('children for female', () => {
    let result = children(queen)
    expect(result.length).toBe(2)
    expect(result[0]).toStrictEqual(prince1)
    expect(result[1]).toStrictEqual(prince2)
  })
})

describe('filterMale', () => {
  test('exists', () => {
    let queen = newPerson('Margret', Gender.Female)
    let king = newPerson('Arthur', Gender.Male)

    let result = filterMale([queen, king])
    expect(result).toHaveLength(1)
    expect(result[0]).toStrictEqual(king)
  })

  test('does not exist', () => {
    let queen = newPerson('Margret', Gender.Female)

    let result = filterMale([queen])

    expect(result).toHaveLength(0)
  })
})

describe('filterFemale', () => {
  test('exists', () => {
    let queen = newPerson('Margret', Gender.Female)
    let king = newPerson('Arthur', Gender.Male)

    let result = filterFemale([queen, king])
    expect(result).toHaveLength(1)
    expect(result[0]).toStrictEqual(queen)
  })

  test('does not exist', () => {
    let king = newPerson('Arthur', Gender.Male)

    let result = filterFemale([king])

    expect(result).toHaveLength(0)
  })
})

describe('except', () => {
  test('exclude self', () => {
    let sibling1 = newPerson('Dominique', Gender.Female)
    let sibling2 = newPerson('Ted', Gender.Male)
    let sibling3 = newPerson('Louis', Gender.Male)

    let result = except(sibling2)([sibling1, sibling2, sibling3])
    expect(result).toHaveLength(2)
    expect(result[0]).toStrictEqual(sibling1)
    expect(result[1]).toStrictEqual(sibling3)
  })

  test('empty array', () => {
    let person = newPerson('Dominique', Gender.Female)
    let result = except(person)([])
    expect(result).toHaveLength(0)
  })
})
