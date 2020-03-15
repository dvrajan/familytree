
import { findPersonByName } from './../person_finder'
import { Person, isMale, newPerson, reproduce, Gender } from './../models/person'
import { errors, success } from './../utils/constants'

interface GenderMap {
  [key: string]: Gender
}

const genderMap: GenderMap = {
  "male": Gender.Male,
  "female": Gender.Female
}

export class AddChildCommand {
  root: Person

  constructor(root: Person) {
    this.root = root
  }

  execute(...args: string[]): string {
    const parentName = args[0]
    const childName = args[1]
    const childGender = args[2]

    const parent = findPersonByName(this.root, parentName)

    if(!parent) {
      return errors.PERSON_NOT_FOUND
    }

    if(isMale(parent)) {
      return errors.CHILD_ADDITION_FAILED
    }

    const child = newPerson(childName, genderMap[childGender.toLowerCase()])
    reproduce(parent, child)
    return success.CHILD_ADDITION_SUCCEEDED
  }
}