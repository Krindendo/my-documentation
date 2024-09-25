'use strict';

import diffLanguage from 'shiki/langs/diff.mjs';
import dockerLanguage from 'shiki/langs/docker.mjs';
import javaScriptLanguage from 'shiki/langs/javascript.mjs';
import jsonLanguage from 'shiki/langs/json.mjs';
import JSXLanguage from 'shiki/langs/jsx.mjs';
import powershellLanguage from 'shiki/langs/powershell.mjs';
import shellScriptLanguage from 'shiki/langs/shellscript.mjs';
import shellSessionLanguage from 'shiki/langs/shellsession.mjs';
import TSXLanguage from 'shiki/langs/tsx.mjs';
import vueLanguage from 'shiki/langs/vue.mjs';
import cssLanguage from 'shiki/langs/css.mjs';
import sqlLanguage from 'shiki/langs/sql.mjs';
import typeScriptLanguage from 'shiki/langs/typescript.mjs';
import shikiDarkPlusTheme from 'shiki/themes/dark-plus.mjs';

/** @type {Array<import('shiki').LanguageRegistration>} */
export const LANGUAGES = [
  {
    ...javaScriptLanguage[0],
    aliases: javaScriptLanguage[0].aliases.concat('cjs', 'mjs'),
  },
  ...jsonLanguage,
  ...typeScriptLanguage,
  ...shellScriptLanguage,
  ...powershellLanguage,
  ...shellSessionLanguage,
  ...dockerLanguage,
  ...diffLanguage,
  ...JSXLanguage,
  ...TSXLanguage,
  ...vueLanguage,
  ...cssLanguage,
  ...sqlLanguage,
];

// This is the default theme we use for our Shiki Syntax Highlighter
export const DEFAULT_THEME = {
  ...shikiDarkPlusTheme,
};
