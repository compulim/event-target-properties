/// <reference types="mocha" />

const { EventTargetProperties } = require('event-target-properties');
const { expect } = require('expect');

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
    const onload = (/** @type {Event} */ event) => {
      onload.mock.calls.push(event);
    };

    onload.mock = {
      /** @type {Event[]} */
      calls: []
    };

    const event = new CustomEvent('load');

    eventTarget.onload = onload;
    eventTarget.dispatchEvent(event);

    expect(onload.mock.calls).toEqual([event]);
  });
});
