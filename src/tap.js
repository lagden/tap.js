/*!
 * tap.js
 * Copyright (c) 2015 Alex Gibson
 * https://github.com/alexgibson/tap.js/
 * Released under MIT license
 */

'use strict';

class Tap {
	constructor(el) {
		this.el = typeof el === 'object' ? el : document.getElementById(el);
		this.moved = false;
		this.startX = 0;
		this.startY = 0;
		this.hasTouchEventOccured = false;
		this.map = {
			touchstart: 'start',
			mousedown: 'start',
			touchmove: 'move',
			mousemove: 'move',
			touchend: 'end',
			mouseup: 'end',
			touchcancel: 'cancel'
		};
		this.el.addEventListener('touchstart', this, false);
		this.el.addEventListener('mousedown', this, false);
	}

	leftButton(event) {
		if ('buttons' in event) {
			return event.buttons === 1;
		}
		return 'which' in event ? event.which === 1 : event.button === 1;
	}

	start(event) {
		if (event.type === 'touchstart') {
			this.hasTouchEventOccured = true;
			this.el.addEventListener('touchmove', this, false);
			this.el.addEventListener('touchend', this, false);
			this.el.addEventListener('touchcancel', this, false);
		} else if (event.type === 'mousedown' && this.leftButton(event)) {
			this.el.addEventListener('mousemove', this, false);
			this.el.addEventListener('mouseup', this, false);
		}
		this.moved = false;
		this.startX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
		this.startY = event.type === 'touchstart' ? event.touches[0].clientY : event.clientY;
	}

	move(event) {
		const x = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
		const y = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;
		if (Math.abs(x - this.startX) > 10 || Math.abs(y - this.startY) > 10) {
			this.moved = true;
		}
	}

	end(event) {
		let evt;
		this.el.removeEventListener('touchmove', this, false);
		this.el.removeEventListener('touchend', this, false);
		this.el.removeEventListener('touchcancel', this, false);
		this.el.removeEventListener('mouseup', this, false);
		this.el.removeEventListener('mousemove', this, false);
		if (!this.moved) {
			try {
				evt = new window.CustomEvent('tap', {
					bubbles: true,
					cancelable: true
				});
			} catch (err) {
				evt = document.createEvent('Event');
				evt.initEvent('tap', true, true);
			}
			event.stopPropagation();
			if (!event.target.dispatchEvent(evt)) {
				event.preventDefault();
			}
		}
	}

	cancel() {
		this.hasTouchEventOccured = false;
		this.moved = false;
		this.startX = 0;
		this.startY = 0;
	}

	destroy() {
		this.el.removeEventListener('touchstart', this, false);
		this.el.removeEventListener('touchmove', this, false);
		this.el.removeEventListener('touchend', this, false);
		this.el.removeEventListener('touchcancel', this, false);
		this.el.removeEventListener('mousedown', this, false);
		this.el.removeEventListener('mouseup', this, false);
		this.el.removeEventListener('mousemove', this, false);
	}

	handleEvent(event) {
		if (this.map && this.map[event.type]) {
			this[this.map[event.type]](event);
		}
	}
}

export default Tap;
