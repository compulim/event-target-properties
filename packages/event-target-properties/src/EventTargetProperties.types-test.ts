import { EventTargetProperties } from './index.ts';

const attrs = new EventTargetProperties<
  'click' | 'load',
  {
    click: CustomEvent<'click'>;
    load: CustomEvent<'load'>;
  }
>(new EventTarget());

attrs.getProperty('click') satisfies ((event: CustomEvent<'click'>) => void) | undefined;
// @ts-expect-error Type 'CustomEvent<"load">' is not assignable to type 'CustomEvent<"click">'.
attrs.getProperty('click') satisfies ((event: CustomEvent<'load'>) => void) | undefined;

attrs.getProperty('load') satisfies ((event: CustomEvent<'load'>) => void) | undefined;
// @ts-expect-error Type 'CustomEvent<"click">' is not assignable to type 'CustomEvent<"load">'.
attrs.getProperty('load') satisfies ((event: CustomEvent<'click'>) => void) | undefined;

attrs.setProperty('click', (_event: CustomEvent<'click'>): void => {});
// @ts-expect-error Type 'CustomEvent<"click">' is not assignable to type 'CustomEvent<"load">'.
attrs.setProperty('click', (_event: CustomEvent<'load'>): void => {});
attrs.setProperty('click', null);
attrs.setProperty('click', undefined);

attrs.setProperty('load', (_event: CustomEvent<'load'>): void => {});
// @ts-expect-error Type 'CustomEvent<"load">' is not assignable to type 'CustomEvent<"click">'.
attrs.setProperty('load', (_event: CustomEvent<'click'>): void => {});
attrs.setProperty('load', null);
attrs.setProperty('load', undefined);
