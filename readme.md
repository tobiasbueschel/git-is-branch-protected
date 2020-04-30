# git-is-branch-protected

[![Build Status](https://img.shields.io/travis/tobiasbueschel/git-is-branch-protected/master.svg?style=flat-square)](https://travis-ci.com/tobiasbueschel/git-is-branch-protected)
[![version](https://img.shields.io/npm/v/git-is-branch-protected.svg?style=flat-square)](http://npm.im/git-is-branch-protected)
[![downloads](https://img.shields.io/npm/dm/git-is-branch-protected.svg?style=flat-square)](http://npm-stat.com/charts.html?package=git-is-branch-protected)
[![codecov](https://img.shields.io/codecov/c/github/tobiasbueschel/git-is-branch-protected.svg?style=flat-square)](https://codecov.io/gh/tobiasbueschel/git-is-branch-protected?branch=master)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![MIT License](https://img.shields.io/npm/l/git-is-branch-protected.svg?style=flat-square)](http://opensource.org/licenses/MIT)

> Checks whether current Git branch is protected

## Install

```
$ npm install git-is-branch-protected
```

## Usage

<!-- prettier-ignore-start -->
```js
const gitIsBranchProtected = require('git-is-branch-protected')

(async () => {
	// currently on "master" branch
	await gitIsBranchProtected()
	//=> true

	await gitIsBranchProtected('master')
	//=> true

	await gitIsBranchProtected('develop')
	//=> true

	await gitIsBranchProtected('feat/add-something')
	//=> false

	await gitIsBranchProtected('develop', ['master'])
	//=> false

	await gitIsBranchProtected('develop', ['master, develop'])
	//=> true

	await gitIsBranchProtected('DEVELOP', ['master, develop'], { caseSensitive: true })
	//=> false
})()
```
<!-- prettier-ignore-end -->

## API

### gitIsBranchProtected([currentBranch], [protectedBranches], [options])

Returns `true` or `false` indicating whether a branch is _protected_.

#### currentBranch

Type: `string`

The name of the current branch. Defaults to check the actual branch name of the current directory.

#### protectedBranches

Type: `Array`<br>
Default: `['master', 'develop']`

Which branches you would like to protect. By default, `master` and `develop` are protected.

#### options

Type: `Object`

##### caseSensitive

Type: `boolean`<br>
Default: `false`

Whether the check should be performed case sensitive.

## Related

- [git-is-branch-protected-cli](https://github.com/tobiasbueschel/git-is-branch-protected-cli) - CLI for this project.
- [git-push-pr](https://github.com/tobiasbueschel/git-push-pr) - Push and open pull request in your default browser.

## License

MIT © [Tobias Büschel](https://github.com/tobiasbueschel)
