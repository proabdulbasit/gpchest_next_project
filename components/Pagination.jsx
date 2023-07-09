import styles from "../styles/Pagination.module.css";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav>
      <ul className={styles.pagination}>
        <li className={styles.pagination__page__item}>
          <a
            className={styles.pagination__page__link}
            onClick={prevPage}
            href="#"
          >
            Previous
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            onClick={() => setCurrentPage(pgNumber)}
            className={`${styles["pagination__page__item"]} ${
              currentPage == pgNumber
                ? `${styles["pagination__active"]}`
                : `${styles[""]}`
            } `}
          >
            <a className={styles.pagination__page__link} href="#">
              {pgNumber}
            </a>
          </li>
        ))}
        <li className={styles.pagination__page__item}>
          <a
            className={styles.pagination__page__link}
            onClick={nextPage}
            href="#"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
