interface Props {
  sources: { link: string; title: string }[];
}

const BlogReferences = ({ sources }: Props) => {
  return (
    <section className="">
      <h2 className="text-lg font-bold mb-2">Reference Sources</h2>
      <ul>
        {sources.map((source, index) => (
          <li key={index} className="my-2">
            <a
              href={source.link}
              className="text-blue-400 underline italic"
              target="_blank"
            >
              {source.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogReferences;
