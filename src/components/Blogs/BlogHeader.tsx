import { friendlyDate } from "@/utils/date-utils";
import Avatar from "../UIs/Avatar";

interface Props {
  title: string;
  heroImageUrl: string;
  heroImageAlt: string;
  publishedAt: string;
}

const BlogHeader = ({
  title,
  heroImageUrl,
  heroImageAlt,
  publishedAt,
}: Props) => {
  return (
    <header>
      <h1 className="text-2xl  lg:text-4xl font-bold text-[#14171a]">
        {title}
      </h1>

      {/* Author */}
      <div className="border-y-2 border-red-200 my-2 py-2 mt-10">
        <address className="flex items-center">
          <div>
            <Avatar
              userId={"admin"}
              name="Goff Phattharawit"
              size="sm"
              url="https://firebasestorage.googleapis.com/v0/b/yallyo.appspot.com/o/us%2Fc9329070-3ea4-4533-be3e-dfa606000829.jpeg?alt=media"
              color=""
              hilight={false}
              clickable={false}
            />
          </div>

          <div className="md:flex items-center justify-between text-sm md:text-base w-full ml-4">
            <p className="">
              <span itemProp="author" className="font-semibold">
                Goff Phattharawit
              </span>
            </p>
            <p className="pt-2 md:pt-0">
              Published on{" "}
              <time itemProp="datePublished" dateTime="YYYY-MM-DD">
                {publishedAt}
              </time>
            </p>
          </div>
        </address>
      </div>

      {/* Hero Image */}
      <div className="mt-10">
        <img src={heroImageUrl} alt={heroImageAlt} />
      </div>
    </header>
  );
};

export default BlogHeader;
