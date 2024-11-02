//
// Env
// --------------------------------------------------

export const ENV_IS_DEV = import.meta.env.MODE === 'development';
export const ENV_IS_PROD = import.meta.env.MODE === 'production';
export const ENV_BASE_URL = import.meta.env.BASE_URL;
export const ENV_CANONICAL_URL = import.meta.env.VITE_APP_CANONICAL;
export const ENV_PUBLIC_URL = import.meta.env.BASE_URL; // TODO: Change to concatenate with VITE_APP_CANONICAL + BASE_URL

const baseUrl = new URL(ENV_BASE_URL, ENV_CANONICAL_URL);

export const ENV_BASE_URL_OBJECT = new URL(baseUrl);
export const ENV_BASE_URL_HREF = ENV_BASE_URL_OBJECT.href;
export const ENV_BASE_URL_ORIGIN = ENV_BASE_URL_OBJECT.origin;
export const ENV_BASE_URL_PATHNAME = ENV_BASE_URL_OBJECT.pathname;

//
// Cloudinary
// --------------------------------------------------

export const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/m-sixteen/';
export const CLOUDINARY_IMAGE_BASE_URL = `${CLOUDINARY_BASE_URL}image/upload/`;
export const CLOUDINARY_VIDEO_BASE_URL = `${CLOUDINARY_BASE_URL}video/upload/`;
export const CLOUDINARY_IMAGE_OPTIMIZED_URL = `${CLOUDINARY_IMAGE_BASE_URL}f_auto,q_auto/v1/`;
export const CLOUDINARY_VIDEO_OPTIMIZED_URL = `${CLOUDINARY_VIDEO_BASE_URL}f_auto:video,q_auto/v1/`;
