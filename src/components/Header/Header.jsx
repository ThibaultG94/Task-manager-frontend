import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/selectors/userSelectors';
import { useGetUserId } from '../../api/users/useGetUserId';
import { useGetConversations } from '../../api/conversations/useGetConversations';
import HeaderWelcome from './HeaderWelcome';
import HeaderNav from './HeaderNav';
import HeaderNotifications from './Notifications/HeaderNotifications';
import HeaderAvatar from './HeaderAvatar';
import HeaderMessages from './Messages/HeaderMessages';
import useMessageSocket from '../../hooks/useMessageSocket';
import useNotificationSocket from '../../hooks/useNotificationSocket';

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const getConversations = useGetConversations();
  const getUserId = useGetUserId();

  const [userId, setUserId] = useState(null);

  const getId = async () => {
    const id = await getUserId();
    setUserId(id);
  };

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    if (userId) {
      getConversations();
    }
  }, [userId]);

  useMessageSocket();
  const notifications = useNotificationSocket();

  return (
    <header className="h-10 md:h-16 mx-auto py-2 relative w-full">
      <HeaderWelcome currentUser={currentUser} />
      <HeaderNav />
      <div className="absolute flex h-full items-center right-0 top-0">
        {/* <HeaderSearch /> */}
        <div className="flex">
          <HeaderMessages userId={userId} />
          <HeaderNotifications userId={userId} notifications={notifications} />
          <HeaderAvatar currentUser={currentUser} />
        </div>
      </div>
    </header>
  );
};

export default Header;
