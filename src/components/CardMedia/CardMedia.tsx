import React, { FC } from "react";
import { getMimeTypeFromBase64 } from "../../utils/mime"

interface CardMediaProps {
    projectName: string,
    media: string | null
}

const CardMedia: FC<CardMediaProps> = ({ projectName, media }) => {
    if (!media) return null;
    if (media.startsWith('https://') || media.startsWith('http://')) {
        if (media.startsWith("http://")) {
            console.groupCollapsed(`%c Media for "${projectName}" is unsecured`, 'font-weight: bold; color: yellow');
            console.warn(new Error().stack);
            console.groupEnd();
        }
        console.log("getting media resource through url: ", media)
        const urlObj = new URL(media);
        const filename = urlObj.pathname.split('/').pop();
        const mediaType = filename?.split('.').pop()
        console.log("media type: ", mediaType)
        switch(mediaType) {
            case 'mp4':
                return(
                    <video controls>
                        <source src={media} type="video/mp4"/>
                        Your browser does not support the video tag
                    </video>
                )
            case 'png':
            case 'jpeg':
            case 'jpg':
            case 'gif':
            case 'webp':
            case 'bmp':
                return(
                    <div className={`relative flex flex-col border-2 border-blue-500 dark:border-gray-300 rounded-md transition-colors duration-200`}>
                        <img src={media} alt={`${projectName} Image`} />
                    </div>
                )
            default:
                console.groupCollapsed(`%c Media for "${projectName}" has an invalid extension: ${mediaType}`, 'font-weight: bold; color: yellow');
                console.warn(new Error().stack);
                console.groupEnd();
                return(
                    <React.Fragment />
                )
        }
    } else {
        // see if media is of type base64
        const cleanBase64 = media.replace(/^data:.*?;base64,/, '');
    
        const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
        if (!base64Regex.test(cleanBase64) || cleanBase64.length % 4 !== 0) {
            console.error(`%c Media for "${projectName}" has an invalid value`, 'font-weight: bold; color: yellow');
            return(
                <div
                  className={`flex flex-col items-center justify-center border-2 border-blue-500 dark:border-dashed dark:border-gray-300 rounded-lg transition-colors duration-200`}
                >
                  <p className="text-red-500">Media file is invalid</p>
                </div>
            )
        }

        const mimeType = getMimeTypeFromBase64(media);
        if (!mimeType) {
            console.error('Invalid base64 string - cannot decode');
            return(
                <div
                  className={`flex flex-col items-center justify-center border-2 border-blue-500 dark:border-dashed dark:border-gray-300 rounded-lg transition-colors duration-200`}
                >
                  <p className="text-red-500">Media file is invalid</p>
                </div>
            )
        }
        console.log(`Media for "${projectName}" has been decoded as ${mimeType}`);
        return(
            <div className={`relative flex flex-col border-2 border-blue-500 dark:border-gray-300 rounded-md transition-colors duration-200`}>
                <img src={`data:${mimeType};base64,${cleanBase64}`} alt={`${projectName} Image`} />
            </div>
        )
    }
}

export default CardMedia