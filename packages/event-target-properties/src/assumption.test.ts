import { expect } from 'expect';
import { mock, test } from 'node:test';

test('assume EventTarget do not natively support property-based event listener', () => {
  const eventTarget = new EventTarget();
  const onload = mock.fn();

  (eventTarget as any).onload = onload;
  eventTarget.dispatchEvent(new CustomEvent('load'));

  expect(onload.mock.callCount()).toBe(0);
});
