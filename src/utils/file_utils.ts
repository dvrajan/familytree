import * as fs from 'fs';
import * as readline from 'readline';

export const readLine = (filePath: string, lineProcessor: (line: string) => void) => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false
  });

  readInterface.on('line', (line: string) => {
    lineProcessor(line)
  })
}