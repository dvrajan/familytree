import { findPersonByName } from './person_finder';
import { Person, Gender, newPerson, marry, reproduce } from './models/person'

interface PersonDescription {
  name: string,
  gender: Gender,
  spouse?: string,
  parent?: string,
}

const people: PersonDescription[] = [
  {name: "Queen Margret",  gender: Gender.Female, spouse: "King Arthur"},
  {name: "Bill",  gender: Gender.Male, spouse: "Flora", parent: "Queen Margret"},
  {name: "Flora",  gender: Gender.Female, spouse: "Bill"},
  {name: "Charlie", gender: Gender.Male, parent: "Queen Margret"},
  {name: "Percy", gender: Gender.Male, spouse: "Audrey", parent: "Queen Margret"},
  {name: "Audrey", gender: Gender.Female, spouse: "Percy"},
  {name: "Ronald", gender: Gender.Male, spouse: "Helen", parent: "Queen Margret"},
  {name: "Helen", gender: Gender.Female, spouse: "Ronald"},
  {name: "Ginerva", gender: Gender.Female, spouse: "Harry", parent: "Queen Margret"},
  {name: "Harry", gender: Gender.Male, spouse: "Ginerva"},
  {name: "Victoire", gender: Gender.Female, spouse: "Ted", parent: "Flora"},
  {name: "Ted", gender: Gender.Male, spouse: "Victoire"},
  {name: "Dominique", gender: Gender.Female, parent: "Flora"},
  {name: "Louis", gender: Gender.Male, parent: "Flora"},
  {name: "Molly", gender: Gender.Female, parent: "Audrey"},
  {name: "Lucy", gender: Gender.Female, parent: "Audrey"},
  {name: "Rose", gender: Gender.Female, spouse: "Malfoy", parent: "Helen"},
  {name: "Malfoy", gender: Gender.Male, spouse: "Rose"},
  {name: "Hugo", gender: Gender.Male, parent: "Helen"},
  {name: "James", gender: Gender.Male, spouse: "Darcy", parent: "Ginerva"},
  {name: "Darcy", gender: Gender.Female, spouse: "James"},
  {name: "Albus", gender: Gender.Male, spouse: "Alice", parent: "Ginerva"},
  {name: "Alice", gender: Gender.Female, spouse: "Albus"},
  {name: "Lily", gender: Gender.Female, parent: "Ginerva"},
  {name: "Remus", gender: Gender.Male, parent: "Victoire"},
  {name: "Draco", gender: Gender.Male, parent: "Rose"},
  {name: "Aster", gender: Gender.Female, parent: "Rose"},
  {name: "William", gender: Gender.Male, parent: "Darcy"},
  {name: "Ron", gender: Gender.Male, parent: "Alice"},
  {name: "Ginny", gender: Gender.Female, parent: "Alice"},
]


export const buildFamilyTree = (): Person => {
  const kingArthur = newPerson("King Arthur", Gender.Male)

  for(let p of people) {

    let person = newPerson(p.name, p.gender)
    if(p.spouse) {
      let spouse = findPersonByName(kingArthur, p.spouse)
      if(spouse) {
        marry(person, spouse)
      }
    }

    if(p.parent) {
      let parent = findPersonByName(kingArthur, p.parent)
      if(parent) {
        reproduce(parent, person)
      }
    }
  }

  return kingArthur

}

