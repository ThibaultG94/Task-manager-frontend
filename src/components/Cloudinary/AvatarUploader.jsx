import React, { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { useAvatar } from '../../context/AvatarContext';
import { useUpdateUserAvatar } from '../../api/users/useUpdateUserAvatar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectCheckAvatar, selectIsUserLoggedIn } from '../../store/selectors/userSelectors';
import { setCheckAvatar } from '../../store/feature/users.slice';

const AvatarUploader = ({ user, inputFileRef }) => {
    const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;
    const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });
    const dispatch = useDispatch();

    const { avatarUrl, setAvatarUrl } = useAvatar();
    const updateUserAvatar = useUpdateUserAvatar();
    const checkAvatar = useSelector(selectCheckAvatar);
    const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

    const [img, setImg] = useState(cld
        .image(avatarUrl)
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(200).height(200)));

    useEffect(() => {
        if (user?.avatar) {
            setAvatarUrl(user.avatar);
        } else {
            setImg(false);
        }
    }, [user]);

    useEffect(() => {
        if (!checkAvatar && user?.avatar) {
            setAvatarUrl(user.avatar);
            dispatch(setCheckAvatar(true));
        }
    }, [checkAvatar]);

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

    useEffect(() => {
        if (!isUserLoggedIn) {
            setAvatarUrl(null);
            setImg(false);
        }
    }, [isUserLoggedIn]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/avatars/signature`,
            {
                withCredentials: true,
            }
        );
        const { signature, timestamp } = response.data;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', API_KEY);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);
        formData.append('transformation', 'c_fill,g_auto,h_200,w_200');

        const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const uploadResult = await uploadResponse.json();
        if (uploadResult.secure_url) {
            setAvatarUrl(uploadResult.public_id);
            updateUserAvatar(user._id, uploadResult.public_id);
        }
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {img && <AdvancedImage
                cldImg={img}
                className="absolute z-10 w-full h-full object-cover rounded-full"
            />}
            <input
                type="file"
                ref={inputFileRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="fileInput"
            />
        </div>
    );
};

export default AvatarUploader;
