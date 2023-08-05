import BlogContainer from "@/components/Blogs/BlogContainer";
import BlogHeader from "@/components/Blogs/BlogHeader";
import BlogList from "@/components/Blogs/BlogList";
import BlogMain from "@/components/Blogs/BlogMain";
import BlogMeta from "@/components/Blogs/BlogMeta";
import BlogSection from "@/components/Blogs/BlogSection";
import PageContainer from "@/components/Layouts/PageContainer";

const BlogListPage = () => {
  return (
    <BlogContainer>
      <BlogMeta
        title="Yallyo Articles and News"
        desc="Yallyo Articles and News"
      />
      {/* <BlogHeader title="Yallyo's Articles and News" /> */}
      <BlogList x="" />
    </BlogContainer>
  );
};

export default BlogListPage;
