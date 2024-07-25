"use strict"

import diffLanguage from "shiki/langs/diff.mjs"
import dockerLanguage from "shiki/langs/docker.mjs"
import javaScriptLanguage from "shiki/langs/javascript.mjs"
import jsonLanguage from "shiki/langs/json.mjs"
import JSXLanguage from "shiki/langs/jsx.mjs"
import powershellLanguage from "shiki/langs/powershell.mjs"
import shellScriptLanguage from "shiki/langs/shellscript.mjs"
import shellSessionLanguage from "shiki/langs/shellsession.mjs"
import TSXLanguage from "shiki/langs/tsx.mjs"
import typeScriptLanguage from "shiki/langs/typescript.mjs"
import shikiDarkPlusTheme from "shiki/themes/dark-plus.mjs"

/** @type {Array<import('shiki').LanguageRegistration>} */
export const LANGUAGES = [
  {
    ...javaScriptLanguage[0],
    scopeName: "source.js",
    aliases: ["mjs", "cjs", "js"],
    displayName: "JavaScript",
  },
  {
    ...jsonLanguage[0],
    scopeName: "source.json",
    displayName: "JSON",
  },
  {
    ...typeScriptLanguage[0],
    scopeName: "source.ts",
    aliases: ["ts"],
    displayName: "TypeScript",
  },
  {
    ...shellScriptLanguage[0],
    scopeName: "source.shell",
    aliases: ["bash", "sh", "shell", "zsh"],
    displayName: "Bash",
  },
  {
    ...powershellLanguage[0],
    scopeName: "source.powershell",
    aliases: ["ps", "ps1"],
    displayName: "PowerShell",
  },
  {
    ...shellSessionLanguage[0],
    scopeName: "text.shell-session",
    aliases: ["console"],
    displayName: "Bash",
  },
  {
    ...dockerLanguage[0],
    scopeName: "source.dockerfile",
    aliases: ["dockerfile"],
    displayName: "Dockerfile",
  },
  {
    ...diffLanguage[0],
    scopeName: "source.diff",
    displayName: "Diff",
  },
  {
    ...JSXLanguage[0],
    scopeName: "source.jsx",
    displayName: "JSX",
  },
  {
    ...TSXLanguage[0],
    scopeName: "source.tsx",
    displayName: "TSX",
  },
]

// This is the default theme we use for our Shiki Syntax Highlighter
export const DEFAULT_THEME = {
  ...shikiDarkPlusTheme,
}
