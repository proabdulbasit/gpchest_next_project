import styles from "../styles/CartCheckout.module.css";
import { getBasketTotal } from "../context/ShopReducer";
import { useShopValue } from "../context/ShopProvider";
import { useContext } from "react";
import { CustomerEmailContext } from "../store/store";
import { createOrder } from "../client/requests";

const CartCheckout = ({ setSuccess, setOrderId }) => {
  const [{ basket }, dispatch] = useShopValue();
  const { customerEmail, setCustomerEmail } = useContext(CustomerEmailContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderId = Math.random().toString(36).substring(2);

    const basketTotal = basket.reduce((sum, item) => {
      return sum + item.price * item.count;
    }, 0);

    const total = Math.round(basketTotal * 100 + Number.EPSILON) / 100;

    // payment Implementation below

    // create Order after successful checkout
    const res = await createOrder({
      customer: customerEmail,
      orderId,
      total,
      basket,
    });

    if (res.status === 200) {
      setSuccess(true);
      setOrderId(orderId);
      dispatch({ type: "EMPTY__CART" });
    }

    // payment Implementation below
  };

  console.log("basket", basket);
  return (
    <div className={styles.cart__checkout}>
      <div className={styles.cart__checkout__wrapper}>
        <h3 className={styles.cart__checkout__title}>Summary</h3>
        <div className={styles.cart__checkout__detail__wrapper}>
          <form onSubmit={handleSubmit}>
            <div className={styles.cart__checkout__detail}>
              <input
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                type="email"
                className={styles.cart__checkout__email}
                placeholder="input your email"
                required
              />
            </div>

            <div className={styles.cart__checkout__detail}>
              <p className={styles.cart__checkout__key}>
                Do you have a <span>Promo</span> Code?
              </p>
              <input
                type="text"
                placeholder="xxxxxxx"
                className={styles.cart__promo__input}
              />
            </div>

            <div className={styles.cart__checkout__detail}>
              <p className={styles.cart__checkout__key}>Subtotal</p>
              <p className={styles.cart__checkout__value}>
                $
                {Math.round(getBasketTotal(basket) * 100 + Number.EPSILON) /
                  100}
              </p>
            </div>

            <div className={styles.cart__checkout__total}>
              <p className={styles.cart__checkout__total__key}>Total</p>
              <p className={styles.cart__checkout__total__value}>
                $
                {Math.round(getBasketTotal(basket) * 100 + Number.EPSILON) /
                  100}
              </p>
            </div>
            <div className={styles.cart__checkout__btn__wrapper}>
              <button
                onClick={handleSubmit}
                className={styles.cart__checkout__btn}
              >
                Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
