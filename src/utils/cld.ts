import { Cloudinary, type CloudinaryImage, type CloudinaryVideo } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

import { AssetKind } from '@/types/asset';

// Create and configure your Cloudinary instance.
export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
  },
});

export const cldInstance = (publicId: string, kind: AssetKind) => {
  return cld[kind](publicId);
};

export const cldInstanceKind = (instance: CloudinaryImage | CloudinaryVideo) => {
  return instance.getResourceType();
};

export const cldUrl = (publicId: string, kind: AssetKind) => {
  return cldInstanceToURL(cld[kind](publicId));
};

export const cldImageUrl = (publicId: string) => {
  return cldInstanceToURL(
    cld.image(publicId).delivery(quality(autoQuality())).delivery(format(autoFormat())),
  );
};

export const cldVideoUrl = (publicId: string) => {
  return cldInstanceToURL(
    cld.video(publicId).delivery(quality(autoQuality())).delivery(format('auto:video')),
  );
};

export const cldVideoPosterUrl = (publicId: string) => {
  return cldInstanceToURL(
    cld.video(publicId).delivery(quality(autoQuality())).delivery(format(autoFormat())),
  );
};

export const cldInstanceToURL = (instance: CloudinaryImage | CloudinaryVideo) => {
  // Remove query string from URL to prevent hydration mismatch.
  return instance.toURL().split('?')[0];
};
