# My documentation

I made this app to help me with my work and to keep track of my progress.

### other

````mdx showLineNumbers{23}
```ts title="path/to/file.ts" showLineNumbers{23}
// Code here
```
````

````mdx {1,3-6}
```ts {1,3-6}
// Highlight line 1 and line 3 to 6
// Highlight line 1 and line 3 to 6
// Highlight line 1 and line 3 to 6
// Highlight line 1 and line 3 to 6
// Highlight line 1 and line 3 to 6
// Highlight line 1 and line 3 to 6
```
````

### comitlint

#### build

Changes that affect the build system or external dependencies(example scopes: gulp, npm)

Example: `build: update dependencies to fix security vulnerabilities`

#### chore

Changes that do not affect the production code or the tests (example scopes: grunt, eslint, etc.)

Example: `chore: add prettier config file`

#### ci 

Changes to the continuous integration or deployment configuration files and scripts (example scopes: Github Actions, etc.)

Example: `ci: add code coverage report to pipeline`

#### docs

Changes to the documentation only

Example: `docs: update README with installation instructions`

#### feat

A new feature or enhancement

Example: `feat: add search functionality to the app`

#### fix 

A bug fix or a patch

Example: `fix: resolve issue with login form validation`

#### perf

A code change that improves performance

Example: `perf: optimize image loading speed`

#### refactor

A code change that neither fixes a bug nor adds a feature, but improves the code quality or strucure

Example: `refactor: extract common logic into a helper function`

#### revert 

A code change that reverts a previous commit 

Example: `revert: undo breaking changes introduced in commit 123456`

#### style 

A code change that affects the style or formatting, but does not change the functionality  (example scopes: css, scss, html, etc.)

Example: `style: apply consistent indentation and spacing`

#### test

A code change that adds or modifies tests, but does not affect the production code

Example `test: add unit tests for the new search feature`
