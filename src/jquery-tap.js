/*!
 * jQuery special event "tap" using tap.js
 * Released under MIT license
 */

/* eslint import/no-extraneous-dependencies: 0 */
'use strict';

import $ from 'jquery';
import Tap from './tap';

function tap() {
	if (!document.addEventListener) {
		return {
			bindType: 'click',
			delegateType: 'click'
		};
	}
	const dataKey = 'tap.js';
	return {
		setup() {
			$.data(this, dataKey, new Tap(this));
			return false;
		},
		teardown() {
			const tap = $.data(this, dataKey);
			if (tap && tap.destroy) {
				tap.destroy();
				$.removeData(this, dataKey);
			}
			return false;
		}
	};
}

$.event.special.tap = tap();
