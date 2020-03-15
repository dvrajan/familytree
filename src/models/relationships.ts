import { compose } from './../utils/functional_utils'
import {
  Relationship,
  spouse,
  parents,
  child,
  RelationshipType
} from './relationship'
import { Person } from './person'

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
  if(!forPerson) {
    return new Array()
  }

  return forPerson.relations
    .filter(relation => relation.type == RelationshipType.Child)
    .map(relationship => relationship.person)
}

export const getSpouse = (forPerson: Person): Person => {
  return forPerson.relations.filter(relation => relation.type == RelationshipType.Spouse).map(relationship => relationship.person)[0]
}

export const addRelationship = (person: Person) => {
  return (relationship: Relationship) => {
    person.relations.push(relationship)
  }
}
