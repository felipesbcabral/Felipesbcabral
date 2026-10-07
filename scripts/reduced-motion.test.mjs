import assert from 'node:assert/strict';
import { addReducedMotion } from './reduced-motion.mjs';

const original = '<svg xmlns="http://www.w3.org/2000/svg"><rect id="real-data" width="2"/></svg>';
const result = addReducedMotion(original);
assert.ok(result.includes('<rect id="real-data" width="2"/>'));
assert.ok(result.includes('@media (prefers-reduced-motion: reduce){*{animation:none!important}}'));
assert.equal(addReducedMotion(result), result);
assert.throws(() => addReducedMotion('<html>API failure</html>'), /refusing/);
console.log('PASS: SVG data preserved, reduced motion enabled, idempotent, invalid input rejected.');
