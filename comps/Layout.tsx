import React, { FC } from "react";
import Footer from "./Footer"
import Navbar from "./Navbar";
// import styles from '@/styles/Home.module.scss';

type MyComponentProps = React.PropsWithChildren<{}>;

const Layout= ({ children, ...props }: MyComponentProps) => {
  return (
    <div className="content">
      <Navbar />
      <div {...props}>
      { children }
      </div>
      <Footer />
    </div>
  );
}
 
export default Layout;