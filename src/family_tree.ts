import { findPersonByName } from './person_finder';
import { Person, Gender, newPerson, marry, reproduce } from './models/person'

interface PersonDescription {
  gender: Gender,
  spouse?: string,
  parent?: string,
}

interface FamilyTree {
  [key: string]: PersonDescription
}

const familyTree: FamilyTree = {
  "Queen Margret": { gender: Gender.Female, spouse: "King Arthur"},
  "Bill": { gender: Gender.Male, spouse: "Flora", parent: "Queen Margret"},
  "Flora": { gender: Gender.Female, spouse: "Bill"},
  "Charlie": {gender: Gender.Male, parent: "Queen Margret"},
  "Percy": {gender: Gender.Male, spouse: "Audrey", parent: "Queen Margret"},
  "Audrey": {gender: Gender.Female, spouse: "Percy"},
  "Ronald": {gender: Gender.Male, spouse: "Helen", parent: "Queen Margret"},
  "Helen": {gender: Gender.Female, spouse: "Ronald"},
  "Ginerva": {gender: Gender.Female, spouse: "Harry", parent: "Queen Margret"},
  "Harry": {gender: Gender.Male, spouse: "Ginerva"},
  "Victoire": {gender: Gender.Female, spouse: "Ted", parent: "Flora"},
  "Ted": {gender: Gender.Male, spouse: "Victoire"},
  "Dominique": {gender: Gender.Female, parent: "Flora"},
  "Louis": {gender: Gender.Male, parent: "Flora"},
  "Molly": {gender: Gender.Female, parent: "Audrey"},
  "Lucy": {gender: Gender.Female, parent: "Audrey"},
  "Rose": {gender: Gender.Female, spouse: "Malfoy", parent: "Helen"},
  "Malfoy": {gender: Gender.Male, spouse: "Rose"},
  "Hugo": {gender: Gender.Male, parent: "Helen"},
  "James": {gender: Gender.Male, spouse: "Darcy", parent: "Ginerva"},
  "Darcy": {gender: Gender.Female, spouse: "James"},
  "Albus": {gender: Gender.Male, spouse: "Alice", parent: "Ginerva"},
  "Alice": {gender: Gender.Female, spouse: "Albus"},
  "Lily": {gender: Gender.Female, parent: "Ginerva"},
  "Remus": {gender: Gender.Male, parent: "Victoire"},
  "Draco": {gender: Gender.Male, parent: "Rose"},
  "Aster": {gender: Gender.Female, parent: "Rose"},
  "William": {gender: Gender.Male, parent: "Darcy"},
  "Ron": {gender: Gender.Male, parent: "Alice"},
  "Ginny": {gender: Gender.Female, parent: "Alice"},
}


export const buildFamilyTree = (): Person => {
  const kingArthur = newPerson("King Arthur", Gender.Male)

  for(let name in familyTree) {
    let description = familyTree[name]
    let person = newPerson(name, description.gender)
    if(description.spouse) {
      let spouse = findPersonByName(kingArthur, description.spouse)
      if(spouse) {
        marry(person, spouse)
      }
    }

    if(description.parent) {
      let parent = findPersonByName(kingArthur, description.parent)
      if(parent) {
        reproduce(parent, person)
      }
    }
  }

  return kingArthur

}

