import test from 'node:test';
import assert from 'node:assert/strict';
import { readSaved, writeSaved, buildInquiry } from '../lib/store.js';

test('ignores corrupted, non-list, duplicate, and unknown saved values', () => {
  assert.deepEqual(readSaved({getItem:()=>'{broken'}), []);
  assert.deepEqual(readSaved({getItem:()=>'null'}), []);
  assert.deepEqual(readSaved({getItem:()=>'["rings","unknown","rings",null,"earrings"]'}), ['rings','earrings']);
});
test('browser storage failures remain recoverable', () => {
  const blocked = {getItem(){throw new Error('blocked')},setItem(){throw new Error('quota')}};
  assert.deepEqual(readSaved(blocked), []);
  assert.equal(writeSaved(['rings'],blocked), false);
});
test('only known unique collection identifiers are persisted', () => {
  let result;
  assert.equal(writeSaved(['rings','rings','<script>','bracelets'], {setItem:(_key,value)=>{result=value}}), true);
  assert.deepEqual(JSON.parse(result), ['rings','bracelets']);
});
test('sell inquiry is explicitly unsent and purity is unverified', () => {
  const draft = buildInquiry('sell', {name:'  Sample Customer  ',type:'Ring',gold:'18K, 5g',message:'Please value this ring.'});
  assert.match(draft, /This draft has not been sent/);
  assert.match(draft, /Name: Sample Customer/);
  assert.match(draft, /Purity \/ weight \(unverified\): 18K, 5g/);
  assert.match(draft, /subject to inspection and verification/);
});
test('optional personal details are omitted and inquiry length is bounded', () => {
  const draft = buildInquiry('contact', {name:' ',message:'x'.repeat(2500)});
  assert.doesNotMatch(draft, /Name:/);
  assert.equal(draft.split('\n').at(-1).length,2000);
  assert.doesNotMatch(draft, /Purity/);
});
