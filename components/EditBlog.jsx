import styles from "../styles/EditBlog.module.css";
import Image from "next/image";
import { useState } from "react";

const content =
  "Lorem ipsum dolors Lorem ipsum dolorsLorem ipsum dolors Lorem Lorem ipsum dolors Lorem ipsum dolorsLorem ipsum dolors LoremLorem ipsum dolors Lorem ipsum dolorsLorem ipsum dolors Lore Lorem ipsum dolors Lorem ipsum dolorsLorem ipsum dolors Lorem Lorem ipsum dolors Lorem ipsum dolorsLorem ipsum dolors LoremLorem ipsum dolors Lorem ipsum dolorsLorem ipsum dolors LoremLorem ipsum dolors Lorem ipsum dolorsLorem ipsum dolors Lorem Lorem ipsum dolors Lorem ipsum dolorsLorem ipsum dolors LoremLorem ipsum dolors Lorem ipsum dolorsLorem ipsum dolors LoremLorem ipsum dolors Lorem ipsum dolorsLorem ipsum dolors Lorem Lorem ipsum dolors Lorem ipsum dolorsLorem ipsum dolors LoremLorem ipsum dolors Lorem ipsum dolorsLorem ipsum dolors";

const EditBlog = () => {
  const [blogContent, setBlogContent] = useState(content);
  const [blogTitle, setblogTitle] = useState("Russian Nuclear Familia");

  return (
    <div className={styles.edit__blog}>
      <div className="global__container">
        <div className={styles.edit__blog__wrapper}>
          <div className={styles.edit__blog__image__wrapper}>
            <Image
              className={styles.edit__blog__image}
              src="/images/blog/blog3.png"
              layout="fill"
              alt=""
            />
          </div>

          <div className={styles.edit__blog__details}>
            <input
              accept="image/jpeg, image/webp, image/png"
              type="file"
              id="fileInput"
              name="fileInput"
              className={styles.edit__blog__hidden}
            />
            <label className={styles.edit__blog__label} htmlFor="fileInput">
              <svg className={styles.edit__blog__photo__icon}>
                <use xlinkHref="/svg/add-photo.svg#add-photo"></use>
              </svg>
            </label>

            <input
              onChange={(e) => setblogTitle(e.target.value)}
              className={styles.edit__blog__title}
              value={blogTitle}
              type="text"
            />

            <textarea
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              className={styles.edit__blog__textarea}
            ></textarea>

            <button className={styles.edit__blog__btn}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
