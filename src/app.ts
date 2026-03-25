import { yarg } from './config/plugins/yargs.plugin.js';

// console.log(yarg);

(async () => {
  await main();
})();

async function main() {
  console.log(yarg);
}
