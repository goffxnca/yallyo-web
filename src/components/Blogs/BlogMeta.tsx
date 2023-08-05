import Head from "next/head";

interface Props {
  title: string;
  desc: string;
}

const BlogMeta = ({ title, desc }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} key="desc" />
      </Head>
    </>
  );
};

export default BlogMeta;
