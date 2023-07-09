import styles from "../styles/CreateAccount.module.css";
import Image from "next/image";
import { useState } from "react";
import { createAccount } from "../client/requests";

const CreateAccount = () => {
  const [title, setTitle] = useState("");
  const [game, setGame] = useState("");
  const [combat, setCombat] = useState("");
  const [type, setType] = useState("pure");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [prevPrice, setPrevPrice] = useState("");
  const [currPrice, setCurrPrice] = useState("");
  const [accountImage, setAccountImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    // we are using the JS FileReader class to process the file and display the image to the user after the user selects it for upload.
    const fileReader = new FileReader();

    // attaching an onload event to the fileReader.
    fileReader.onload = function (e) {
      setAccountImage(e.target.result);
    };

    file && fileReader.readAsDataURL(file);
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    const form = new FormData();
    form.append("title", title);
    form.append("game", game);
    form.append("combat", combat);
    form.append("type", type);
    form.append("status", status);
    form.append("email", email);
    form.append("time", time);
    form.append("prev_price", prevPrice);
    form.append("curr_price", currPrice);
    form.append("image", imageFile);

    const result = await createAccount(form);
    console.log(result);
    if (result.status === 500) {
      setError(true);
    }

    if (result.status === 201) {
      setSuccess(true);
      setTitle("");
      setGame("");
      setCombat("");
      setType("");
      setEmail("");
      setTime("");
      setPrevPrice("");
      setCurrPrice("");
      setAccountImage(null);
      setImageFile(null);
    }
  };

  return (
    <div className={styles.create__account}>
      <div className="global__container">
        <div className={styles.create__account__wrapper}>
          <div className={styles.create__account__image__wrapper}>
            <Image
              className={styles.create__account__image}
              src={accountImage ? accountImage : "/images/placeholder.png"}
              layout="fill"
              alt=""
            />
          </div>
          <form
            onSubmit={handleFormData}
            className={styles.create__account__form}
          >
            <label htmlFor="fileInput">
              <svg className={styles.create__account__photo__icon}>
                <use xlinkHref="/svg/add-photo.svg#add-photo"></use>
              </svg>
              <input
                accept="image/jpeg, image/webp, image/png"
                type="file"
                id="fileInput"
                hidden
                onChange={handleImage}
              />
            </label>

            <div className={styles.create__account__form__input__container}>
              <p>title: </p>
              <input
                className={styles.create__account__form__input}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={styles.create__account__form__input__container}>
              <p>game: </p>
              <input
                className={styles.create__account__form__input}
                type="text"
                value={game}
                onChange={(e) => setGame(e.target.value)}
              />
            </div>

            <div className={styles.create__account__form__input__container}>
              <p>combat: </p>
              <input
                className={styles.create__account__form__input}
                type="number"
                value={combat}
                onChange={(e) => setCombat(e.target.value)}
                step="any"
              />
            </div>

            <div className={styles.create__account__form__input__container}>
              <p>account type: </p>
              <select
                className={styles.create__account__form__input}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="pure">pure</option>
                <option value="med level">med level</option>
                <option value="max main">max main</option>
                <option value="skiller">skiller</option>
              </select>
            </div>

            <div className={styles.create__account__form__input__container}>
              <p>account status: </p>
              <input
                className={styles.create__account__form__input}
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>

            <div className={styles.create__account__form__input__container}>
              <p>email status: </p>
              <input
                className={styles.create__account__form__input}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.create__account__form__input__container}>
              <p>delivery time: </p>
              <input
                className={styles.create__account__form__input}
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className={styles.create__account__form__input__container}>
              <p>previous price: </p>
              <input
                className={styles.create__account__form__input}
                type="number"
                value={prevPrice}
                onChange={(e) => setPrevPrice(e.target.value)}
              />
            </div>

            <div className={styles.create__account__form__input__container}>
              <p>current price: </p>
              <input
                className={styles.create__account__form__input}
                type="number"
                value={currPrice}
                onChange={(e) => setCurrPrice(e.target.value)}
              />
            </div>

            <div className={styles.create__account__form__btn__wrapper}>
              <button className={styles.create__account__form__btn}>
                Create account
              </button>
            </div>

            {error && (
              <h4 className="error">
                Check your Inputs
              </h4>
            )}
            {success && <h4 className="success">Account Created!</h4>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
