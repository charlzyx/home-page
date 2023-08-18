import { getYear } from 'date-fns';

import Link from '../link';
import SystemInfo from './system-info';

export default function Footer() {
  return (
    <footer className=" max-w-5xl mx-auto p-3 op-60 mt-8 absolute bottom-2 right-0 left-0">
      <div className="font-300 text-13px flex justify-between items-end w-full">
        <div className="m-0">
          <div className="ml-4px">
            <SystemInfo />
          </div>
          <p className="mt-2">
            <Link> Nothing to fear. </Link>
          </p>
        </div>
        <div className="text-right dark:op-60">
          <div className="custom-bg" />
          <span className="op-100">©&nbsp;{getYear(new Date())} </span>
          PowerBy&nbsp;
          <Link href="https://https://nextjs.org/">Next.js</Link> 
        </div>
      </div>
    </footer>
  );
}
