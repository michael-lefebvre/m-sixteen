import { Figure } from '@/components/Figure';
import { ImageBase } from '@/components/ImageBase';
import { LazyImage } from '@/components/LazyImage';
import { Link } from '@/components/Link';
import { getPhotoByPublicId } from '@/contents/photos';
import { momentFromId } from '@/mdx/moments';
import { releaseFromId } from '@/mdx/releases';
import { cldImageUrl, cldUrl } from '@/utils/cld';

const TestImageBase = () => {
  const photo = getPhotoByPublicId('m-sixteen/debut-ep/eragny');
  return (
    <ImageBase
      src={cldUrl(photo.publicId, photo.kind)}
      alt={photo.alt}
    />
  );
};

const TestLazyImage = () => {
  const photo = getPhotoByPublicId('m-sixteen/debut-ep/eragny');
  return (
    <Figure caption={photo.caption}>
      <LazyImage
        data-src={cldImageUrl(photo.publicId)}
        height={photo.height}
        width="auto"
        placeholder={photo.placeholder}
        alt={photo.alt}
        style={{
          aspectRatio: `${photo.width}/${photo.height}`,
        }}
      />
    </Figure>
  );
};

export function Home() {
  const { path: epPath } = releaseFromId('ep');
  const { path: momentPath } = momentFromId('earlyyears');

  return (
    <div>
      <h4>homepage</h4>
      <ul>
        <li>
          <Link href={epPath}>debut-ep</Link>
        </li>
        <li>
          <Link href={momentPath}>early-years</Link>
        </li>
      </ul>
      <div>
        <TestImageBase />
        <TestLazyImage />
      </div>
    </div>
  );
}
