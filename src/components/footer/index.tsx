import { useAtom } from 'jotai';

import clsx from 'clsx';

import Link from '../link';

import { themeAtom } from 'src/pages/_app';

export default function Footer() {
  const [themeType] = useAtom(themeAtom);

  return (
    <footer className=" max-w-5xl mx-auto p-3 op-60 mt-8 absolute bottom-2 right-0 left-0">
      <div className="font-300 text-13px flex justify-between items-end w-full">
        <p className="m-0">
          <Link href={process.env.NEXT_PUBLIC_HOME_BLOG || ''}>Blog</Link>
          <Link href={process.env.NEXT_PUBLIC_HOME_TWITTER || ''}>Twitter</Link>
        </p>
        <div className={clsx('text-right ', themeType === 'IDark' && 'op-60')}>
          <div className="custom-bg" />
          <p className="mr-4px mb-1">由<Link href="https://github.com/kahosan/home-page">Home-Page</Link>强力驱动</p>
          <span className="op-100">©&nbsp;{new Date().getFullYear()} </span>
          PowerBy&nbsp;
          <Link href="https://cn.vitejs.dev/">Vite</Link> & <Link href="https://preactjs.com/">Preact</Link>
        </div>
      </div>
    </footer>
  );
}
