import styles from "../styles/ReviewsComponent.module.css";
import { useState } from "react";
import { deleteReview } from "../client/requests";

const ReviewsComponent = ({ reviews }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reviewData, setReviewData] = useState(reviews);

  const handleDelete = async (id) => {
    setSuccess(false);
    setError(false);
    const res = await deleteReview(id);
    if (res.status === 200) {
      setSuccess(true);
      setReviewData(reviewData.filter((review) => review._id !== id));
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.reviews__component}>
      <div className="global__container">
        <div className={styles.reviews__component__messages}>
          {error && (
            <span className="error">Something went wrong! try again.</span>
          )}
          {success && <span className="success">Review Deleted!.</span>}
        </div>
        <div className={styles.reviews__component__wrapper}>
          {reviewData?.map((review, idx) => (
            <div key={idx} className={styles.reviews__component__item}>
              <div className={styles.reviews__component__info__wrapper}>
                <div className={styles.reviews__component__info__container}>
                  <p className={styles.reviews__component__info}>
                    {review?.name}
                  </p>
                </div>

                <div className={styles.reviews__component__info__container}>
                  <p className={styles.reviews__component__info}>
                    {review?.email}
                  </p>
                </div>

                <div className={styles.reviews__component__info__container}>
                  <p className={styles.reviews__component__info}>
                    {review?.rating}
                  </p>
                </div>

                <div className={styles.reviews__component__info__container}>
                  <p className={styles.reviews__component__info}>
                    {review?.experience}
                  </p>
                </div>
              </div>

              <div className={styles.reviews__component__btn__wrapper}>
                <svg
                  onClick={() => handleDelete(review?._id)}
                  className={styles.reviews__component__icon}
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

export default ReviewsComponent;
