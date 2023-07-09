import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Processing.module.css";

const Processing = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url != router.asPath && setLoading(true);

    const handleComplete = (url) => url == router.asPath && setLoading(false);

    const handleHistory = (url) => {
      url != router.asPath && setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("beforeHistoryChange", handleHistory);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("beforeHistoryChange", handleHistory);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  useEffect(() => {
    if (loading) {
      document.body.setAttribute("no-scroll", "true");
    }

    if (!loading) {
      document.body.setAttribute("no-scroll", "false");
    }
  }, [loading]);

  return (
    loading && (
      <div className={styles.spinner__wrapper}>
        <div className={styles.spinner__container}>
          <div className={styles.spinner}></div>
        </div>
      </div>
    )
  );
};

export default Processing;
