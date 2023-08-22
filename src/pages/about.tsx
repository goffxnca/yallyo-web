import Button from "@/components/Forms/Button";
import PageContainer from "@/components/Layouts/PageContainer";
import Head from "next/head";
import { useRouter } from "next/router";

const AboutMe = () => {
  const router = useRouter();

  const handleGoHomeClick = () => {
    router.replace("/");
  };

  return (
    <PageContainer>
      <Head>
        <title>
          Meet the Founder of Yallyo | Dave Trenson | Language Learning
          Enthusiast
        </title>
        <meta
          name="description"
          content="Discover the visionary behind Yallyo, Dave Trenson, a dedicated software developer and language learning enthusiast. Learn how his personal journey to master English led to the creation of Yallyo, a platform that fosters genuine connections and conversations with native speakers worldwide. Join our inclusive community and embark on a journey of growth and cultural understanding. Connect with like-minded language learners on our vibrant Facebook group, Yallyo - Language Exchange International Community."
        />
      </Head>

      <div className="flex justify-center mb-10 md:mb-0">
        <div className="text-gray-300 bg-secondary p-4 md:p-10 rounded-3xl lg:w-[1000px] space-y-6">
          <figure>
            <img
              className="mx-auto h-32 w-32  object-cover rounded-full"
              src={
                "https://firebasestorage.googleapis.com/v0/b/yallyo.appspot.com/o/us%2F218.jpg?alt=media"
              }
              alt="Founder of Yallyo Platform"
            />
            <figcaption className="text-center text-accent2 mt-2">
              Yallyo Founder
            </figcaption>
          </figure>
          <p>
            👋 Hi there! My name is Dave Trenson, the Founder of Yallyo. As a
            dedicated software developer, my passion lies in creating impactful
            solutions that enrich people&apos;s lives. Language learning has
            always been close to my heart, and I am thrilled to introduce you to
            the world of Yallyo.
          </p>

          <p>
            The idea behind Yallyo was born out of my personal journey to master
            the English language. I explored numerous platforms, but none seemed
            to offer what I truly needed. Determined to bridge this gap, I
            invested countless hours crafting a platform that revolutionizes
            language practice.
          </p>

          <p>
            Yallyo is inspired by the brilliance of major social media
            platforms, but it goes beyond being just a virtual space. It is a
            platform designed to facilitate genuine connections and
            conversations that transcend borders and cultures.
          </p>

          <p>
            As someone who once struggled to express myself fluently, I
            understand the importance of engaging in real-life conversations
            with native speakers. Yallyo aims to provide language learners with
            an immersive environment where they can practice speaking English
            with confidence.
          </p>

          <p>
            Building this platform has not only been a professional endeavor but
            also a personal one. As an introverted individual with a small
            circle of close friends, Yallyo has opened doors to a whole new
            world of connections. It has become a means for me to expand my
            social horizons and create meaningful relationships with fellow
            language enthusiasts.
          </p>

          <p>
            At Yallyo, we foster an inclusive and supportive community where
            learners can engage in voice calls, video calls, and group chat
            rooms. Currently, we offer support for English, Chinese, and
            Spanish—the most widely spoken languages worldwide. However, I am
            eager to incorporate more languages and features based on your
            valuable feedback and needs.
          </p>

          <p>
            Join us on our journey of language discovery and cultural
            understanding. Our vibrant Facebook group,{" "}
            <a
              href="https://www.facebook.com/groups/yallyo.community"
              target="_blank"
              className="text-blue-400"
            >
              Yallyo - Language Exchange International Community
            </a>{" "}
            is the perfect place to connect with like-minded individuals. Your
            support on the{" "}
            <a
              href="https://www.facebook.com/yallyo.official/"
              target="_blank"
              className="text-blue-400"
            >
              Yallyo Official Facebook Fanpage
            </a>{" "}
            goes a long way in helping us reach more language enthusiasts and
            build a thriving community.
          </p>

          <p>
            Together, let&apos;s make a positive impact on the world of language
            learning. I invite you to be a part of Yallyo&apos;s vision and
            embark on a journey of growth and exploration. See you on Yallyo!
          </p>

          <div className="flex justify-center mt-4">
            <Button text="Go Back Home Page" emitClick={handleGoHomeClick} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AboutMe;
