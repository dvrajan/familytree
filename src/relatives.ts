import { getParents, getSpouse, getChildren } from './models/relationships'
import { filterFemale, filterMale, except } from './models/person'
import { compose, takeFirst } from './utils/functional_utils'
import { Person } from '../src/models/person'

export const mother = (person: Person): Person =>
  compose(takeFirst, filterFemale, getParents)(person)

export const father = (person: Person): Person =>
  compose(getSpouse, mother)(person)

export const siblings = (person: Person): Person =>
  compose(except(person), getChildren, mother)(person)

export const brothers = (person: Person): Person =>
  compose(filterMale, siblings)(person)

export const sisters = (person: Person): Person =>
  compose(filterFemale, siblings)(person)