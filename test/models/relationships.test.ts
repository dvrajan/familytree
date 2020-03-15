import { addRelationship, Relationships, addSpouse, addParent, addChild } from './../../src/models/relationships';
import {newPerson, Gender} from '../../src/models/person'
import {RelationshipType} from '../../src/models/relationship'

test('addRelationship', () => {
  let king = newPerson("Arthur", Gender.Male)
  let queen = newPerson("Margret", Gender.Female)
  let relationship = {person: queen, type: RelationshipType.Spouse }

  addRelationship(king)(relationship)

  expect(king.relations[0]).toStrictEqual(relationship)
})

test ('add spouse', () => {
  let king = newPerson("Arthur", Gender.Male)
  let queen = newPerson("Margret", Gender.Female)

  addSpouse(king, queen)

  expect(king.relations[0].person).toBe(queen)
  expect(king.relations[0].type).toBe(RelationshipType.Spouse)
})

test ('add parent', () => {
  let king = newPerson("Arthur", Gender.Male)
  let prince = newPerson("Charlie", Gender.Male)

  addParent(prince, king)

  expect(prince.relations[0].person).toBe(king)
  expect(prince.relations[0].type).toBe(RelationshipType.Parent)
})

test ('add child', () => {

  let queen = newPerson("Margret", Gender.Female)
  let prince = newPerson("Charlie", Gender.Male)

  addChild(queen, prince)

  expect(queen.relations[0].person).toBe(prince)
  expect(queen.relations[0].type).toBe(RelationshipType.Child)
})