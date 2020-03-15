import { addSpouse, addParent, addChild, getChildren, getParents } from './../../src/models/relationships';
import {newPerson, Gender} from '../../src/models/person'
import {RelationshipType, child} from '../../src/models/relationship'

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

describe('getParents', () => {
  test('for a single parent', () => {
    let queen = newPerson("Margret", Gender.Female)
    let prince = newPerson("Charlie", Gender.Male)
    addParent(prince, queen)

    let parents = getParents(prince)

    expect(parents.length).toBe(1)
    expect(parents[0]).toStrictEqual(queen)
  })
  test('for no parent', () => {
    let prince = newPerson("Charlie", Gender.Male)
    let parents = getParents(prince)
    expect(parents.length).toBe(0)
  })
  test('for parents', () => {
    let king = newPerson("Arthur", Gender.Male)
    let queen = newPerson("Margret", Gender.Female)
    let prince = newPerson("Charlie", Gender.Male)
    addParent(prince, king)
    addParent(prince, queen)

    let parents = getParents(prince)

    expect(parents.length).toBe(2)
    expect(parents[0]).toStrictEqual(king)
    expect(parents[1]).toStrictEqual(queen)
  })
})

describe('getChildren', () => {
  test ('for a single child', () => {
    let queen = newPerson("Margret", Gender.Female)
    let prince = newPerson("Charlie", Gender.Male)

    addChild(queen, prince)

    let children = getChildren(queen)
    expect(children.length).toBe(1)
    expect(children[0]).toStrictEqual(prince)
  })

  test ('for a no child', () => {
    let queen = newPerson("Margret", Gender.Female)


    let children = getChildren(queen)
    expect(children.length).toBe(0)
  })

  test ('for a many children', () => {
    let queen = newPerson("Margret", Gender.Female)
    let prince1 = newPerson("Charlie", Gender.Male)
    let prince2 = newPerson("Adam", Gender.Male)

    addChild(queen, prince1)
    addChild(queen, prince2)

    let children = getChildren(queen)
    expect(children.length).toBe(2)
    expect(children[0]).toStrictEqual(prince1)
    expect(children[1]).toStrictEqual(prince2)
  })

  test('for undefined', () => {
    let children = getChildren(undefined)
    expect(children.length).toBe(0)
  })
})