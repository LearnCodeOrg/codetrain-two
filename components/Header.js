import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <Link href="/">
        <a>
          <Image
            src="/img/logo.png"
            width="48"
            height="48"
            quality="100"
          />
        </a>
      </Link>
      <h1>Codetrain</h1>
      <Link href="/create">
        <a>Create</a>
      </Link>
    </div>
  );
}
