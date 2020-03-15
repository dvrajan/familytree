import { readLine } from './utils/file_utils';
import { commands } from './commands/commands';
import { buildFamilyTree } from './family_tree';

if(process.argv.length < 3) {
  console.log('input test file missing. exiting')
  process.exit(1)
}

const inputFile = process.argv[2]
const root = buildFamilyTree()
const commandMap = commands(root)

readLine(inputFile, (line: string) => {
  const tokens = line.split(' ')
  const command = commandMap[tokens[0]]
  const result = command.execute(...tokens.slice(1))
  console.log(result)
})
