import styles from "../styles/ReviewsClient.module.css";
import { useState } from "react";
import Pagination from "./Pagination";

const Reviews = ({ reviews }) => {
  const [reviewData] = useState(reviews);
  const [recordsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const indexedOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexedOfLastRecord - recordsPerPage;

  // records to be displayed on the current page
  const currentRecords = reviewData?.slice(
    indexOfFirstRecord,
    indexedOfLastRecord
  );

  // calculating the number of pages
  const nPages = Math.ceil(reviewData?.length / recordsPerPage);

  return (
    <div>
      <div className={styles.reviews__wrapper}>
        {currentRecords?.map((review, idx) => (
          <div key={idx} className={styles.reviews__item}>
            <div className={styles.reviews__top}>
              <svg className={styles.reviews__quote}>
                <use xlinkHref="/svg/quotes-left.svg#quotes-left"></use>
              </svg>
              <div className={styles.review__left}>
                <h4>{review?.name}</h4>
                <p>{review?.email}</p>
              </div>
              <div className={styles.reviews__star__wrapper}>
                {[...Array(5)].map((star, idx) => (
                  <svg
                    className={
                      review?.rating > idx
                        ? styles["color"]
                        : styles["reviews__star"]
                    }
                    key={idx}
                  >
                    <use xlinkHref="/svg/star.svg#star"></use>
                  </svg>
                ))}
              </div>
            </div>
            <div className={styles.reviews__btm}>{review?.experience}</div>
          </div>
        ))}
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

export default Reviews;
