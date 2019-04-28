'use strict'
const gitBranch = require('git-branch')

module.exports = async (branch, branches, options = {}) => {
  // 1. Check if "branch" is present and a String, otherwise get current branch
  let currentBranch = branch
  if (currentBranch) {
    if (typeof currentBranch !== 'string') {
      throw new TypeError(`Expected a String, got ${typeof branch}`)
    }
  } else {
    currentBranch = await gitBranch()
  }

  // 2. Check if "branches" is an Array of Strings, otherwise use default
  let protectedBranches = branches
  if (protectedBranches) {
    if (protectedBranches instanceof Array) {
      const containsOnlyStrings = protectedBranches.every(b => typeof b === 'string')
      if (!containsOnlyStrings) {
        throw new TypeError(`"protectedBranches" Array needs to only contain Strings`)
      }
    } else {
      throw new TypeError('"protectedBranches" needs to be an Array of Strings')
    }
  } else {
    protectedBranches = ['master', 'develop']
  }

  // 3. Convert to lowercase / uppercase if not case sensitive
  const isCaseSensitive = options.caseSensitive || false
  if (!isCaseSensitive) {
    currentBranch = currentBranch.toLowerCase()
    protectedBranches = protectedBranches.map(b => b.toLowerCase())
  }

  // 4. Check if current branch is included in protected branches
  return protectedBranches.includes(currentBranch)
}
