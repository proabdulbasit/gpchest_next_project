import styles from "../styles/ResetPassord.module.css";
import { useEffect, useRef, useState } from "react";
import { sendResetPassword } from "../client/requests";
import Loading from "../components/Loading";

const ResetPassord = ({ handleForgetClose, handleSignUpOpen }) => {
  const emailWrapperRef = useRef();
  const submitBtnRef = useRef();
  const [focusEmail, setFocusEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (focusEmail) {
      emailWrapperRef.current.style.border = "1px solid rgb(191, 24, 191)";
    } else {
      emailWrapperRef.current.style.border = "1px solid gray";
    }
  }, [focusEmail]);

  // disable form submit if form inputs ae empty
  useEffect(() => {
    if (email === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [email]);

  useEffect(() => {
    if (disable) {
      submitBtnRef.current.style.cursor = "not-allowed";
    } else {
      submitBtnRef.current.style.cursor = "pointer";
    }
  }, [disable]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);

    const res = await sendResetPassword(email);

    if (res.status === 200) {
      setLoading(false);
      setSuccess(true);
      setEmail("");
    }
  };

  const handleRegister = () => {
    handleForgetClose();
    handleSignUpOpen();
  };

  return (
    <div className={styles.reset__password}>
      {loading && <Loading />}
      {success && <p className="success">Sent!, Check your Email</p>}
      <div className={styles.reset__password__head__wrapper}>
        <h4 className={styles.reset__password__head}>Reset Password</h4>
        <svg
          onClick={() => handleForgetClose()}
          className={styles.reset__password__close}
        >
          <use xlinkHref="/svg/close-sharp.svg#close-sharp"></use>
        </svg>
      </div>
      <form
        onSubmit={handleResetPassword}
        className={styles.reset__password__form}
      >
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

        <button
          disabled={disable}
          ref={submitBtnRef}
          onClick={handleResetPassword}
          className={styles.client__submit}
        >
          {loading ? "Loading..." : "Reset Password"}
        </button>
      </form>

      <p className={styles.reset__password__instruction}>
        Not a member yet?{" "}
        <span
          onClick={handleRegister}
          className={styles.reset__password__instruction__bold}
        >
          Register for an Account!
        </span>
      </p>
    </div>
  );
};

export default ResetPassord;
