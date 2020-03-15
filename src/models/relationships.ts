import { compose } from './../utils/functional_utils';
import {Relationship, spouse, parents, child} from './relationship'
import {Person} from './person'

export interface Relationships {
  relations: Relationship[]
}

export const addSpouse = (forPerson: Person, toPerson: Person) => compose(addRelationship(forPerson), spouse)(toPerson)
export const addParent = (forPerson: Person, toPerson: Person) => compose(addRelationship(forPerson), parents)(toPerson)
export const addChild = (forPerson: Person, toPerson: Person) => compose(addRelationship(forPerson), child)(toPerson)

export const addRelationship = (person: Person) => {
  return (relationship: Relationship) => {
    person.relations.push(relationship)
  }
}