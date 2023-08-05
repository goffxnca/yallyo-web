interface Props {
  title: string;
  paragraph1: string;
  paragraph2?: string;
}

const BlogSection = ({ title, paragraph1, paragraph2 }: Props) => {
  return (
    <section className="">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p dangerouslySetInnerHTML={{ __html: paragraph1 }}></p>
      {paragraph2 && (
        <p dangerouslySetInnerHTML={{ __html: paragraph2 }} className="mt-4" />
      )}
    </section>
  );
};

export default BlogSection;
