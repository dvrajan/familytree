import { Person, children } from './models/person'

export const findPersonByName = (familyRoot: Person, name: string): Person => {
  let result = dfs(new NodeAdapter(familyRoot), name)
  if(result){
    return (result as NodeAdapter).person
  }
  return null
}

interface Node {
  identifier(): String
  children(): Node[]
}

class NodeAdapter {
  person: Person
  constructor (person: Person) {
    this.person = person
  }

  identifier(): String {
    return this.person.name
  }

  children (): Node[] {
    return children(this.person).map((person: Person) => new NodeAdapter(person))
  }
}

const dfs = (node: Node, identifier: string): Node => {
  if (node.identifier() === identifier) {
    return node
  }

  let children = node.children()
  for (const child of children) {
    const result = dfs(child, identifier)
    if (result != undefined) {
      return result
    }
  }
  return undefined
}
