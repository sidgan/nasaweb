import React, { useEffect } from 'react';

const NotificationContext = React.createContext();

export function NotificationProvider({ children }) {
  useEffect(() => {
    // Ask for notification permission when first loaded
    if (window.Notification && Notification.permission !== 'granted') {
      Notification.requestPermission((status) => {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
  }, []);

  function pushNotification(options = {}) {
    const { title, body, icon, onClick } = options;

    if (window.Notification && Notification.permission !== 'granted') {
      return;
    }

    const notification = new Notification(title, {
      body,
      icon,
    });

    notification.onclick = onClick;

    return notification;
  }

  return (
    <NotificationContext.Provider
      value={{
        pushNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationState() {
  const context = React.useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotficationState must be used within a NavigationProvider'
    );
  }

  return context;
}
