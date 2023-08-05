import { IBlog } from "@/types/frontend";

const LANGUAGES = [
  // Top 20 frist of this list is the most well know languages
  "English",
  "Chinese",
  "Spanish",
  "Thai",
  // "Hindi",
  // "Arabic",
  // "Bengali",
  // "Portuguese",
  // "Russian",
  // "Japanese",
  // "Punjabi",
  // "German",
  // "Javanese",
  // "Wu",
  // "Malay",
  // "Telugu",
  // "Vietnamese",
  // "Korean",
  // "French",
  // "Marathi",
  // "Tamil",
  // The remaining languages are sorted in ascending order
  // "Afrikaans",
  // "Albanian",
  // "Amharic",
  // "Azerbaijani",
  // "Basque",
  // "Belarusian",
  // "Bosnian",
  // "Bulgarian",
  // "Catalan",
  // "Cebuano",
  // "Corsican",
  // "Croatian",
  // "Czech",
  // "Danish",
  // "Dutch",
  // "Esperanto",
  // "Estonian",
  // "Finnish",
  // "Frisian",
  // "Galician",
  // "Georgian",
  // "Greek",
  // "Gujarati",
  // "Haitian Creole",
  // "Hausa",
  // "Hawaiian",
  // "Hebrew",
  // "Hmong",
  // "Hungarian",
  // "Icelandic",
  // "Igbo",
  // "Indonesian",
  // "Irish",
  // "Italian",
  // "Jamaican Creole",
  // "Kannada",
  // "Kazakh",
  // "Khmer",
  // "Kinyarwanda",
  // "Kirundi",
  // "Kurdish",
  // "Kyrgyz",
  "Lao",
  // "Latin",
  // "Latvian",
  // "Lithuanian",
  // "Luxembourgish",
  // "Macedonian",
  // "Malagasy",
  // "Malayalam",
  // "Maltese",
  // "Maori",
  // "Mongolian",
  // "Myanmar (Burmese)",
  // "Nepali",
  // "Norwegian",
  // "Nyanja (Chichewa)",
  // "Occitan",
  // "Oromo",
  // "Pashto",
  // "Persian",
  // "Polish",
  // "Pushto (Pashto)",
  // "Romanian",
  // "Samoan",
  // "Scots Gaelic",
  // "Serbian",
  // "Sesotho",
  // "Shona",
  // "Sindhi",
  // "Sinhala (Sinhalese)",
  // "Slovak",
  // "Slovenian",
  // "Somali",
  // "Southern Sotho",
  // "Sundanese",
  // "Swahili",
  // "Swedish",
  // "Tagalog (Filipino)",

  // "Tajik",
  // "Tatar",
  // "Tswana",
  // "Turkish",
  // "Turkmen",
  // "Ukrainian",
  // "Urdu",
  // "Uyghur",
  // "Uzbek",
  // "Welsh",
  // "Western Frisian",
  // "Xhosa",
  // "Yiddish",
  // "Yoruba",
  // "Zulu",
];

const LANGAUGE_LEVEL = [
  "Beginner",
  "Pre-Intermediate",
  "Intermediate",
  "Upper-Intermediate",
  "Advanced",
  "Native",
];

const JOINERS = [
  "Crhitiano Ronaldo",
  "Harry Macguire",
  "Lionel Messi",
  "Marcus Rashford",
  "Darwin Nudez",
];

const TOPICS = [
  "Technology",
  "Gaming",
  "Science",
  "Entertainment",
  "Music",
  "Art",
  "Food",
  "Travel",
  "Books",
  "Fashion",
  "Sports",
  "Fitness",
  "Health",
  "Education",
  "Business",
  "Finance",
  "Investing",
  "Marketing",
  "Social Media",
  "Politics",
];

// const TOPICS = [
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
//   "9",
//   "10",
//   "11",
//   "12",
//   "13",
//   "14",
//   "15",
//   "16",
//   "17",
//   "18",
//   "19",
//   "20",
//   "21",
//   "22",
//   "23",
// ];

