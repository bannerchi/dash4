#!/usr/bin/env node

const { getBinPath, execute } = require('../lib/process');

execute(`${getBinPath('rimraf')} build dist`);