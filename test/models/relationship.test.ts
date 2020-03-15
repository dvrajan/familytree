import {spouse, child, parents, RelationshipType} from '../../src/models/relationship'
import {Gender, newPerson} from '../../src/models/person'

test('spouse', () => {
  let person = newPerson('Arthur', Gender.Male)
  let result = spouse(person)

  expect(result).toStrictEqual({person, type: RelationshipType.Spouse})
})

test('child', () => {
  let person = newPerson('Arthur', Gender.Male)

  let result = child(person)

  expect(result).toStrictEqual({person, type: RelationshipType.Child})
})

test('parents', () => {
  let person = newPerson('Arthur', Gender.Male)

  let result = parents(person)

  expect(result).toStrictEqual({person, type: RelationshipType.Parent})
})