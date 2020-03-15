

import { Person } from './../models/person'
import { AddChildCommand } from './add_child_command'
import { GetRelationshipCommand } from './get_relationship_command';


interface Command {
  execute(...args: any): string
}

interface CommandMap {
  [key: string]: Command
}

export const commands = (root: Person) : CommandMap => {
  return {
    'ADD_CHILD': new AddChildCommand(root),
    'GET_RELATIONSHIP': new GetRelationshipCommand(root)
  }
}