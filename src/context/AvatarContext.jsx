import React, { createContext, useContext, useState } from 'react';

const AvatarContext = createContext(null);

export const useAvatar = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);

    return (
        <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl }}>
            {children}
        </AvatarContext.Provider>
    );
};
