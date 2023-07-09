import styles from "../../../styles/Account.module.css";
import NavbarAd from "../../../components/NavbarAd";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import AccountsComponent from "../../../components/AccountsComponent";
import { useRef, useEffect } from "react";
import { getAccounts } from "../../../client/requests";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function Account({ accounts }) {
  const { status, data } = useSession();

  const menuRef = useRef();
  const navbarRef = useRef();

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
    <div className={styles.account}>
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
            <div className={styles.account__wrapper}>
              <Link href={"/admin/accounts/create"}>
                <button className={styles.account__btn}>Add Account</button>
              </Link>
              <AccountsComponent accounts={accounts} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const { data } = await getAccounts();
  return {
    props: {
      accounts: data,
    },
  };
}
