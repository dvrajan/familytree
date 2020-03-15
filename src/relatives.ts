import { getParents } from './models/relationships'
import { filterFemale } from './models/person'
import { compose, takeFirst } from './utils/functional_utils'
import { Person } from '../src/models/person'

export const mother = (person: Person): Person =>
  compose(takeFirst, filterFemale, getParents)(person)
