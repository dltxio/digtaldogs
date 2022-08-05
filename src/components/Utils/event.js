// [eventName: string]: (listenerFunction | null)[]
const eventListeners = {};

/**
 * Triggers a new event if it exists.
 * @param {string} event Event name
 * @param {any} params Event parameters
 */
export const triggerEvent = (event, ...params) => {
  const listeners = eventListeners[event];
  if (!Array.isArray(listeners)) return;
  for (let listener of listeners) {
    if (typeof listener !== "function") continue;
    listener(...params);
  }
};

/**
 * Adds a new event listener.
 * @param {string} event Event name
 * @param {function} listener Listener function
 * @returns {number} Event ID
 */
export const addEventListener = (event, listener) => {
  if (!Array.isArray(eventListeners[event])) eventListeners[event] = [];
  return eventListeners[event].push(listener) - 1;
};

/**
 * Unregisters an event listener.
 * @param event
 * @param id
 */
export const removeEventListener = (event, id) => {
  if (!Array.isArray(eventListeners[event]) || typeof id !== "number") return;
  eventListeners[event][id] = null;
};
