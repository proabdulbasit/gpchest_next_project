import Image from "next/image";
import styles from "../styles/Blogs.module.css";
import months from "../utils/months";
import { deletePost } from "../client/requests";
import { useState } from "react";
import Link from "next/link";

const Blogs = ({ priv, posts }) => {
  const showPriv = priv == true ? true : false;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [postData, setPostData] = useState(posts);

  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${month} ${date}, ${year}`;
  };

  const handleDelete = async (id) => {
    setSuccess(false);
    setError(false);
    const res = await deletePost(id);
    if (res.status === 200) {
      setSuccess(true);
      setPostData(postData.filter((post) => post._id !== id));
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.blogs}>
      <div className="global__container">
        <div className={styles.blogs__wrapper}>
          {error && (
            <span className="error">Something went wrong! try again.</span>
          )}
          {success && <span className="success">Post Deleted!.</span>}

          {postData?.map((post, idx) => (
            <div key={idx} className={styles.blogs__item}>
              <div className={styles.blogs__image__wrapper}>
                <Image
                  className={styles.blogs__image}
                  src={`/images/posts/${post?.image}`}
                  layout="fill"
                  alt=""
                />
              </div>

              <div className={styles.blogs__details}>
                <h3 className={styles.blogs__head}>{post?.title}</h3>
                <p className={styles.blogs__author}>
                  Author: <span>{post?.author}</span>
                </p>
                <p className={styles.blogs__timestamp}>
                  {`Posted ${getDate(post?.createdAt)}`}
                </p>
                <p className={styles.blogs__content}>{`${post?.desc.slice(
                  0,
                  200
                )}, ...`}</p>
                <div className={styles.blogs__btn__wrapper}>
                  {showPriv && (
                    <svg
                      onClick={() => handleDelete(post?._id)}
                      className={styles.blogs__icon}
                    >
                      <use xlinkHref="/svg/delete.svg#delete"></use>
                    </svg>
                  )}
                  {!showPriv && (
                    <Link
                      href={{
                        pathname: `/posts/${post?.slug}`,
                        query: { postId: post?._id },
                      }}
                      as={`/posts/${post?.slug}`}
                    >
                      <button className={styles.blogs__btn}>Read More</button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
