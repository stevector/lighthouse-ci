#!/usr/bin/env node
'use strict';

const argv = require('yargs').argv;
const LighthouseCI = require('./lighthouse-ci.js');
const ResultPath = argv.resultspath;
const lhResults = require(ResultPath);
const ReportUrl = argv.reporturl;

const CI = new LighthouseCI(process.env.GITHUB_TOKEN);

const prInfo = {
    repo: process.env.CIRCLE_PROJECT_REPONAME,
    owner: process.env.CIRCLE_PROJECT_USERNAME,
    number: process.env.PR_NUMBER,
    sha: process.env.CIRCLE_SHA1,
    minPassScore: '90'
};

try {
    CI.postLighthouseComment(prInfo, lhResults, ReportUrl);
    CI.assignPassFailToPR(lhResults, prInfo, prInfo);
} catch (err) {
    CI.handleError(err, prInfo);
}
