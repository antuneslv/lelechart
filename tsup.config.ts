import { defineConfig } from 'tsup'

export default defineConfig({
  dts: true,
  format: ['esm', 'cjs'],
  esbuildOptions(options) {
    options.define = {
      'process.env.NODE_ENV': JSON.stringify('development'),
    }
    options.banner = {
      js: '"use client"',
    }
  },
})
