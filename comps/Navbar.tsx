import styles from '@/styles/Home.module.scss'
import Link from 'next/link';
import Head from "next/head";
import { style } from '@mui/system';

const Navbar = () => {
  return (
    <>
    <Head>
        <title>Student Manager</title>
        <meta name="description" content="Student Manager app" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <nav>
      <div className="logo">
        <h1>Student Manager v1.0</h1>
      </div>
      <Link className={styles.nav} href="/">Home</Link>
      <Link className={styles.nav} href="/about">About</Link>
      <Link className={styles.nav} href="/students/">Student Listing</Link>
    </nav>
    </>
);
}
 
export default Navbar;