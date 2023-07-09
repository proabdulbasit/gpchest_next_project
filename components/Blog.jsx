import styles from "../styles/Blog.module.css";
import Image from "next/image";
import months from "../utils/months";

const Blog = ({ post }) => {
  const firstSpaceIndex = post?.desc.indexOf(" ");

  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${month} ${date}, ${year}`;
  };

  return (
    <div className={styles.blog}>
      <div className="global__container">
        <div className={styles.blog__wrapper}>
          <div className={styles.blog__image__wrapper}>
            <Image
              className={styles.blog__image}
              src={`/images/posts/${post?.image}`}
              layout="fill"
              alt=""
            />
          </div>

          <div className={styles.blog__details}>
            <h1 className={styles.blog__head}>{post?.title}</h1>
            <p className={styles.blog__author}>
              Author: <span>{post?.author}</span>
            </p>
            <p className={styles.blog__timestamp}>{`Posted ${getDate(
              post?.createdAt
            )}`}</p>
            <p className={styles.blog__content}>
              <span className={styles.blog__content__first}>{`${post?.desc
                .substring(0, firstSpaceIndex)
                .charAt(0)}`}</span>
              {`${post?.desc.substring(0, firstSpaceIndex).slice(1)}`}
              {post?.desc.substring(firstSpaceIndex)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
