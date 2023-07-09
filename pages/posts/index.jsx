import Blogs from "../../components/Blogs";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "../../styles/BlogHome.module.css";
import { getPosts } from "../../client/requests";

export default function BlogHome({ posts }) {
  return (
    <div className={styles.blogHome}>
      <Navbar />
      <Blogs priv={false} posts={posts} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const { data } = await getPosts();
  return {
    props: {
      posts: data,
    },
  };
}
