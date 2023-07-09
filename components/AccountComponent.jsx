import styles from "../styles/AccountComponent.module.css";
import AccountCard from "./AccountCard";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";

const AccountComponent = ({ accounts }) => {
  const [accountData, setAccountData] = useState(accounts);
  const [typeData, setTypeData] = useState(accounts);
  const [currentPage, setCurrentPage] = useState(1);
  const [level, setLevel] = useState(0);
  const [type, setType] = useState("all");
  const [recordsPerPage] = useState(5);

  const indexedOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexedOfLastRecord - recordsPerPage;

  // records to be displayed on the current page
  const currentRecords = accountData?.slice(
    indexOfFirstRecord,
    indexedOfLastRecord
  );

  // calculating the number of pages
  const nPages = Math.ceil(accountData?.length / recordsPerPage);

  useEffect(() => {
    if (type === "all") {
      setAccountData(accounts);
      setTypeData(accounts);
    } else {
      setTypeData(accounts.filter((account) => account.type === type));
      setAccountData(accounts.filter((account) => account.type === type));
      setCurrentPage(1);
    }
  }, [type]);

  useEffect(() => {
    if (+level === 0) {
      setAccountData(typeData);
      setCurrentPage(1);
    } else {
      setAccountData(
        typeData.filter((account) => {
          if (+level == 60) {
            return account.combat <= 60;
          } else if (+level == 90) {
            return account.combat >= 61 && account.combat <= 90;
          } else if (+level == 100) {
            return account.combat >= 91 && account.combat <= 100;
          } else if (+level == 120) {
            return account.combat >= 101;
          }
        })
      );
      setCurrentPage(1);
    }
  }, [level]);

  return (
    <div className={styles.accountComponent}>
      <div className={styles.accountComponent__wrapper}>
        <div className={styles.accountComponent__text}>
          <h3>Buy OSRS Accounts</h3>
          <p>Welcome 👋, we have the best deals, take your pick ❗.</p>
        </div>

        <div className={styles.accountComponent__filter}>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.accountComponent__select}
          >
            <option value="all">All Account Type</option>
            <option value="pure">pure</option>
            <option value="med level">Med Level</option>
            <option value="max main">Max Main</option>
            <option value="skiller">Skiller</option>
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className={styles.accountComponent__select}
          >
            <option value={0}>All Combat Level</option>
            <option value={60}>03 - 60</option>
            <option value={90}>61 - 90</option>
            <option value={100}>91 - 100</option>
            <option value={120}>101 - 120</option>
          </select>
        </div>
        <div className={styles.accountComponent__card__wrapper}>
          {currentRecords.map((account, idx) => (
            <AccountCard key={idx} account={account} />
          ))}
        </div>
      </div>

      <div className={styles.pagination__wrapper}>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AccountComponent;
