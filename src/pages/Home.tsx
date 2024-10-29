import { Link } from '@/components/Link';

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
    </div>
  );
}
