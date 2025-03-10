"use client";

const dispatchEventByName = (eventName: string) => {
  const event = new Event(eventName);
  window.dispatchEvent(event);
};

const addEventListenerByName = (
  eventName: string,
  callback: (e: Event) => void
) => {
  const handleEvent = (e: Event) => {
    if (e.type === eventName) {
      callback(e);
    }
  };

  window.addEventListener(eventName, handleEvent);

  // クリーンアップ関数を返す
  return () => {
    window.removeEventListener(eventName, handleEvent);
  };
};

/**
  const cleanup = addEventListenerByName("<eventName>", () => {
    // イベント発火時に実行したいもの
  });
    
  return () => {
    cleanup();
  };
*/

export { dispatchEventByName, addEventListenerByName };
