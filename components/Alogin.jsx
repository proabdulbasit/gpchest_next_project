import styles from "../styles/Alogin.module.css";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Alogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.status === 401 || res.status === 500) {
      setError(true);
    }

    if (res.status === 200) {
      setSuccess(true);
      setEmail("");
      setPassword("");
      router.push("/admin/chats");
    }
  };

  return (
    <div className={styles.alogin}>
      <div className="global__container">
        <div className={styles.alogin__wrapper}>
          <form onSubmit={handleLogin} className={styles.alogin__form}>
            {error && <span className="error">Invalid Credentials</span>}
            {success && <span className="success">Welcome</span>}
            <h4 className={styles.alogin__title}>Login</h4>

            <div className={styles.alogin__input__wrapper}>
              <svg className={styles.alogin__icon}>
                <use xlinkHref="/svg/profile.svg#profile"></use>
              </svg>
              <input
                placeholder="email"
                type="text"
                className={styles.alogin__input}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                value={password}
              />
            </div>

            <button className={styles.alogin__btn}>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Alogin;
