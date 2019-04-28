const gitIsBranchProtected = require('.')
let branch = require('git-branch')
jest.mock('git-branch')

it('should correctly get current branch and check if it is protected', async () => {
  branch.mockReturnValue(Promise.resolve('feat'))
  await expect(gitIsBranchProtected()).resolves.toBe(false)
  branch.mockReturnValue(Promise.resolve('master'))
  await expect(gitIsBranchProtected()).resolves.toBe(true)
  branch.mockReturnValue(Promise.resolve('develop'))
  await expect(gitIsBranchProtected()).resolves.toBe(true)
})

it('should protect "master" by default', async () => {
  await expect(gitIsBranchProtected('master')).resolves.toBe(true)
})

it('should protect "develop" by default', async () => {
  await expect(gitIsBranchProtected('develop')).resolves.toBe(true)
})

it('should not protect other branches by default', async () => {
  await expect(gitIsBranchProtected('feat/add-something')).resolves.toBe(false)
  await expect(gitIsBranchProtected('test/unit-coverage')).resolves.toBe(false)
  await expect(gitIsBranchProtected('fix/critical-bug')).resolves.toBe(false)
  await expect(gitIsBranchProtected('perf/more-juice')).resolves.toBe(false)
  await expect(gitIsBranchProtected('docs/update-readme')).resolves.toBe(false)
})

it('should allow "protectedBranches" to be overriden', async () => {
  await expect(gitIsBranchProtected('develop', ['master'])).resolves.toBe(false)
  await expect(gitIsBranchProtected('develop', ['master', 'develop'])).resolves.toBe(true)
})

it('should work regardless of whether branch name is upper- or lowercase', async () => {
  await expect(gitIsBranchProtected('DEVELOP')).resolves.toBe(true)
  await expect(gitIsBranchProtected('MASTER')).resolves.toBe(true)
  await expect(gitIsBranchProtected('DEVELOP', ['master'])).resolves.toBe(false)
  await expect(gitIsBranchProtected('master', ['MASTER'])).resolves.toBe(true)
})

it('should allow case sensitive checking', async () => {
  await expect(gitIsBranchProtected('DEVELOP', ['master', 'develop'], { caseSensitive: true })).resolves.toBe(false)
  await expect(gitIsBranchProtected('develop', ['master', 'develop'], { caseSensitive: true })).resolves.toBe(true)
})

it('should throw if "branch" is not a string', async () => {
  await expect(gitIsBranchProtected(123)).rejects.toThrow()
})

it('should throw if "protectedBranches" is not an Array of Strings', async () => {
  await expect(gitIsBranchProtected(undefined, {})).rejects.toThrow()
  await expect(gitIsBranchProtected(undefined, 123)).rejects.toThrow()
  await expect(gitIsBranchProtected(undefined, [1, 2, 3])).rejects.toThrow()
})

it('should allow no branch protection', async () => {
  await expect(gitIsBranchProtected('master', [])).resolves.toBe(false)
})
