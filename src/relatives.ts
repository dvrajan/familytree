import { getParents, getSpouse } from './models/relationships'
import { filterFemale, filterMale } from './models/person'
import { compose, takeFirst } from './utils/functional_utils'
import { Person } from '../src/models/person'

export const mother = (person: Person): Person =>
  compose(takeFirst, filterFemale, getParents)(person)

export const father = (person: Person): Person =>
  compose(getSpouse, mother)(person)
