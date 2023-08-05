import BlogContainer from "@/components/Blogs/BlogContainer";
import BlogList from "@/components/Blogs/BlogList";
import BlogMeta from "@/components/Blogs/BlogMeta";

const BlogListPage = () => {
  return (
    <BlogContainer>
      <BlogMeta
        title="Yallyo's Articles and News - Engaging Content and Updates"
        desc="Discover a collection of engaging articles and the latest news from Yallyo. Stay informed and inspired with our diverse range of topics, from language learning to cultural insights. Join our vibrant community and explore thought-provoking content."
      />
      <BlogList />
    </BlogContainer>
  );
};

export default BlogListPage;
