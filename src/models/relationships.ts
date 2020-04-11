import { compose, conditionally, takeFirst } from './../utils/functional_utils'
import {
  Relationship,
  spouse,
  parents,
  child,
  RelationshipType
} from './relationship'
import { Person, isMale } from './person'

export interface Relationships {
  relations: Relationship[]
}

export const addSpouse = (forPerson: Person, toPerson: Person) =>
  compose(addRelationship(forPerson), spouse)(toPerson)
export const addParent = (forPerson: Person, toPerson: Person) =>
  compose(addRelationship(forPerson), parents)(toPerson)
export const addChild = (forPerson: Person, toPerson: Person) =>
  compose(addRelationship(forPerson), child)(toPerson)

export const getChildren = (forPerson: Person): Person[] => {
  return conditionally({
    if: (person: Person): boolean => !!person,
    then: (person: Person): Person[] => children(person),
    else: (person: Person): Person[] => new Array()
  })(forPerson)
}

export const getSpouse = (forPerson: Person): Person =>
  compose(takeFirst, getRelationship(RelationshipType.Spouse))(forPerson)

export const getParents = (forPerson: Person): Person[] =>
  getRelationship(RelationshipType.Parent)(forPerson)

const children = (person: Person) => {
  return conditionally({
    if: (person: Person): boolean => isMale(person),
    then: (person: Person): Person[] => compose(getRelationship(RelationshipType.Child), getSpouse)(person),
    else: (person: Person): Person[] => getRelationship(RelationshipType.Child)(person)
  })(person)
}

const addRelationship = (person: Person) => {
  return (relationship: Relationship) => {
    person.relations.push(relationship)
  }
}

const getRelationship = (type: RelationshipType): ((p: Person) => Person[]) => {
  return (person: Person): Person[] => {
    return conditionally<Person, Person[]>({
      if: (person: Person): boolean => !!person,
      then: (person: Person): Person[] =>
        filterRelationship(person.relations, type),
      else: (person: Person): Person[] => new Array()
    })(person)
  }
}

const filterRelationship = (
  relationships: Relationship[],
  type: RelationshipType
): Person[] => {
  return relationships
    .filter((relationship: Relationship) => relationship.type == type)
    .map((relationship: Relationship) => relationship.person)
}
