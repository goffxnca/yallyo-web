import {
  CircleStackIcon,
  FingerPrintIcon,
  ListBulletIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

const Rules = () => {
  const rules = [
    "Respect others: Users must show respect towards other users at all times. No form of harassment, hate speech, or bullying will be tolerated",
    "No explicit content: Users must not share any explicit or offensive content, including nudity, sexual content, or violence",
    "No spamming: Users must not spam the chat room with repetitive messages, links, or promotions",
    "No sharing personal information: Users must not share any personal information, including phone numbers, email addresses, or social media handles.",
    "No hacking or cheating: Users must not use any hacking or cheating tools to manipulate the website or the chat room",
    "No illegal activities: Users must not engage in any illegal activities, including sharing pirated content or promoting illegal substances",
    "Moderators have final say: Moderators have the final say on all matters related to the chat room. Their decisions must be respected by all users",
    "User-generated content: Users are responsible for the content they share in the chat room. The website is not responsible for any user-generated content",
    "Use at your own risk: Users use the chat room at their own risk. The website is not responsible for any damages, losses, or injuries that may occur while using the service.",
    "Violations will result in consequences: Users who violate any of these rules may be warned, kicked out of the chat room, or banned from the website altogether, depending on the severity of the violation",
  ];
  return (
    <div className="p-5 md:p-10 md:w-[600px] text-white">
      <div className="h-96 md:h-auto overflow-scroll">
        <h2 className="text-accent2 text-3xl text-center mb-6">
          Community Rules
        </h2>
        <ul className="list-item text-sm">
          {rules.map((rule, index) => (
            <li key={index} className="mb-3 flex">
              <div className="mr-1">
                <MegaphoneIcon className="w-5 h-5" />
              </div>

              <div>{rule}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rules;
