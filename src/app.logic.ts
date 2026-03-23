import fs from 'fs';

let outputMessage = '';
const base = 5;
const headerMessage = `
=============================
        Tabla del ${base}
=============================\n
`;

for (let i = 1; i <= 10; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`;
}

outputMessage = headerMessage + outputMessage;
console.log(outputMessage);

const outputhPath = `outputs`;

fs.mkdirSync(outputhPath, { recursive: true });
fs.writeFileSync(`${outputhPath}/tabla-${base}.txt`, outputMessage);