const AVATARS = [
  "https://lh3.googleusercontent.com/a/AGNmyxa4fw_fbJkSJYvCqap6qbo0D22tHh5CJXOYdx0M",
  "https://lh3.googleusercontent.com/a/AGNmyxYvZdgLcKWMzYgSGeUbv3FuwUoTfxSSZeWlFBoZSZ4",
  "https://lh3.googleusercontent.com/a/AGNmyxY5-17HAGN31aGYKlVYPjemfIvwwWwN0JYVjsKZ3Q",
  "https://lh3.googleusercontent.com/a/AGNmyxZVn5Avc-C1CLCJxSom3JyadaPf0pN80T4v24PmSg",
  "https://lh3.googleusercontent.com/a/AGNmyxYA_nZOrpD98Xgy7wjHzvBIAx-skaTUI8A8xu_6Sw",
  "https://lh3.googleusercontent.com/a/AGNmyxYIliHN5TRi0miw0tfu8lDRUOOz6k8j9T5bWJqMVw",
  "https://lh3.googleusercontent.com/a/AGNmyxaRqXipGqAy5dR0M3K4AUsB9giKvzSFBGojp_PBZg",
  "https://lh3.googleusercontent.com/a/AGNmyxZ3ji_A3q_91TnPPhwQYwe3mWGV5NtixiVV-tu_",
  "https://lh3.googleusercontent.com/a/AGNmyxZ5hKtq9TAY_ST1JbvLnBNyF-4nrlzQq8-2C_tqMg",
  "https://lh3.googleusercontent.com/a/AGNmyxZ-CxDfvZIy25gXyGXWoKsupZV3eYFbZpT3ByLy",
  "https://lh3.googleusercontent.com/a/AGNmyxaliRfi1jbBcrrmZG3YgLmDVtxICNzoo_3m95Tbzw",
  "https://lh3.googleusercontent.com/a/AGNmyxYMwxChwKNa2fy-ua1x953ufzLPPi9BDNCtF6v0Bg",
  "https://lh3.googleusercontent.com/a/AGNmyxZm611Nvt062Lfr__IujUJfBt4nFYWpyPwa0gj5Ibc",
  "https://lh3.googleusercontent.com/a/AGNmyxbKz2n6gGK5FbY9CR9fnMzIKbWJbUN3AtNJuckuiQ",
  "https://lh3.googleusercontent.com/a/AGNmyxZUhlq10WzKJGpvr6lHfu7xDGrZm-SPii2GifJAdA",
  "https://lh3.googleusercontent.com/a/AGNmyxZirYV2uNblucPg_9un2G9NUxhBafwrtiYPcC0u",
  "https://lh3.googleusercontent.com/a/AGNmyxbOVWbNGw4wHWHEFs3QkUeTYgejihoVWI9vctUT",
  "https://lh3.googleusercontent.com/a/AGNmyxZNFbkCTJLoAYq6tOtpoV4Enx7fLLj8_KKUhLMSkA",
  "https://lh3.googleusercontent.com/a/AGNmyxZ0jhEAxGUc198SdXKFM7iBIRjvVp_eAYBjuvBttg",
  "https://lh3.googleusercontent.com/a/AGNmyxZI3tCQNHwl34W7sM6WkVzYfjxMYuntbOMwxWA3Sw",
  "https://lh3.googleusercontent.com/a/AGNmyxaKD_RmD-uXKvvC_hbBLgSPXSARyOLjwcbBJniowg",
  "https://lh3.googleusercontent.com/a/AGNmyxYj6vgtwLrUTUR5v-jqJq65S2zbqFOU1w5kPS6omA",
  "https://lh3.googleusercontent.com/a/AGNmyxZLeA5wb9c1Y_EwQpbwp_OXpLc8DDBBW0bRi6MqPA",
  "https://lh3.googleusercontent.com/a/AGNmyxbzKXMuhDQ4E3zW-hPSTFP5fFZzJcITzei06KDQUw",
  "https://lh3.googleusercontent.com/a/AGNmyxa6sjG9NFD9HeBLzfZRMj6z-57KXiOU-UCbKyc5Pw",
  "https://lh3.googleusercontent.com/a/AGNmyxYz3_JXiKgW4kIiIT9EZToheGPQE_SazVP1yw1p",
  "https://lh3.googleusercontent.com/a/AGNmyxb2rTtHrZ5IP6vGs7GdgRISrOx-fMWLjAJD82Cjujs",
  "https://lh3.googleusercontent.com/a/AGNmyxZHx210xuqFHFGngsZiSK0N91Cs95niv1iCPBR0",
  "https://lh3.googleusercontent.com/a/AGNmyxaQ9jenxcigihY_lFjtWY73J0srx7lfZ1ueT5E1ZQ",
  "https://lh3.googleusercontent.com/a/AGNmyxaj98TSVDOoir9wPK8ei00rCM0OXmKvETI4jSP4",
  "https://lh3.googleusercontent.com/a/AGNmyxZsn6OBjb8MkabuXbIB7oU6afw1YY0j-sypW-edfA",
  "https://lh3.googleusercontent.com/a/AGNmyxb8hHGCXw7qA0MNjKUxWN1FgwQc40cH8PM4El0J7A",
  "https://lh3.googleusercontent.com/a/AGNmyxbp0EoCkl0rpDSrQe7W1t5pU-OLz1_xfH070Oqo4g",
  "https://lh3.googleusercontent.com/a/AGNmyxZRMCYfDf_iT9OzsKGj5mLn6TcIiMCy7Ez786H5lDA",
  "https://lh3.googleusercontent.com/a/AGNmyxZcAnJgtF6HOgjrz4sI20EsI5FyqixPDTYiF49glg",
  "https://lh3.googleusercontent.com/a/AGNmyxbKn3LXW990YUwTrAenCwMplPBodh4RCmSnDA4fqA",
  "https://lh3.googleusercontent.com/a/AGNmyxZHkMPlUyj-9TJh_uGyOH6XRx_cIS3kq8HhMKn7cw",
  "https://lh3.googleusercontent.com/a/AGNmyxaiUCu6_guFU-JLw2aanMawiTWyqKIM1n9cgQH-4Q",
  "https://lh3.googleusercontent.com/a/AGNmyxZTVzulenHuqQrXV0KW2Itcd9StzCaoejP-LsrfTw",
  "https://lh3.googleusercontent.com/a/AGNmyxZHjpmQkU066DufULc7yye8RjWt_3Xz59w47uT9",
  "https://lh3.googleusercontent.com/a/AGNmyxZOqf1ixuSVRot66YGULIh9VV-DOH8CXrobC2gEnA",
  "https://lh3.googleusercontent.com/a/AGNmyxYZUEzka2lXzELm2Ptq46XWpwRpAbZ5AswK8--Q",
  "https://lh3.googleusercontent.com/a/AGNmyxbBj3QvqZx9VZcoZ2cpT_kyEeEmRJtUI-exrf7s5g",
  "https://lh3.googleusercontent.com/a/AGNmyxZphI42GZTaE6nnTApnovE2rZ285Kn_iWozoHwh4A",
  "https://lh3.googleusercontent.com/a/AGNmyxaR5FK02lOq8uALOUYEIHnyYWGja-hHaWy9ky3e2Q",
  "https://lh3.googleusercontent.com/a/AGNmyxbBg33mMFy8GbFPtsao0KkdhfY0rp8p-jP-YrNWCQ",
  "https://lh3.googleusercontent.com/a/AGNmyxajTEAomjebSOFwLuyOivDH0C0I1SzqGuBL9h8aEA",
  "https://lh3.googleusercontent.com/a/AGNmyxb_O7Nc1vKOp0092NqxaP1byRcCTxA5o9p_0BvcMA",
  "https://lh3.googleusercontent.com/a/AGNmyxY3j_5Ep2UALPnGDidwD7AdFkYQhXEwfEksmWhc",
  "https://lh3.googleusercontent.com/a/AGNmyxabKJiFD4CVNQCPvVTUV3OYJEZx63pdnq2r37EQ",
];

