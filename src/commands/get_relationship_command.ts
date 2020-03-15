import { findPersonByName } from './../person_finder'
import { Person } from './../models/person'
import { errors } from './../utils/constants'
import {
  siblings,
  son,
  daughter,
  parentalUncle,
  maternalUncle,
  parentalAunt,
  maternalAunt,
  sisterInLaw,
  brotherInLaw
} from './../relatives'

interface RelativesMap {
  [key: string]: (person: Person) => Person[]
}

const relativesMap: RelativesMap = {
  'Paternal-Uncle': parentalUncle,
  'Maternal-Uncle': maternalUncle,
  'Paternal-Aunt': parentalAunt,
  'Maternal-Aunt': maternalAunt,
  'Sister-In-Law': sisterInLaw,
  'Brother-In-Law': brotherInLaw,
  'Son': son,
  'Daughter': daughter,
  'Siblings': siblings
}

export class GetRelationshipCommand {
  root: Person
  constructor (root: Person) {
    this.root = root
  }

  execute (...args: any[]): string {
    const name = args[0]
    const relative = args[1]

    const person = findPersonByName(this.root, name)
    if(!person){
      return errors.PERSON_NOT_FOUND
    }

    const relatives = relativesMap[relative](person)
    if(relatives.length == 0){
      return errors.NONE
    }

    return relatives.map(r => r.name).join(' ')
  }
}
