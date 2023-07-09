import NavbarAd from "../../../components/NavbarAd";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import EditGold from "../../../components/EditGold";
import { useRef, useEffect } from "react";
import { getGoldPrice } from "../../../client/requests";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function GoldPriceId({ goldPrice }) {
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
    <div style={{ background: "#fff" }}>
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
            <EditGold goldPrice={goldPrice} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const id = ctx?.params.goldId;
  const { data } = await getGoldPrice(id);
  return {
    props: {
      goldPrice: data,
    },
  };
}
