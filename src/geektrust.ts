import { commands } from './commands/commands';
import { buildFamilyTree } from './family_tree';
import * as fs from 'fs';
import * as readline from 'readline';

const inputFile = process.argv[2]
const root = buildFamilyTree()
const commandMap = commands(root)

const readInterface = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: process.stdout,
  terminal: false
});

readInterface.on('line', (line: string) => {
  const tokens = line.split(' ')
  const command = tokens[0]
  const result = commandMap[command].execute(...tokens.slice(1))
  console.log(result)
})
