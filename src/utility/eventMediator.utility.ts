/* -----------------------------------
 *
 * Types
 *
 * -------------------------------- */

type EventData = Record<string, string | number | boolean | object | null>;

/* -----------------------------------
 *
 * Registry
 *
 * -------------------------------- */

const registry: Record<string, Function[]> = {};

/** ----------------------------------
 *
 * Publish
 * @param event Event key to publish
 * @param data Relevant payload for event
 *
 * -------------------------------- */

function publish(event: string, data: EventData) {
  const handlers = registry[event] || [];

  handlers.forEach((action) => action(data));
}

/** ----------------------------------
 *
 * Subscribe
 * @param event Event key to subscribe
 * @param action Callback function for event
 * @returns Function to unsubscribe event
 *
 * -------------------------------- */

function subscribe(event: string, action: Function) {
  const handlers = registry[event];

  if (!handlers) {
    registry[event] = [];
  }

  registry[event].push(action);

  return () => unsubscribe(event, action);
}

/** ----------------------------------
 *
 * Unsubcribe
 * @param event Event key to subscribe
 * @param action Callback function for event
 *
 * -------------------------------- */

function unsubscribe(event: string, action: Function) {
  const items = registry[event];

  registry[event] = items?.filter((item) => item !== action) || [];
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { publish, subscribe };
