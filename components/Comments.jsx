import styles from "../styles/Comments.module.css";
import Image from "next/image";

const Comments = ({ randomReviews }) => {
  return (
    <div className={styles.comments}>
      <div className="global__container">
        <div className={styles.comments__cards}>
          <div className={styles.comments__outer}>
            {randomReviews?.map((review, idx) => (
              <div
                key={idx}
                className={styles.comments__card}
                style={{ "--delay": idx - 1 }}
              >
                <div className={styles.comments__header}>
                  <div className={styles.comments__profile}>
                    <svg className={styles.comments__quote}>
                      <use xlinkHref="/svg/quotes-left.svg#quotes-left"></use>
                    </svg>
                    <div className={styles.comments__details}>
                      <h4>{review?.name}</h4>
                      <p>{review?.email}</p>
                    </div>
                  </div>
                  <div className={styles.comments__stars}>
                    {[...Array(5)].map((star, index) => (
                      <svg
                        className={
                          review?.rating > index
                            ? styles["comments__color"]
                            : styles["comments__star"]
                        }
                        key={index}
                      >
                        <use xlinkHref="/svg/star.svg#star"></use>
                      </svg>
                    ))}
                  </div>
                </div>
                <div className={styles.comments__testimonial}>
                  <p>{review?.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
