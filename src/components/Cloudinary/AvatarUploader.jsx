import React, { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { useAvatar } from '../../context/AvatarContext';
import { useUpdateUserAvatar } from '../../api/users/useUpdateUserAvatar';
import axios from 'axios';

const AvatarUploader = ({ user, inputFileRef }) => {
    const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;
    const { avatarUrl, setAvatarUrl } = useAvatar();
    const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });
    const [img, setImg] = useState(
        cld.image(avatarUrl)
            .format('auto')
            .quality('auto')
            .resize(auto().gravity(autoGravity()).width(150).height(150))
    );

    const updateUserAvatar = useUpdateUserAvatar();

    useEffect(() => {
        if (!img.publicId) setImg(false);
    }, []);

    useEffect(() => {
        if (user && user.avatar) {
            setAvatarUrl(user.avatar);
        }
    }, [user, setAvatarUrl]);

    useEffect(() => {
        if (avatarUrl) {
            const image = cld.image(avatarUrl)
                .format('auto')
                .quality('auto')
                .resize(auto().gravity(autoGravity()).width(150).height(150));
            setImg(image);
        }
    }, [avatarUrl, cld]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/avatars/signature`, {
            withCredentials: true,
        });
        const { signature, timestamp } = response.data;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', API_KEY);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);
        formData.append('transformation', 'c_fill,g_auto,h_150,w_150');

        const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        });

        const uploadResult = await uploadResponse.json();
        if (uploadResult.secure_url) {
            setAvatarUrl(uploadResult.public_id);
            updateUserAvatar(user._id, uploadResult.public_id);
        }
    };

    return (
        <div>
           { img ? <AdvancedImage cldImg={img} /> : (
                <span
                    id="avatarLetter"
                    className="text-light-blue text-2xl sm:text-3xl md:text-4xl">
                    {user?.username[0]}
                </span>
           )}
            <input type="file" ref={inputFileRef} onChange={handleFileUpload} style={{ display: 'none' }} id="fileInput" />
        </div>
    );
};

export default AvatarUploader;
