import { useEffect, useState } from "react";
import StickyNavbar from "../StickyNavbar";
import { ref, getDownloadURL } from "firebase/storage";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  FileBadge,
  Check,
  Code2,
  UserCheck,
  Mail,
  Phone,
  Trophy,
  School,
} from "lucide-react";
import { storage } from "../../../firebaseConfig";

const profile = {
  name: "李慧芯",
  //role: "兒童程式教育講師",
  phone: "0917444454",
  email: "otzhelen2018@gmail.com",
  photo: "ok-001.jpg",
};

const sections = [
  {
    title: "學歷",
    icon: School,
    items: ["國立台北科技大學 電機工程系 控制組 碩一 (在學)"],
  },
  {
    title: "工作經歷 & 教學經驗",
    icon: BriefcaseBusiness,
    items: [
      "軟體協作開發",
      "大學數位數學學伴 國立勤益科技大學",
      "2021年華碩文教基金會 i-Taiwan\n 數位志工計畫 隊輔",
      "111年寒假教育優先區營隊 隊輔",
    ],
  },
  {
    title: "特質",
    icon: UserCheck,
    items: ["學習力強", "持之以恆", "遇強則強", "舉一反三"],
  },
  {
    title: "擅長語言",
    icon: Code2,
    items: ["Python", "HTML/CSS/JavaScript"],
  },
  {
    title: "證照",
    icon: FileBadge,
    items: [
      "室內配線乙級",
      "工業配線丙級",
      "PVQC 專業級",
      "原住民族語能力認證中級",
      "SiliconStone C 程式語言",
      "SiliconStone Python",
      "SiliconStone HTML5",
    ],
  },
  {
    title: "獲獎紀錄",
    icon: Trophy,
    highlight: true,
    boldKeywords: ["佳作", "第三名", "第一名"],
    items: [
      "2024 技職杯黑克松中區分區賽佳作",
      "2024 日四技實務專題競賽第三名",
      "2024 TIRC 台灣智慧機器人大賽 A3-L 自走機器人搬運資源競速競賽大專組第一名",
    ],
  },
];

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderBoldText(text, keywords) {
  if (keywords.length === 0) {
    return text;
  }

  const pattern = new RegExp(`(${keywords.map(escapeRegExp).join("|")})`, "g");

  return text.split(pattern).map((part, index) =>
    keywords.includes(part) ? (
      <strong key={`${part}-${index}`} className="font-bold text-zinc-950">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

function FirebaseProfilePhoto({ path, alt }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchImageUrl() {
      try {
        const imageRef = ref(storage, path);
        const url = await getDownloadURL(imageRef);

        if (isMounted) {
          setImageUrl(url);
        }
      } catch (error) {
        console.error("Error fetching profile image from Firebase:", error);
      }
    }

    fetchImageUrl();

    return () => {
      isMounted = false;
    };
  }, [path]);

  if (!imageUrl) {
    return null;
  }

  return (
    <img src={imageUrl} alt={alt} className="h-full w-full object-contain" />
  );
}

function ResumeSection({
  title,
  icon,
  items,
  sectionIndex,
  boldKeywords = [],
  highlight = false,
}) {
  const Icon = icon;
  const isRoundBullet = sectionIndex % 2 === 1;

  return (
    <section className="border-t border-zinc-800 pt-3 text-left">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-5 w-5 text-blue-700" aria-hidden="true" />
        <h2 className="text-xl font-bold tracking-normal text-zinc-950">
          {title}
        </h2>
      </div>
      <ul className="grid gap-x-12 gap-y-2 md:grid-cols-2">
        {items.map((item) => {
          const shouldSpanFull =
            (title === "獲獎紀錄" && item.includes("TIRC")) ||
            (title === "學歷" && item.includes("國立台北科技大學"));
          const shouldUseRedCheck =
            title === "證照" && item.includes("SiliconStone");

          return (
            <li
              key={item}
              className={`flex min-w-0 items-start gap-3 text-[15px] leading-7 text-zinc-900 ${
                shouldSpanFull ? "md:col-span-2" : ""
              }`}
            >
              {shouldUseRedCheck ? (
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-red-500"
                  aria-hidden="true"
                />
              ) : (
                <span
                  className={`mt-3 h-2 w-2 shrink-0 ${
                    highlight ? "bg-red-500" : "bg-blue-700"
                  } ${isRoundBullet ? "rounded-full" : ""}`}
                  aria-hidden="true"
                />
              )}
              <span
                className={`${highlight ? "font-medium" : ""} min-w-0 whitespace-pre-line break-words`}
              >
                {renderBoldText(item, boldKeywords)}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function Resume() {
  return (
    <main className="min-h-screen bg-zinc-100 px-3 pb-6 pt-21 text-zinc-950 sm:px-6 lg:py-12">
      <StickyNavbar />
      <article className="mx-auto w-full max-w-[820px] bg-white px-4 py-6 shadow-[0_16px_50px_rgba(15,23,42,0.16)] sm:px-8 sm:py-9 lg:px-10">
        <header className="grid items-center gap-6 border-zinc-800 lg:grid-cols-[128px_1fr_230px]">
          <div className="profile-photo-frame mx-auto lg:mx-0">
            <FirebaseProfilePhoto
              path={profile.photo}
              alt={`${profile.name} 頭像`}
            />
          </div>

          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-[0.18em] text-blue-700">
              Interview Resume
            </p>
            <h1 className="inline-block border-b-4 border-blue-700 pb-1 text-3xl font-black tracking-normal text-zinc-950 sm:text-4xl">
              個人簡歷
            </h1>
            {/*<p className="mt-3 text-base font-semibold text-zinc-700">{profile.role}</p>*/}
          </div>

          <div className="space-y-2 text-center lg:text-right">
            <h2 className="text-2xl font-black tracking-normal text-zinc-950">
              {profile.name}
            </h2>
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center justify-center gap-2 text-sm text-zinc-800 lg:justify-end"
            >
              <span>{profile.phone}</span>
              <Phone className="h-4 w-4 text-blue-700" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-center gap-2 break-all text-sm text-blue-700 underline-offset-4 hover:underline lg:justify-end"
            >
              <span>{profile.email}</span>
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </header>

        <div className="mt-5 space-y-5">
          {sections.map((section, index) => (
            <ResumeSection
              key={section.title}
              sectionIndex={index}
              {...section}
            />
          ))}
        </div>
      </article>
    </main>
  );
}
