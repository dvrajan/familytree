import { readLine } from './utils/file_utils';
import { commands } from './commands/commands';
import { buildFamilyTree } from './family_tree';

const inputFile = process.argv[2]
const root = buildFamilyTree()
const commandMap = commands(root)

readLine(inputFile, (line: string) => {
  const tokens = line.split(' ')
  const command = commandMap[tokens[0]]
  const result = command.execute(...tokens.slice(1))
  console.log(result)
})