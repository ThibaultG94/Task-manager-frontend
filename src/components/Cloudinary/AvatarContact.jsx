import React, { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

const AvatarContact = ({ user }) => {
    const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

    const [avatarUrl, setAvatarUrl] = useState();

    const [img, setImg] = useState(cld
        .image(avatarUrl)
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(150).height(150)));

        useEffect(() => {
            if (user?.avatar) {
                setAvatarUrl(user.avatar);
            }
        }, [user]);

        useEffect(() => {
            if (avatarUrl) {
                const image = cld
                    .image(avatarUrl)
                    .format('auto')
                    .quality('auto')
                    .resize(auto().gravity(autoGravity()).width(200).height(200));
                setImg(image);
            }
        }, [avatarUrl]);

    return (
        <div className="h-8 w-8">
            {img && <AdvancedImage
                cldImg={img}
                className="w-full h-full object-cover rounded-full"
            /> }           
        </div>
    );
};

export default AvatarContact;