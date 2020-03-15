import {newPerson, Gender, marry, reproduce} from '../src/models/person'
import {findPersonByName} from '../src/person_finder'

describe('findPersonByName', () => {
    test('non existing person', () => {
      let king = newPerson('Arthur', Gender.Male)

      let person = findPersonByName(king, 'Unknown')
      expect(person).toBeFalsy
    })


  test('root node as the person we are looking for', () => {
    let king = newPerson('Arthur', Gender.Male)

    let person = findPersonByName(king, 'Arthur')
    expect(person).toStrictEqual(king)
  })

  test('first level children as the person we are looking for with root as a female', () => {
    let queen = newPerson('Margret', Gender.Female)
    let prince1 = newPerson('Charlie', Gender.Male)
    let prince2 = newPerson('Adam', Gender.Male)

    reproduce(queen, prince1)
    reproduce(queen, prince2)

    let person = findPersonByName(queen, 'Adam')
    expect(person).toStrictEqual(prince2)
  })


  test('first level children as the person we are looking for with root as male', () => {
    let king = newPerson('Arthur', Gender.Male)
    let queen = newPerson('Margret', Gender.Female)
    let prince1 = newPerson('Charlie', Gender.Male)
    let prince2 = newPerson('Adam', Gender.Male)

    marry(king, queen)
    reproduce(queen, prince1)
    reproduce(queen, prince2)

    let person = findPersonByName(king, 'Adam')
    expect(person).toStrictEqual(prince2)
  })

  test('multi level children as the person we are looking for with root as male', ()=> {
    let king = newPerson('Arthur', Gender.Male)
    let queen = newPerson('Margret', Gender.Female)
    marry(king, queen)

    let prince1L1 = newPerson('Bill', Gender.Male)
    let princess1L1 = newPerson('Flora', Gender.Female)
    marry(prince1L1, princess1L1)

    let princess2L1 = newPerson('Audrey', Gender.Female)
    let prince2L1 = newPerson('Percy', Gender.Male)
    marry(prince2L1, princess2L1)

    let princess3L1 = newPerson('Charlie', Gender.Male)

    reproduce(queen, prince1L1)
    reproduce(queen, princess2L1)
    reproduce(queen, princess3L1)


    let prince1L2 = newPerson('Louis', Gender.Male)
    reproduce(princess1L1, prince1L2)

    let prince2L2 = newPerson('Ted', Gender.Male)
    let princess2L2 = newPerson('Victoire', Gender.Female)
    marry(prince2L2, princess2L2)
    reproduce(princess2L1, prince2L2)

    let person = findPersonByName(king, 'Louis')
    expect(person).toStrictEqual(prince1L2)
  })

})