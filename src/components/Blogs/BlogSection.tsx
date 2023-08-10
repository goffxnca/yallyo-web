import { ReactNode } from "react";

interface Props {
  title: string;
  paragraph1: string;
  paragraph2?: string;
  imageUrl?: string;
  imageAlt?: string;
  bottomSlot?: ReactNode;
}

const BlogSection = ({
  title,
  paragraph1,
  paragraph2,
  imageUrl,
  imageAlt,
  bottomSlot,
}: Props) => {
  return (
    <section className="">
      {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
      <p dangerouslySetInnerHTML={{ __html: paragraph1 }}></p>
      {paragraph2 && (
        <p dangerouslySetInnerHTML={{ __html: paragraph2 }} className="mt-4" />
      )}

      {/* Section Image */}
      {imageUrl && imageAlt && (
        <div className="mt-10 flex justify-center">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full md:max-w-[500px]"
          />
        </div>
      )}

      {bottomSlot && bottomSlot}
    </section>
  );
};

export default BlogSection;
