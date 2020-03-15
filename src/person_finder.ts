import { conditionally } from './utils/functional_utils'
import { Person, children } from './models/person'

export const findPersonByName = (familyRoot: Person, name: string): Person => {
  let result = dfs(new NodeAdapter(familyRoot), name)
  if (result) {
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

  identifier (): String {
    return this.person.name
  }

  children (): Node[] {
    return children(this.person).map(
      (person: Person) => new NodeAdapter(person)
    )
  }
}

const dfs = (node: Node, identifier: string): Node => {
  return conditionally<Node, Node>({
    if: (n: Node): boolean => n.identifier() === identifier,
    then: (n: Node): Node => n,
    else: (n: Node): Node => findInChildren(n.children(), identifier)
  })(node)
}

const findInChildren = (children: Node[], identifier: string): Node => {
  return children
    .map((child): Node => dfs(child, identifier))
    .find((n: Node): boolean => !!n)
}
