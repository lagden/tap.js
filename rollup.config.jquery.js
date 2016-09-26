'use strict';

import base from './rollup-base';

const jqueryTap = Object.assign(base, {
	entry: 'src/jquery-tap.js',
	dest: 'dist/jquery-tap.js'
});

export default jqueryTap;
