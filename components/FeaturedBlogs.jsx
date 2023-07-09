import styles from "../styles/FeaturedBlogs.module.css";
import months from "../utils/months";
import Link from "next/link";

const FeaturedBlogs = ({ blogs }) => {
  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${month} ${date}, ${year}`;
  };
  return (
    <div className={styles.featured__blogs}>
      <div className={styles.blog__top}>
        <h3 className={styles.blog__check}>our latest post from blog</h3>
        <Link href={"/posts"}>
          <div className={styles.blog__more}>view more blog posts</div>
        </Link>
      </div>
      <div className={styles.featured__blogs__wrapper}>
        {blogs?.map((blog, idx) => (
          <div key={idx} className={styles.featured__blog}>
            <h3 className={styles.featured__blog__title}>{blog?.title}</h3>
            <p className={styles.featured__blog__timestamp}>
              Posted on <span>{getDate(blog?.createdAt)}</span>
            </p>
            <Link
              href={{
                pathname: `/posts/${blog?.slug}`,
                query: { postId: blog?._id },
              }}
              as={`/posts/${blog?.slug}`}
            >
              <div className={styles.featured__blog__btn__wrapper}>
                Continue Reading 👉
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogs;