const ROOM_TYPES = [
  { value: "voice", display: "Voice Only" },
  { value: "video", display: "Voice + Video" },
];

const ENVS = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
  API_WS_URL: process.env.NEXT_PUBLIC_API_WS_URL!,
  ROOMS_REFRESH: +(process.env.NEXT_PUBLIC_ROOMS_REFRESH || 60000),
  ROOMS_ITEMS: +(process.env.NEXT_PUBLIC_ROOMS_ITEMS || 10),
  CREATE_ROOM_QUOTA: +(process.env.NEXT_PUBLIC_CREATE_ROOM_QUOTA || 5),
};

const BLOGS: IBlog[] = [
  {
    id: "blog1",
    title:
      "Break the Ice: How Yallyo Connects Strangers Worldwide for English Practice",
    intro:
      "Discover how Yallyo, a revolutionary voice-chat platform, connects strangers worldwide for English language practice. Engage in global conversations, break the ice, and form meaningful connections across cultures.",
    thumbnail:
      "https://pbs.twimg.com/media/F2qUj96bgAEjrKE?format=jpg&name=medium",
    slug: "/blog/how-yallyo-connects-strangers-worldwide-for-english-practice",
    author: {
      displayName: "Goff Phattharawit",
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/yallyo.appspot.com/o/us%2Fc9329070-3ea4-4533-be3e-dfa606000829.jpeg?alt=media",
      email: "",
      uid: "",
      idToken: "",
    },
    publishedAt: "2023-08-05",
  },
];

export {
  LANGUAGES,
  JOINERS,
  LANGAUGE_LEVEL,
  TOPICS,
  ROOM_TYPES,
  AVATARS,
  ENVS,
  BLOGS,
};
