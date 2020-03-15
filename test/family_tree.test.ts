import { findPersonByName } from './../src/person_finder'
import { buildFamilyTree } from './../src/family_tree'

test('buildFamilyTree', () => {
  const root = buildFamilyTree()

  const person = findPersonByName(root, 'Flora')

  expect(person).not.toBeNull
  expect(person.name).toBe('Flora')
})
