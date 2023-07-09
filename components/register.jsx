import styles from "../styles/Alogin.module.css";
import { useState } from "react";

const Alogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    // const res = await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: false,
    // });

    // console.log(res);
  };

  return (
    <div className={styles.alogin}>
      <div className="global__container">
        <div className={styles.alogin__wrapper}>
          <form onSubmit={handleRegister} className={styles.alogin__form}>
            <h4 className={styles.alogin__title}>Register</h4>

            <div className={styles.alogin__input__wrapper}>
              <svg className={styles.alogin__icon}>
                <use xlinkHref="/svg/profile.svg#profile"></use>
              </svg>
              <input
                placeholder="username"
                type="text"
                className={styles.alogin__input}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.alogin__input__wrapper}>
              <svg className={styles.alogin__icon}>
                <use xlinkHref="/svg/key.svg#key"></use>
              </svg>
              <input
                placeholder="password"
                type="password"
                className={styles.alogin__input}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className={styles.alogin__btn}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Alogin;
