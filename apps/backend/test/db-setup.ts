import { readdirSync, readFileSync } from 'fs';
const DIRECTORY = './src/db/migrations/';

console.log('PREPARING DB');

timeIt('MIGRATE DOWN', () => {
  const fileContents = readFiles(DIRECTORY, 'down');

  for (const content of fileContents) {
  }
});

timeIt('MIGRATE UP', () => {
  const fileContents = readFiles(DIRECTORY, 'up');

  for (const content of fileContents) {
  }
});

timeIt('SEED', () => {});

function readFiles(dirname: string, kind: 'down' | 'up'): string[] {
  const files = readdirSync(dirname);

  const filteredFiles = files
    .map(
      (file) =>
        file.endsWith(`.${kind}.sql`) && {
          id: parseInt(file.split('_')[0]),
          fileName: file,
        },
    )
    .filter(Boolean) as { id: number; fileName: string }[];

  const sortedFiles = filteredFiles.sort((a, b) =>
    kind === 'up' ? a.id - b.id : b.id - a.id,
  );

  console.log(sortedFiles.map((f) => f.fileName).join(', '));

  return files.map((fileName) => readFileSync(dirname + fileName, 'utf-8'));
}

async function timeIt(name: string, cb: () => void | Promise<void>) {
  const start = new Date().valueOf();
  console.log(name + ' ...');
  await cb();
  const end = new Date().valueOf();
  console.log(`${name} took: ${end - start} ms`);
}
