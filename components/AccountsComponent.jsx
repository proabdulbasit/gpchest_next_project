import Link from "next/link";
import styles from "../styles/AccountsComponent.module.css";
import { useState } from "react";
import Image from "next/image";
import { deleteAccount } from "../client/requests";

const AccountsComponent = ({ accounts }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [accountData, setAccountData] = useState(accounts);

  const handleDelete = async (id) => {
    setSuccess(false);
    setError(false);
    const res = await deleteAccount(id);
    if (res.status === 200) {
      setSuccess(true);
      setAccountData(accountData.filter((account) => account._id !== id));
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.accounts__component}>
      <div className="global__container">
        <div className={styles.accounts__component__wrapper}>
          {error && (
            <span className="error">Something went wrong! try again.</span>
          )}
          {success && <span className="success">Post Deleted!.</span>}

          {accountData?.map((account, idx) => (
            <div key={idx} className={styles.accounts__component__item}>
              <Link href={`/admin/accounts/${account?._id}`}>
                <div>
                  <div className={styles.accounts__component__info__wrapper}>
                    <div className={styles.accountsComponent__image__wrapper}>
                      <Image
                        src={`/images/accounts/${account?.image}`}
                        alt=""
                        layout="fill"
                      />
                    </div>

                    <div
                      className={styles.accounts__component__info__container}
                    >
                      <p className={styles.accounts__component__info}>Title:</p>{" "}
                      <p className={styles.accounts__component__value}>
                        {account?.title}
                      </p>
                    </div>

                    <div
                      className={styles.accounts__component__info__container}
                    >
                      <p className={styles.accounts__component__info}>Game:</p>{" "}
                      <p className={styles.accounts__component__value}>
                        {account?.game}
                      </p>
                    </div>

                    <div
                      className={styles.accounts__component__info__container}
                    >
                      <p className={styles.accounts__component__info}>
                        Combat:
                      </p>{" "}
                      <p className={styles.accounts__component__value}>
                        {account?.combat}
                      </p>
                    </div>

                    <div
                      className={styles.accounts__component__info__container}
                    >
                      <p className={styles.accounts__component__info}>
                        Account Type:
                      </p>{" "}
                      <p className={styles.accounts__component__value}>
                        {account?.type}
                      </p>
                    </div>

                    <div
                      className={styles.accounts__component__info__container}
                    >
                      <p className={styles.accounts__component__info}>
                        Account Status:
                      </p>{" "}
                      <p className={styles.accounts__component__value}>
                        {account?.status}
                      </p>
                    </div>
                  </div>

                  <div className={styles.accounts__component__info__container}>
                    <p className={styles.accounts__component__info}>
                      Email Status:
                    </p>{" "}
                    <p className={styles.accounts__component__value}>
                      {account?.email}
                    </p>
                  </div>

                  <div className={styles.accounts__component__info__container}>
                    <p className={styles.accounts__component__info}>
                      Delivery Time:
                    </p>{" "}
                    <p className={styles.accounts__component__value}>
                      {account?.time}H
                    </p>
                  </div>

                  <div className={styles.accounts__component__info__container}>
                    <p className={styles.accounts__component__info}>
                      Previous Price:
                    </p>{" "}
                    <p className={styles.accounts__component__value}>
                      {account?.prev_price ? "$" + account?.prev_price : "-"}
                    </p>
                  </div>

                  <div className={styles.accounts__component__info__container}>
                    <p className={styles.accounts__component__info}>
                      Current Price:
                    </p>{" "}
                    <p className={styles.accounts__component__value}>
                      ${account?.curr_price}
                    </p>
                  </div>
                </div>
              </Link>

              <div className={styles.accounts__component__btn__wrapper}>
                <svg
                  onClick={() => handleDelete(account?._id)}
                  className={styles.accounts__component__icon}
                >
                  <use xlinkHref="/svg/delete.svg#delete"></use>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsComponent;
