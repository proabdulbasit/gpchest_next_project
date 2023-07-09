import styles from "../styles/ClientSignUp.module.css";
import { useEffect, useRef, useState } from "react";
import { signUp } from "../client/requests";
import Loading from "../components/Loading";

const ClientSignUp = ({ handleSignUpClose, handleLoginOpen }) => {
  const passwordRef = useRef();
  const emailWrapperRef = useRef();
  const usernameWrapperRef = useRef();
  const submitBtnRef = useRef();
  const passwordWrapperRef = useRef();
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [acceptTerm, setAcceptTerm] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // disable form submit if form inputs ae empty
  useEffect(() => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      acceptTerm === false
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [username, email, password, acceptTerm]);

  useEffect(() => {
    if (disable) {
      submitBtnRef.current.style.cursor = "not-allowed";
    } else {
      submitBtnRef.current.style.cursor = "pointer";
    }
  }, [disable]);

  useEffect(() => {
    if (focusEmail) {
      emailWrapperRef.current.style.border = "1px solid rgb(191, 24, 191)";
    } else {
      emailWrapperRef.current.style.border = "1px solid gray";
    }

    if (focusUsername) {
      usernameWrapperRef.current.style.border = "1px solid rgb(191, 24, 191)";
    } else {
      usernameWrapperRef.current.style.border = "1px solid gray";
    }

    if (focusPassword) {
      passwordWrapperRef.current.style.border = "1px solid rgb(191, 24, 191)";
    } else {
      passwordWrapperRef.current.style.border = "1px solid gray";
    }
  }, [focusEmail, focusPassword, focusUsername]);

  const handleSignIn = () => {
    handleSignUpClose();
    handleLoginOpen();
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    setLoading(true);
    const user = { username, email, password };
    const res = await signUp(user);
    if (res.status === 201) {
      setLoading(false);
      setSuccess(true);
      setEmail("");
      setPassword("");
      setUsername("");
      setAcceptTerm(false);
      handleSignIn();
    }

    if (res.status === 500 || res.status === 409) {
      setLoading(false);
      setError(true);
    }
  };

  const showPassword = () => {
    setShowPass(true);
    passwordRef.current.type = "text";
  };

  const hidePassword = () => {
    setShowPass(false);
    passwordRef.current.type = "password";
  };

  return (
    <div className={styles.client__signup}>
      {loading && <Loading />}
      {error && <p className="error">User Exists!</p>}
      {success && <p className="success">User Created!</p>}
      <div className={styles.client__signup__head__wrapper}>
        <h4 className={styles.client__signup__head}>Sign Up</h4>
        <svg
          onClick={() => handleSignUpClose()}
          className={styles.client__signup__close}
        >
          <use xlinkHref="/svg/close-sharp.svg#close-sharp"></use>
        </svg>
      </div>
      <form onSubmit={handleSignUp} className={styles.client__signup__form}>
        <div ref={usernameWrapperRef} className={styles.client__input__wrapper}>
          <input
            className={styles.client__input__email}
            type="text"
            placeholder="your username"
            onFocus={() => setFocusUsername(true)}
            onBlur={() => setFocusUsername(false)}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div ref={emailWrapperRef} className={styles.client__input__wrapper}>
          <input
            className={styles.client__input__email}
            type="email"
            placeholder="your email"
            onFocus={() => setFocusEmail(true)}
            onBlur={() => setFocusEmail(false)}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div ref={passwordWrapperRef} className={styles.client__input__wrapper}>
          <input
            ref={passwordRef}
            className={styles.client__input}
            type="password"
            placeholder="your password"
            onFocus={() => setFocusPassword(true)}
            onBlur={() => setFocusPassword(false)}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {showPass ? (
            <svg onClick={hidePassword} className={styles.client__signup__icon}>
              <use xlinkHref="/svg/invisibility-icon.svg#invisibility-icon"></use>
            </svg>
          ) : (
            <svg onClick={showPassword} className={styles.client__signup__icon}>
              <use xlinkHref="/svg/visibility-icon.svg#visibility-icon"></use>
            </svg>
          )}
        </div>

        <div className={styles.client__terms__wrapper}>
          <input
            onChange={(e) => setAcceptTerm(e.target.checked)}
            className={styles.client__terms__checkbox}
            type="checkbox"
          />
          <p>
            I agree to the{" "}
            <span className={styles.client__terms__bold}>Term of Service</span>{" "}
            and{" "}
            <span className={styles.client__terms__bold}>Privacy Policy</span>
          </p>
        </div>

        <button
          ref={submitBtnRef}
          disabled={disable}
          onClick={handleSignUp}
          className={styles.client__submit}
        >
          Sign Up
        </button>
      </form>

      <p className={styles.client__signin}>
        Already have an account?{" "}
        <span onClick={handleSignIn} className={styles.client__signin__bold}>
          Sign In
        </span>
      </p>
    </div>
  );
};

export default ClientSignUp;
