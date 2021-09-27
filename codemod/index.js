#!/usr/bin/env node
/* eslint-disable no-console */

const glob = require('fast-glob');
const workerpool = require('workerpool');
const cliProgress = require('cli-progress');

const pathGlob = process.argv[2];

const paths = glob.sync(pathGlob, { ignore: ['**/node_modules/**', '*.d.ts'] });

const progress = new cliProgress.SingleBar(
  {
    format: 'Analyzing code',
    hideCursor: true,
  },
  cliProgress.Presets.shades_classic,
).on('SIGINT', () => {
  progress.stop();
  process.exitCode = 1;
});

progress.start(paths.length, 0);

const pool = workerpool.pool(`${__dirname}/wrapper.js`);

const jobs = [];

for (const filepath of paths) {
  jobs.push(
    pool
      .exec('codemod', [filepath])
      .then((result) => {
        progress.increment();
        return result;
      })
      .catch((err) => {
        console.error(err);
      }),
  );
}

Promise.all(jobs)
  .then((results) => {
    progress.stop();

    for (const { warnings, filepath } of results) {
      if (warnings.length > 0) {
        console.log(filepath);
        warnings.forEach((warning) => console.log(warning));
      }
    }

    const updateCount = results.filter(({ updated }) => updated).length;

    if (warnings.length > 0) {
      console.warn(
        `Completed with ${warnings.length} warning${
          warnings.length !== 1 ? 's' : ''
        } (see above).`,
      );
    } else if (updateCount > 0) {
      console.log(
        `Successfully updated ${updatedCount} file${
          updateCount !== 1 ? 's' : ''
        }.`,
      );
    } else {
      console.log(`You're up to date!`);
    }
  })
  .finally(() => {
    pool.terminate();
  });
