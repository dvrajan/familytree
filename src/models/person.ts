import {
  addSpouse,
  addChild,
  addParent,
  getChildren,
  getSpouse
} from './relationships'
import { Relationship } from './relationship'
import { compose, conditionally } from '../utils/functional_utils'

export enum Gender {
  Male = 1,
  Female
}

export interface Person {
  name: string
  gender: Gender
  relations: Relationship[]
}

export const newPerson = (name: string, gender: Gender): Person => {
  return { name, gender, relations: new Array() }
}

export const marry = (partner1: Person, partner2: Person) => {
  addSpouse(partner1, partner2)
  addSpouse(partner2, partner1)
}

export const reproduce = (parent: Person, child: Person) => {
  addChild(parent, child)
  addParent(child, parent)
}

export const children = (person: Person): Person[] => {
  return conditionally<Person, Person[]>({
    if: isMale,
    then: (person: Person): Person[] => compose(getChildren, spouse)(person),
    else: (person: Person): Person[] => getChildren(person)
  })(person)
}

export const spouse = (person: Person): Person => {
  return getSpouse(person)
}

export const filterMale = (people: Person[]): Person[] =>
  filterGender(Gender.Male)(people)

export const filterFemale = (people: Person[]): Person[] =>
  filterGender(Gender.Female)(people)

export const except = (person: Person) => (people: Person[]): Person[] =>
  people.filter((p: Person) => p != person)

const filterGender = (gender: Gender) => (people: Person[]): Person[] =>
  people.filter(p => p.gender == gender)

const isMale = (person: Person): boolean => {
  return person.gender == Gender.Male
}
