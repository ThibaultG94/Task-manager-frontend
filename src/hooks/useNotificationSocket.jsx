import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewNotification } from '../store/feature/notifications.slice';
import { useSocket } from '../context/SocketContext';

const useNotificationSocket = () => {
  const dispatch = useDispatch();
  const { notificationSocket } = useSocket();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (notificationSocket) {
      notificationSocket.on('new_notification', (notification) => {
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        dispatch(addNewNotification(notification));
      });

      return () => {
        notificationSocket.off('new_notification');
      };
    }
  }, [notificationSocket, dispatch]);

  return notifications;
};

export default useNotificationSocket;
