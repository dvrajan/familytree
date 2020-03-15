import { addSpouse, addChild, addParent } from './relationships';
import { Relationship } from './relationship'

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
  return {name, gender, relations: new Array()}
}

export const marry = (partner1: Person, partner2: Person) => {
  addSpouse(partner1, partner2)
  addSpouse(partner2, partner1)
}

export const reproduce = (parent: Person, child: Person) => {
  addChild(parent, child)
  addParent(child, parent)
}



