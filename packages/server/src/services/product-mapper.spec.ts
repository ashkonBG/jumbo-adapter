import {traceDeprecation} from 'node:process';
import test from 'ava';
import {ProductMapper} from './product-mapper.js';

const input: Record<string, string> = {
  sku1: 'gor1',
  sku2: 'gor2',
  sku3: 'gor3',
};

const reversedInput = Object.fromEntries(
  Object.entries(input).map(([k, v]) => [v, k]),
);

test('it should map a jumbo product id to a gorillas product id', async (t) => {
  const jumboRef = 'sku1';
  const gorillasRef = input[jumboRef];

  const sut = new ProductMapper(input);
  const result = await sut.toExternal(jumboRef);

  t.assert(result === gorillasRef);
});

test('it should map a gorillas product id to a jumbo product id', async (t) => {
  const gorillasRef = 'gor2';
  const jumboRef = reversedInput[gorillasRef];

  const sut = new ProductMapper(input);
  const result = await sut.toInternal(gorillasRef);

  t.assert(result === jumboRef);
});

test('it should throw an error when mapping toExternal fails', async (t) => {
  const nonExistingId = 'noop';
  const sut = new ProductMapper(input);

  await t.throwsAsync(sut.toExternal(nonExistingId), {
    message: `Unable to map internal product reference '${nonExistingId}'`,
  });
});

test('it should throw an error when mapping toInternal fails', async (t) => {
  const nonExistingId = 'noop';
  const sut = new ProductMapper(input);

  await t.throwsAsync(sut.toInternal(nonExistingId), {
    message: `Unable to map external product reference '${nonExistingId}'`,
  });
});
