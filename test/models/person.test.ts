
import {RelationshipType} from '../../src/models/relationship'
import {Gender, newPerson, marry, reproduce, children} from '../../src/models/person'

test('marry', () => {
  let king = newPerson('Arthur', Gender.Male)
  let queen = newPerson('Margret', Gender.Male)

  marry(king, queen)

  expect(king.relations[0]).toStrictEqual({person: queen, type: RelationshipType.Spouse})
  expect(queen.relations[0]).toStrictEqual({person: king, type: RelationshipType.Spouse})
})

test('reproduce', () => {
  let queen = newPerson('Margret', Gender.Male)
  let prince = newPerson('Charlie', Gender.Female)

  reproduce(queen, prince)

  expect(queen.relations[0]).toStrictEqual({person: prince, type: RelationshipType.Child})
  expect(prince.relations[0]).toStrictEqual({person: queen, type: RelationshipType.Parent})
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