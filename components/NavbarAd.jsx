import styles from "../styles/NavbarAd.module.css";
import Link from "next/link";

const NavbarAd = () => {
  return (
    <div className={styles.navbarAd}>
      <ul className={styles.navbarAd__list}>
        <Link href={"/admin/users"}>
          <li>
            <svg className={styles.navbarAd__icon}>
              <use xlinkHref="/svg/users.svg#users"></use>
            </svg>
            <span className={styles.navbarAd__list__item}>users</span>
          </li>
        </Link>
        <Link href={"/admin/chats"}>
          <li>
            <svg className={styles.navbarAd__icon}>
              <use xlinkHref="/svg/live-chat.svg#live-chat"></use>
            </svg>
            <span className={styles.navbarAd__list__item}>chats</span>
          </li>
        </Link>

        <Link href={"/admin/orders"}>
          <li>
            <svg className={styles.navbarAd__icon}>
              <use xlinkHref="/svg/live-chat.svg#live-chat"></use>
            </svg>
            <span className={styles.navbarAd__list__item}>orders</span>
          </li>
        </Link>
        <Link href={"/admin/blog"}>
          <li>
            <svg className={styles.navbarAd__icon}>
              <use xlinkHref="/svg/blog.svg#blog"></use>
            </svg>
            <span className={styles.navbarAd__list__item}>blogs</span>
          </li>
        </Link>
        <Link href={"/admin/gold"}>
          <li>
            <svg className={styles.navbarAd__icon}>
              <use xlinkHref="/svg/price.svg#price"></use>
            </svg>
            <span className={styles.navbarAd__list__item}>gold prices</span>
          </li>
        </Link>
        <Link href={"/admin/accounts"}>
          <li>
            <svg className={styles.navbarAd__icon}>
              <use xlinkHref="/svg/game.svg#game"></use>
            </svg>
            <span className={styles.navbarAd__list__item}>game accounts</span>
          </li>
        </Link>
        <Link href={"/admin/reviews"}>
          <li>
            <svg className={styles.navbarAd__icon}>
              <use xlinkHref="/svg/star.svg#star"></use>
            </svg>
            <span className={styles.navbarAd__list__item}>feedback</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default NavbarAd;
