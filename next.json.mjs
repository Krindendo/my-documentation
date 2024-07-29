'use strict';

import _siteRedirects from './redirects.json' assert { type: 'json' };

/** @type {Record<string, Array<import('./types').Redirect>>} */
export const siteRedirects = _siteRedirects;
