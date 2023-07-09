import styles from "../../../styles/BlogAd.module.css";
import NavbarAd from "../../../components/NavbarAd";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Blogs from "../../../components/Blogs";
import { useRef, useEffect } from "react";
import { getPosts } from "../../../client/requests";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function BlogAd({ posts }) {
  const menuRef = useRef();
  const navbarRef = useRef();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/admin");
  }, [status]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        menuRef.current.style.visibility = "visible";
        navbarRef.current.style.display = "none";
      }
    }

    if (window.innerWidth < 871) {
      document.addEventListener("mousedown", handleClickOutside);

      // This is how you write code when component Unmounts...like exiting the website, this following return block runs.
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [navbarRef]);

  const adminNavToggle = () => {
    menuRef.current.style.visibility = "hidden";
    navbarRef.current.style.display = "block";
  };

  return (
    <div style={{ background: "#fff" }} className={styles.blogad}>
      <Navbar />
      <div className="global__container">
        <div className="admin__wrapper">
          <svg
            onClick={adminNavToggle}
            ref={menuRef}
            className="admin__menu__icon"
          >
            <use xlinkHref="/svg/menu.svg#menu"></use>
          </svg>

          <div ref={navbarRef} className="admin__navbar">
            <NavbarAd />
          </div>
          <div className="component__wrapper">
            <div className={styles.blogad__wrapper}>
              <Link href={"/admin/blog/create"}>
                <button className={styles.blogad__btn}>Add Blog</button>
              </Link>
              <Blogs posts={posts} priv={true} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const { data } = await getPosts();
  return {
    props: {
      posts: data,
    },
  };
}
