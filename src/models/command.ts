import { Person } from './person'

export interface Command {
  execute(...args: any): string
}