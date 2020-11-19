#!/usr/bin/env node

// Node.js v10+ only

'use strict';

require('essentials');

const argv = require('yargs-parser')(process.argv.slice(2), {
  boolean: ['help', 'legacy'],
  alias: { help: 'h' },
});

const [versionTag] = argv._;

const usage = `Usage: ./scripts/pkg/upload.js [-h | --help] <versionTag>

Uploads binary files found in ./dist folder into GitHub release.
Github OAuth token is expected to be exposed at GITHUB_TOKEN env var

Options:

    --help,   -h  Show this message
`;

if (argv.help) {
  process.stdout.write(usage);
  return;
}

if (!versionTag) {
  process.stdout.write(usage);
  return;
}

if (!/^v\d+\.\d+\.\d+$/.test(versionTag)) {
  const chalk = require('chalk');
  process.stdout.write(chalk.red(`Invalid version tag: ${versionTag}\n`));
  process.exitCode = 1;
  return;
}

require('./world')(versionTag, { isLegacyVersion: argv.legacy });
require('./china')(versionTag, { isLegacyVersion: argv.legacy });
