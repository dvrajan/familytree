import { getParents, getSpouse, getChildren } from './models/relationships'
import { filterFemale, filterMale, except } from './models/person'
import { compose, takeFirst, map } from './utils/functional_utils'
import { Person } from '../src/models/person'

export const mother = (person: Person): Person =>
  compose(takeFirst, filterFemale, getParents)(person)

export const father = (person: Person): Person =>
  compose(getSpouse, mother)(person)

export const son = (person: Person): Person[] =>
  compose(filterMale, getChildren)(person)

export const daughter = (person: Person): Person[] =>
  compose(filterFemale, getChildren)(person)

export const siblings = (person: Person): Person[] =>
  compose(except(person), getChildren, mother)(person)

export const brothers = (person: Person): Person[] =>
  compose(filterMale, siblings)(person)

export const sisters = (person: Person): Person[] =>
  compose(filterFemale, siblings)(person)

export const parentalUncle = (person: Person): Person[] =>
  compose(brothers, father)(person)

export const maternalUncle = (person: Person): Person[] =>
  compose(brothers, mother)(person)

export const parentalAunt = (person: Person): Person[] =>
  compose(sisters, father)(person)

export const maternalAunt = (person: Person): Person[] =>
  compose(sisters, mother)(person)

export const sisterInLaw = (person: Person): Person[] =>
    compose(map<Person, Person>(getSpouse), brothers)(person)
    .concat(compose(sisters, getSpouse)(person))

export const brotherInLaw = (person: Person): Person[] =>
    compose(map<Person, Person>(getSpouse), sisters)(person)
    .concat(compose(brothers, getSpouse)(person))