const core = require('@actions/core');
const outputs = require('./outputs.json');

/**
 * windUpJob
 * @param result
 * @returns {Promise<void>}
 */
module.exports = async (result) => {
  if (!result) {
    core.debug('No release published.');
    return Promise.resolve();
  }

  const {lastRelease, commits, nextRelease, releases, notes} = result;

  core.debug(`Published ${nextRelease.type} release version ${nextRelease.version} containing ${commits.length} commits.`);

  if (lastRelease.version) {
    core.debug(`The last release was "${lastRelease.version}".`);
  }

  for (const release of releases) {
    core.debug(`The release was published with plugin "${release.pluginName}".`);
  }

  const {version} = nextRelease;
  const [major, minor, patch] = version.split('.');

  // set outputs
  core.setOutput(outputs.new_release_published, 'true');
  core.setOutput(outputs.new_release_version, version);
  core.setOutput(outputs.new_release_major_version, major);
  core.setOutput(outputs.new_release_minor_version, minor);
  core.setOutput(outputs.new_release_patch_version, patch);
  core.setOutput(outputs.release_notes, patch);

  core.exportVariable('NEW_RELEASE_PUBLISHED', 'true');
  core.exportVariable('RELEASE_VERSION', version);
  core.exportVariable('RELEASE_MAJOR', major);
  core.exportVariable('RELEASE_MINOR', minor);
  core.exportVariable('RELEASE_PATCH', patch);
  core.exportVariable('RELEASE_NOTES', notes);
};
