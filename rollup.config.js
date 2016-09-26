'use strict';

import base from './rollup-base';

const tap = Object.assign(base, {
	entry: 'src/tap.js',
	dest: 'dist/tap.js',
	moduleName: 'Tap'
});

export default tap;
