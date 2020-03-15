
import {RelationshipType} from '../../src/models/relationship'
import {Gender, newPerson, marry, reproduce} from '../../src/models/person'

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