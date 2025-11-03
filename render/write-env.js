const fs = require('fs');
const path = require('path');

// This script runs during Render's build step.
// It reads process.env.API_URL (or other env vars) and writes a small JS file
// that exposes them at runtime as window.__ENV.

const outPath = path.join(__dirname, '..', 'frontend', 'env.js');

const env = {
  API_URL: process.env.API_URL || ''
};

const content = `window.__ENV = ${JSON.stringify(env)};`;

try {
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`Wrote env to ${outPath}`);
} catch (err) {
  console.error('Failed to write env file', err);
  process.exit(1);
}
