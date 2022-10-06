import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
		}),
	],
	build: {
		outDir: 'lib',
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'react-use-api',
			formats: ['es', 'umd', 'cjs'],
			fileName: format => `index.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'axios'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
});
