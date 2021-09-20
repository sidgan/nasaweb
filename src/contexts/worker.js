import React, { useRef } from 'react';

const WorkerContext = React.createContext();

export function WorkerProvider({ children }) {
  const workMapRef = useRef(new Map());

  function enqueueWork(id, fn, interval = 500, callbacks) {
    if (workMapRef.current.get(id)) {
      throw new Error(`Work ${id} already enqueued`);
    }

    const { onInProgress, onComplete, onError } = callbacks;

    const intervalId = setInterval(() => {
      fn()
        .then((data) => {
          const { complete } = data;

          if (complete) {
            onComplete();
            return;
          }

          onInProgress(data);
        })
        .catch((error) => {
          if (onError) {
            onError(error);
          }
        });
    }, interval);

    workMapRef.current.set(id, intervalId);

    console.log(`Work ${id} enqueued`);
  }

  function dequeueWork(id) {
    if (!workMapRef.current.get(id)) {
      throw new Error(`Work ${id} not found`);
    }

    const intervalId = workMapRef.current.get(id);

    clearInterval(intervalId);

    workMapRef.current.set(id, null);

    console.log(`Work ${id} dequeued`);
  }

  return (
    <WorkerContext.Provider
      value={{
        enqueueWork,
        dequeueWork,
      }}
    >
      {children}
    </WorkerContext.Provider>
  );
}

export function useWorkerState() {
  const context = React.useContext(WorkerContext);

  if (!context) {
    throw new Error('useWorkerState must be used within a WorkerProvider');
  }

  return context;
}
