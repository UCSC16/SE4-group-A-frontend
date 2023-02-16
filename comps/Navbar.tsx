import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import Head from "next/head";

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
        <h1>Student Manager v1</h1>
      </div>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/students/">Student Listing</Link>
    </nav>
    </>
);
}
 
export default Navbar;