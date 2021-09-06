import React, { useEffect } from 'react';

const WorkerContext = React.createContext();

export function WorkerProvider({ children }) {
  useEffect(() => {
    // console.log()
    if (!window.Worker) {
      return;
    }

    // const TaskWorker = new Worker('workers/timeline-view-worker.js');
  }, []);

  return (
    <WorkerContext.Provider>
      {children}
    </WorkerContext.Provider>
  )
}

export function useWorkerState() {
  const context = React.useContext(WorkerContext);

  if (!context) {
    throw new Error('useWorkerState must be used within a WorkerProvider');
  }

  return context;
}
