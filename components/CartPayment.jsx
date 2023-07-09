import styles from "../styles/CartPayment.module.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { makePayment } from "../client/requests";

const CartPayment = ({ basket, dispatch, setOrderId, setSuccess }) => {
  return (
    <div className={styles.cart__payment}>
      <PayPalScriptProvider>
        <PayPalButtons
          createOrder={async (data, actions) => {
            const res = await makePayment(basket);
            if (res.status === 200) {
              setOrderId(res.data.id);
              return res.data.id;
            }
          }}
          onApprove={async function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              console.log(details);
              // alert(
              //   "Transaction completed by " + details.payer.name.given_name
              // );
              setSuccess(true);
              dispatch({ type: "EMPTY__CART" });
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default CartPayment;
