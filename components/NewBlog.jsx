import styles from "../styles/NewBlog.module.css";
import Image from "next/image";
import { useState } from "react";
import { createPost } from "../client/requests";

const NewBlog = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postAuthor, setPostAuthor] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postImage, setPostImage] = useState(null);
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
      setPostImage(e.target.result);
    };

    file && fileReader.readAsDataURL(file);
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    const form = new FormData();
    form.append("title", postTitle);
    form.append("author", postAuthor);
    form.append("desc", postDesc);
    form.append("image", imageFile);

    const result = await createPost(form);
    if (result.status === 500) {
      setError(true);
    }

    if (result.status === 201) {
      setSuccess(true);
      setPostTitle("");
      setPostAuthor("");
      setPostDesc("");
      setPostImage(null);
      setImageFile(null);
    }
  };

  return (
    <div className={styles.new__blog}>
      <div className="global__container">
        <div className={styles.new__blog__wrapper}>
          <h2 className={styles.new__blog__head}>Create Post</h2>
          <div className={styles.new__blog__image__wrapper}>
            <Image
              className={styles.new__blog__image}
              src={postImage ? postImage : "/images/placeholder.png"}
              layout="fill"
              alt=""
            />
          </div>

          <form onSubmit={handleFormData}>
            <div className={styles.new__blog__details}>
              <label htmlFor="fileInput">
                <svg className={styles.new__blog__photo__icon}>
                  <use xlinkHref="/svg/add-photo.svg#add-photo"></use>
                </svg>
                <input
                  accept="image/jpeg, image/webp, image/png"
                  type="file"
                  id="fileInput"
                  className={styles.new__blog__hidden}
                  onChange={handleImage}
                />
              </label>

              <input
                onChange={(e) => setPostTitle(e.target.value)}
                className={styles.new__blog__title}
                value={postTitle}
                type="text"
                placeholder="Post Title"
              />

              <input
                onChange={(e) => setPostAuthor(e.target.value)}
                className={styles.new__blog__title}
                value={postAuthor}
                type="text"
                placeholder="Post author"
              />

              <textarea
                onChange={(e) => setPostDesc(e.target.value)}
                className={styles.new__blog__textarea}
                placeholder="Tell Your Story..."
                value={postDesc}
              ></textarea>

              <button className={styles.new__blog__btn}>Create</button>
              {error && (
                <h4 className="error">
                  Fill all fields and ensure that the title does not exist in a
                  previous post.
                </h4>
              )}
              {success && <h4 className="success">Post Created!</h4>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
