
import { findPersonByName } from './../person_finder'
import { Person, isMale, newPerson, reproduce, Gender } from './../models/person'
import { errors, gender, success } from './../utils/constants'

export class AddChildCommand {
  root: Person

  constructor(root: Person) {
    this.root = root
  }

  execute(...args: any[]): string {
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

    const child = newPerson(childName, this.getGender(childGender))
    reproduce(parent, child)
    return success.CHILD_ADDITION_SUCCEEDED
  }

  private getGender(genderStr: string): Gender {
    if(genderStr.toLowerCase() == gender.MALE) {
      return Gender.Male
    } else {
      return Gender.Female
    }
  }
}