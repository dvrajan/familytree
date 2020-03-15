import { mother } from './../src/relatives';
import { newPerson, Gender } from './../src/models/person';
import { addParent } from '../src/models/relationships'

describe('mother', () => {
  test('mother exists', () => {
    let queen = newPerson("Margret", Gender.Female)
    let prince = newPerson("Charlie", Gender.Male)
    addParent(prince, queen)

    let result = mother(prince)

    expect(result).toStrictEqual(queen)
  })
})