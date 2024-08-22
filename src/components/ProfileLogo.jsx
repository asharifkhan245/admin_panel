import React from 'react'
import ProfileImg from '../assets/images/faces/face1.jpg'
const ProfileLogo = () => {
    return (
        <>
            <div className="space-x-6">
                <img
                    className="inline-block h-11 w-11 rounded-full hover:cursor-pointer"
                    src={ProfileImg}
                    alt="Dan_Abromov"
                />
            </div>

        </>
    )
}

export default ProfileLogo