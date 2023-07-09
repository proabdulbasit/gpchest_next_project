import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import styles from "../../styles/PasswordReset.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import Loading from "../../components/Loading";
import { validatedResetResponse, changePassword } from "../../client/requests";
import Link from "next/link";
import { CustomerRecoveredPassword } from "../../store/store";
import { useRouter } from "next/router";

export default function PasswordReset({ validated, email }) {
  const { setPassReset } = useContext(CustomerRecoveredPassword);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusNewPassword, setFocusNewPassword] = useState(false);
  const [disable, setDisable] = useState(false);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const router = useRouter();

  const newPasswordWrapperRef = useRef();
  const newPasswordConfirmWrapperRef = useRef();
  const newPasswordRef = useRef();
  const newPasswordConfirmRef = useRef();
  const submitBtnRef = useRef(null);

  // disable form submit if form inputs are empty
  useEffect(() => {
    if (newPassword === "" || confirmPassword !== newPassword) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (validated) {
      if (disable) {
        submitBtnRef.current.style.cursor = "not-allowed";
      } else {
        submitBtnRef.current.style.cursor = "pointer";
      }
    }
  }, [disable, validated]);

  useEffect(() => {
    if (validated) {
      if (focusNewPassword) {
        newPasswordWrapperRef.current.style.border =
          "1px solid rgb(191, 24, 191)";
      } else {
        newPasswordWrapperRef.current.style.border = "1px solid gray";
      }

      if (focusConfirmPassword) {
        newPasswordConfirmWrapperRef.current.style.border =
          "1px solid rgb(191, 24, 191)";
      } else {
        newPasswordConfirmWrapperRef.current.style.border = "1px solid gray";
      }
    }
  }, [focusNewPassword, focusConfirmPassword, validated]);

  const showConfirmPassword = () => {
    setShowPassConfirm(true);
    newPasswordConfirmRef.current.type = "text";
  };

  const hideConfirmPassword = () => {
    setShowPassConfirm(false);
    newPasswordConfirmRef.current.type = "password";
  };

  const showNewPassword = () => {
    setShowNewPass(true);
    newPasswordRef.current.type = "text";
  };

  const hideNewPassword = () => {
    setShowNewPass(false);
    newPasswordRef.current.type = "password";
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    setLoading(true);
    if (newPassword !== confirmPassword) {
      return;
    } else {
      try {
        const res = await changePassword(email, newPassword);
        console.log(res);

        if (res.status === 200) {
          setLoading(false);
          setSuccess(true);
          setNewPassword("");
          setConfirmPassword("");
          router.push("/");
          setPassReset(true);
        }

        if (res.status === 500) {
          setLoading(false);
          setError(true);
        }
      } catch (err) {
        return err;
      }
    }
  };

  return (
    <div className={styles.password__reset}>
      <div className="global__container">
        <Navbar />
        <div className={styles.password__reset__wrapper}>
          <div className={styles.password__reset__container}>
            {loading && <Loading />}
            {error && <p className="error">Passwords does not match!</p>}
            {success && <p className="success">Password Updated!</p>}
            <div className={styles.password__reset__head__wrapper}>
              <h4 className={styles.password__reset__head}>Change Password</h4>
            </div>
            {!validated ? (
              <>
                <p className={styles.password__reset__timeout}>
                  Something Went wrong😔, try again.
                </p>
                <Link href="/">
                  <button className={styles.password__reset__timeout__btn}>
                    Go Back
                  </button>
                </Link>
              </>
            ) : (
              <>
                <form
                  onSubmit={handleChangePassword}
                  className={styles.password__reset__form}
                >
                  <div
                    ref={newPasswordWrapperRef}
                    className={styles.client__input__wrapper}
                  >
                    <input
                      ref={newPasswordRef}
                      className={styles.client__input}
                      type="password"
                      placeholder="your new password"
                      onFocus={() => setFocusNewPassword(true)}
                      onBlur={() => setFocusNewPassword(false)}
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                    />
                    {showNewPass ? (
                      <svg
                        onClick={hideNewPassword}
                        className={styles.password__reset__icon}
                      >
                        <use xlinkHref="/svg/invisibility-icon.svg#invisibility-icon"></use>
                      </svg>
                    ) : (
                      <svg
                        onClick={showNewPassword}
                        className={styles.password__reset__icon}
                      >
                        <use xlinkHref="/svg/visibility-icon.svg#visibility-icon"></use>
                      </svg>
                    )}
                  </div>

                  <div
                    ref={newPasswordConfirmWrapperRef}
                    className={styles.client__input__wrapper}
                  >
                    <input
                      ref={newPasswordConfirmRef}
                      className={styles.client__input}
                      type="password"
                      placeholder="confirm new password"
                      onFocus={() => setFocusConfirmPassword(true)}
                      onBlur={() => setFocusConfirmPassword(false)}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                    {showPassConfirm ? (
                      <svg
                        onClick={hideConfirmPassword}
                        className={styles.password__reset__icon}
                      >
                        <use xlinkHref="/svg/invisibility-icon.svg#invisibility-icon"></use>
                      </svg>
                    ) : (
                      <svg
                        onClick={showConfirmPassword}
                        className={styles.password__reset__icon}
                      >
                        <use xlinkHref="/svg/visibility-icon.svg#visibility-icon"></use>
                      </svg>
                    )}
                  </div>

                  <button
                    ref={submitBtnRef}
                    disabled={disable}
                    onClick={handleChangePassword}
                    className={styles.client__submit}
                  >
                    Sign Up
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const email = query.slug[0];
  const token = query.slug[1];
  const res = await validatedResetResponse(email, token);
  let data;
  if (res.status === 200) {
    data = res.data;
  }

  if (res.status === 500) {
    data = { validated: false };
  }

  return {
    props: {
      validated: data.validated,
      email,
    },
  };
}
