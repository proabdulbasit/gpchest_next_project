import styles from "../styles/ReviewComponent.module.css";
import Reviews from "./Reviews";
import { useState } from "react";
import { createReview } from "../client/requests";

const ReviewComponent = ({ reviews }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    const form = {
      name,
      email,
      rating,
      experience,
    };

    const res = await createReview(form);
    if (res.status === 500) {
      setError(true);
    }

    if (res.status === 201) {
      setSuccess(true);
      setName("");
      setEmail("");
      setExperience("");
    }
  };

  return (
    <div className={styles.reviewComp}>
      <div className="global__container">
        <div className={styles.reviewComp__form__wrapper}>
          <form onSubmit={handleSubmit} className={styles.reviewComp__form}>
            <div className={styles.reviewComp__messages}>
              {error && <span className="error">All fields are required!</span>}
              {success && <span className="success">We appreciate you 🙏</span>}
            </div>
            <h3 className={styles.reviewComp__form__title}>Review Us </h3>
            <input
              className={styles.reviewComp__input}
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <input
              className={styles.reviewComp__input}
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <div className={styles.reviewComp__rating}>
              {[...Array(5)].map((star, idx) => (
                <svg
                  key={idx}
                  onClick={() => setRating(idx + 1)}
                  onDoubleClick={() => {
                    setRating(0);
                    setHover(0);
                  }}
                  onMouseEnter={() => setHover(idx + 1)}
                  onMouseLeave={() => setHover(rating)}
                  className={`${styles["reviewComp__icon"]} + ${
                    idx + 1 <= (hover || rating)
                      ? styles["reviewComp__star__on"]
                      : styles["reviewComp__star__off"]
                  }`}
                >
                  <use xlinkHref="/svg/star.svg#star"></use>
                </svg>
              ))}
            </div>

            <textarea
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              className={styles.reviewComp__textarea}
              placeholder="Share your experience..."
            ></textarea>

            <div className={styles.reviewComp__btn__wrapper}>
              <button className={styles.reviewComp__btn}>Share</button>
            </div>
          </form>
        </div>
        <h1 className={styles.reviewComp__title}>
          our esteemed customers reviews
        </h1>
        <Reviews reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewComponent;
