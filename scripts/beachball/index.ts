import { BeachballConfig } from 'beachball';
import { getAllPackageInfo } from '../monorepo/index';
import { writeFile } from 'fs-extra';
const path = require('path');
// import { renderHeader, renderEntry } from './customRenderers';

const allPackageInfo = getAllPackageInfo();
const fluentConvergedPackagePaths = Object.values(allPackageInfo)
  .map(packageInfo => {
    if (packageInfo.packageJson.version.startsWith('9.')) {
      return packageInfo.packagePath;
    }

    const hardCoded = ['perf-test', 'vr-tests'];

    if (hardCoded.includes(packageInfo.packageJson.name)) {
      return packageInfo.packagePath;
    }

    return false;
  })
  .filter(Boolean) as string[];

const ignoreFluentConvergedScope = fluentConvergedPackagePaths.map(path => `!${path}`);
// Northstar is never published with beachball
const northstarScope = '!packages/fluentui/*';

// Default scope used to publish Fluent UI v8
const defaultScope = [northstarScope, ...ignoreFluentConvergedScope];

export const config: BeachballConfig = {
  disallowedChangeTypes: ['major', 'prerelease'],
  tag: 'latest',
  generateChangelog: true,
  gitTags: false,
  registry:
    'https://uifabric.pkgs.visualstudio.com/4ed167b9-ac3a-405b-b967-443af8db8961/_packaging/ling-test1/npm/registry/',
  // @ts-ignore
  scope: process.env.RELEASE_VNEXT ? fluentConvergedPackagePaths : defaultScope,
  hooks: {
    prepublish: packagePath => {
      const authToken = process.env.ADO_TOKEN;
      return writeFile(
        path.join(packagePath, '.npmrc'),
        `
; begin auth token
//uifabric.pkgs.visualstudio.com/4ed167b9-ac3a-405b-b967-443af8db8961/_packaging/ling-test1/npm/registry/:username=uifabric
//uifabric.pkgs.visualstudio.com/4ed167b9-ac3a-405b-b967-443af8db8961/_packaging/ling-test1/npm/registry/:_password=${authToken}
//uifabric.pkgs.visualstudio.com/4ed167b9-ac3a-405b-b967-443af8db8961/_packaging/ling-test1/npm/registry/:email=npm requires email to be set but doesn't use the value
//uifabric.pkgs.visualstudio.com/4ed167b9-ac3a-405b-b967-443af8db8961/_packaging/ling-test1/npm/:username=uifabric
//uifabric.pkgs.visualstudio.com/4ed167b9-ac3a-405b-b967-443af8db8961/_packaging/ling-test1/npm/:_password=${authToken}
//uifabric.pkgs.visualstudio.com/4ed167b9-ac3a-405b-b967-443af8db8961/_packaging/ling-test1/npm/:email=npm requires email to be set but doesn't use the value
; end auth token
      `,
      );
    },
  },
  changelog: {
    // customRenderers: {
    //   renderHeader,
    //   renderEntry,
    // },
    groups: [
      {
        masterPackageName: '@fluentui/react-components',
        changelogPath: 'packages/react-components',
        include: fluentConvergedPackagePaths,
      },
    ],
  },
};
