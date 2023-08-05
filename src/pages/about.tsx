import Button from "@/components/Forms/Button";
import PageContainer from "@/components/Layouts/PageContainer";
import { useRouter } from "next/router";

const AboutMe = () => {
  const router = useRouter();

  const handleGoHomeClick = () => {
    router.replace("/");
  };

  return (
    <PageContainer>
      <div className="flex justify-center">
        <div className="text-gray-300 bg-secondary p-10 rounded-3xl lg:w-[1000px] space-y-10">
          <figure>
            <img
              className="mx-auto h-32 w-32  object-cover rounded-full"
              src={
                "https://firebasestorage.googleapis.com/v0/b/yallyo.appspot.com/o/us%2Fc9329070-3ea4-4533-be3e-dfa606000829.jpeg?alt=media"
              }
              alt="Founder of Yallyo Platform"
            />
            <figcaption className="text-center text-accent2">
              Goff Phattharawit - Yallyo Founder
            </figcaption>
          </figure>
          <p>
            👋 Hi there! My name is Obiyofin, As a passionate software
            developer, I love building things that are truly useful for people.
            One thing that brings me immense joy is learning English. I&apos;ve
            tried various platforms in my quest to master the language, but none
            of them worked the way I wanted. So, I made a decision to invest a
            lot of my free time into creating this platform.
          </p>

          <p>
            This platform has been inspired by the fantastic designs of major
            social media platform out there. My vision is to provide an
            opportunity for everyone to learn English and practice speaking it
            with real people. Personally, I used to spend a lot of time only
            reading books, but when it came to actually speaking with
            foreigners, I found myself struggling to express myself fluently.
            That&apos;s when it struck me that engaging in conversations with
            natives or people from different cultures could significantly
            enhance English learning.
          </p>

          <p>
            Now, I must admit, I&apos;m quite the introverted person. I have
            only a handful of close friends in real life that I can count on.
            Building this platform has become a means for me to connect with
            people and expand my social circle ❤️. Through this platform, you
            can enjoy voice calls, video calls, and group chat rooms. Currently,
            we allow a maximum of five people in each room, and we primarily
            support English, Chinese, and Spanish—the most widely spoken
            languages in the world. However, I&apos;m open to adding more
            languages and other features if there is a demand for them. Feel
            free to join our vibrant and like-minded community on our Facebook
            group,{" "}
            <a
              href="https://www.facebook.com/groups/yallyo.community"
              target="_blank"
              className="text-blue-400"
            >
              Yallyo - Language Exchange International Community
            </a>{" "}
            Also, don&apos;t forget to show your support by liking, sharing, and
            following the{" "}
            <a
              href="https://www.facebook.com/yallyo.official/"
              target="_blank"
              className="text-blue-400"
            >
              Yallyo Official Facebook Fanpage
            </a>
            . Your engagement would be greatly appreciated as it helps us reach
            more language enthusiasts and create a thriving community.
          </p>

          <p>
            Join us on our language learning journey to make a positive impact
            together! Cheers! 🍺 See you there!
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
