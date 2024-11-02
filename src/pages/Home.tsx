import { Figure } from '@/components/Figure';
import { ImageBase } from '@/components/ImageBase';
import { LazyImage } from '@/components/LazyImage';
import { Link } from '@/components/Link';
import { PhotoProps } from '@/types/media';
import { cldImageUrl, cldUrl } from '@/utils/cld';

const photos: PhotoProps[] = [
  {
    publicId: 'm-sixteen/debut-ep/eragny',
    format: 'jpg',
    width: 218,
    height: 290,
    kind: 'image',
    placeholder: '125,113,115',
    alt: 'live at Eragny',
    caption: 'live at Eragny',
  },
  {
    publicId: 'm-sixteen/debut-ep/poseur2',
    format: 'jpg',
    width: 400,
    height: 300,
    kind: 'image',
    placeholder: '147,139,127',
    alt: 'poseur at Nice',
    caption: 'poseur at Nice',
  },
  {
    publicId: 'm-sixteen/debut-ep/isleadan_13',
    format: 'jpg',
    width: 350,
    height: 240,
    kind: 'image',
    placeholder: '49,47,58',
    alt: 'first live Isleadan',
    caption: 'first live @Isleadan 2001',
  },
  {
    src: '/static/photos/hogsteen/img-1-md.jpg',
    width: 567,
    height: 377,
    publicId: 'photos/hogsteen/img-1-md.jpg',
    placeholder: '129,131,142',
    format: 'jpg',
    kind: 'image',
  },
  {
    src: '/static/photos/furia/img-2-md.jpg',
    width: 436,
    height: 291,
    publicId: 'photos/furia/img-2-md.jpg',
    placeholder: '162,159,155',
    format: 'jpg',
    kind: 'image',
  },
  {
    width: 512,
    height: 341,
    publicId: 'm-sixteen/videos/rouge',
    placeholder: '162,159,155',
    format: 'jpg',
    kind: 'image',
  },
];

export function Home() {
  return (
    <div>
      <h4>homepage</h4>
      <ul>
        <li>
          <Link href="/releases/debut-ep">debut-ep</Link>
        </li>
        <li>
          <Link href="/moments/early-years">early-years</Link>
        </li>
      </ul>
      <div>
        <ImageBase
          src={cldUrl(photos[0].publicId, photos[0].kind)}
          alt={photos[0].alt}
        />
        <Figure caption={photos[1].caption}>
          <LazyImage
            data-src={cldImageUrl(photos[1].publicId)}
            height={photos[1].height}
            width="auto"
            placeholder={photos[1].placeholder}
            alt={photos[1].alt}
            style={{
              aspectRatio: `${photos[1].width}/${photos[1].height}`,
            }}
          />
        </Figure>
      </div>
    </div>
  );
}
