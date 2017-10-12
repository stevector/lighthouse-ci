'use strict';

const LighthouseCI = require('./lighthouse-ci.js');

const GITHUB_PENDING_STATUS = {
    state: 'pending',
    description: 'Auditing PR changes...'
};

const CI = new LighthouseCI(process.env.GITHUB_TOKEN);

const prInfo = {
    repo: process.env.CIRCLE_PROJECT_REPONAME,
    owner: process.env.CIRCLE_PROJECT_USERNAME,
    number: process.env.PR_NUMBER,
    sha: process.env.CIRCLE_SHA1,
    minPassScore: '90'
};

try {
    const status = Object.assign({}, prInfo, GITHUB_PENDING_STATUS);
    CI.updateGithubStatus(status);
} catch (err) {
    CI.handleError(err, prInfo);
}
