import styles from "../styles/CheckoutComponent.module.css";
import CartDetails from "./CartDetails";
import CartCheckout from "./CartCheckout";
import CartPayment from "./CartPayment";
import { useShopValue } from "../context/ShopProvider";
import { useState, useRef } from "react";

const CheckoutComponent = () => {
  const [{ basket }, dispatch] = useShopValue();
  const [orderId, setOrderId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [copy, setCopy] = useState(false);
  const orderRef = useRef();

  const handleCopy = () => {
    setCopy(false);
    const id = orderRef.current.innerText;
    navigator.clipboard.writeText(id);
    setCopy(true);
  };

  return (
    <div className={styles.checkout__component}>
      <div className={styles.checkout__component__text}>
        <h3>My Shopping Cart</h3>
        <p>Thanks🙏 for Shopping with us.</p>
      </div>
      <div className={styles.checkout__component__wrapper}>
        {basket?.length > 0 ? (
          <>
            <CartDetails />
            <CartCheckout setOrderId={setOrderId} setSuccess={setSuccess} dispatch={dispatch} />
            <CartPayment
              basket={basket}
              setSuccess={setSuccess}
              setOrderId={setOrderId}
              dispatch={dispatch}
            />
          </>
        ) : (
          <span className={styles.checkout__component__empty}>
            No Item in your cart ❗
          </span>
        )}
        {success && orderId && (
          <div
            onClick={handleCopy}
            className={styles.checkout__component__orderId__wrapper}
          >
            <p className={styles.checkout__component__orderId}>
              Order Id: <span ref={orderRef}>{orderId}</span>
            </p>
            <p className={styles.checkout__component__orderId__more}>
              click to copy
            </p>
            {copy && (
              <p
                style={{
                  color: "#fff",
                  width: "max-content",
                  marginInline: "auto",
                  marginTop: "0.3rem",
                }}
                className="success"
              >
                copied
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutComponent;
