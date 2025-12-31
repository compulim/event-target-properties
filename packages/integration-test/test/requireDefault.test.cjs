const { EventTargetProperties } = require('event-target-properties');
const { expect } = require('expect');
const { describe, mock, it } = require('node:test');

class MyEventTarget extends EventTarget {
  constructor() {
    super();

    this.#eventTargetProperties = new EventTargetProperties(this);
  }

  #eventTargetProperties;

  get onload() {
    return this.#eventTargetProperties.getProperty('load');
  }

  set onload(value) {
    this.#eventTargetProperties.setProperty('load', value);
  }
}

describe('CommonJS', () => {
  it('should work', () => {
    const eventTarget = new MyEventTarget();
    const onload = mock.fn();

    const event = new CustomEvent('load');

    eventTarget.onload = onload;
    eventTarget.dispatchEvent(event);

    expect(onload.mock.callCount()).toBe(1);
    expect(onload.mock.calls[0].arguments).toEqual([event]);
  });
});
