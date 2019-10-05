import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as bufferutils from '../src/bufferutils';

import * as fixtures from './fixtures/bufferutils.json';

describe('bufferutils', () => {
  describe('readUInt64LE', () => {
    fixtures.valid.forEach(f => {
      it('decodes ' + f.hex, () => {
        const buffer = Buffer.from(f.hex, 'hex');
        const num = bufferutils.readUInt64LE(buffer, 0);

        assert.strictEqual(num, f.dec);
      });
    });

    fixtures.invalid.readUInt64LE.forEach(f => {
      it('throws on ' + f.description, () => {
        const buffer = Buffer.from(f.hex, 'hex');

        assert.throws(() => {
          bufferutils.readUInt64LE(buffer, 0);
        }, new RegExp(f.exception));
      });
    });
  });

  describe('writeUInt64LE', () => {
    fixtures.valid.forEach(f => {
      it('encodes ' + f.dec, () => {
        const buffer = Buffer.alloc(8, 0);

        bufferutils.writeUInt64LE(buffer, f.dec, 0);
        assert.strictEqual(buffer.toString('hex'), f.hex);
      });
    });

    fixtures.invalid.readUInt64LE.forEach(f => {
      it('throws on ' + f.description, () => {
        const buffer = Buffer.alloc(8, 0);

        assert.throws(() => {
          bufferutils.writeUInt64LE(buffer, f.dec, 0);
        }, new RegExp(f.exception));
      });
    });
  });
});
