import * as lineReader from 'line-reader'
import { commands } from './src/commands/commands';
import { buildFamilyTree } from './src/family_tree';

const inputFile = process.argv[0]
const root = buildFamilyTree()
const commandMap = commands(root)

lineReader.eachLine(inputFile, (line: string) => {
  const tokens = line.split(' ')
  const command = tokens[0]
  const result = commandMap[command].execute(tokens.slice(1))
  console.log(result)
})
