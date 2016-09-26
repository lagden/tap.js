import buble from 'rollup-plugin-buble';

const base = {
	format: 'umd',
	plugins: [
		buble()
	],
	sourceMap: true
};

export default base;
