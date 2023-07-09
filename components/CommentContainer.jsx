import styles from "../styles/CommentContainer.module.css";
import Comments from "./Comments";

const CommentContainer = ({ randomReviews }) => {
  return (
    <div className="global__container">
      <div className={styles.comments}>
        <div className={styles.comments__top}>
          <h3 className={styles.comments__text}>Why</h3>
          <div className={styles.comments__logo}>
            <h3 className={styles.comments__text}>GP</h3>
            <svg className={styles.comments__icon__moon}>
              <use xlinkHref="/svg/half-moon.svg#half-moon"></use>
            </svg>
            <h3 className={styles.comments__text}>HEST</h3>
          </div>
          <span>❔</span>
        </div>

        <h3 className={styles.comments__middle}>
          Here are some of our esteemed customers reviews.
        </h3>

        <div className={styles.comments__wrapper}>
          <Comments randomReviews={randomReviews} />
        </div>
      </div>
    </div>
  );
};

export default CommentContainer;
