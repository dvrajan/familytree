import {Person} from './person'

enum RelationshipType {
  Child = 1,
  Parent,
  Spouse
}

interface Relationship {
  person: Person
  type: RelationshipType
}

type RelationshipFn = (person: Person) => Relationship;

const relationship = (type: RelationshipType) : RelationshipFn => {
  return (person: Person): Relationship => {
    return {person, type}
  }
}

const spouse : RelationshipFn = relationship(RelationshipType.Spouse)
const parents : RelationshipFn = relationship(RelationshipType.Parent)
const child : RelationshipFn = relationship(RelationshipType.Child)

export { spouse, parents, child, Relationship, RelationshipType }