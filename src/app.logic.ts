import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin.js';

const { b: base, l: limit, s: showTable } = yarg;
let outputMessage = '';
const headerMessage = `
=============================
        Tabla del ${base}
=============================\n
`;

for (let i = 1; i <= limit; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`;
}

outputMessage = headerMessage + outputMessage;
if (showTable) console.log(outputMessage);

const outputhPath = `outputs`;

fs.mkdirSync(outputhPath, { recursive: true });
fs.writeFileSync(`${outputhPath}/tabla-${base}.txt`, outputMessage);
console.log('File created');
