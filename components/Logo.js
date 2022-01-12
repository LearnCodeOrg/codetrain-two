import { useState } from 'react';

const logo = '/img/logo.png';
const logoalt = '/img/logoalt.png';

export default function Logo() {
  const [src, setSrc] = useState(logo);

  return (
    <img
      src={src}
      onMouseEnter={() => setSrc(logoalt)}
      onMouseLeave={() => setSrc(logo)}
      width="48"
      height="48"
    />
  );
}
