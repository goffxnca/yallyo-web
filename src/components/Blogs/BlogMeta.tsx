import Head from "next/head";

interface Props {
  title: string;
  desc: string;
  imageUrl?: string;
}

const BlogMeta = ({ title, desc, imageUrl }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} key="desc" />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head>
    </>
  );
};

export default BlogMeta;
