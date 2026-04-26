import { defaultLocale, type Locale } from "./locales";
import type { Translations } from "./types";

const en: Translations = {
  nav: {
    home: "HOME",
    about: "ABOUT",
    blog: "BLOG",
    social: "SOCIAL",
    projects: "PROJECTS",
    contact: "CONTACT",
    music: "MUSIC",
  },
  hero: {
    subtitle: "Interest-driven Creation, Passion-driven Persistence",
    lines: ["Developer", "Creator", "osu! Mania Player", "Creative Coder", "Night Owl", "Open Source Enthusiast", "ACG Lover"],
    explore: "Explore My Cards",
  },
  about: {
    sectionTitle: "About",
    whoAmI: "Who am I",
    tagline: "Endless Curiosity, Boundless Creation",
    lines: ["Developer", "Creator", "osu! Mania Player", "Creative Coder", "Night Owl", "Open Source Enthusiast", "ACG Lover"],
    bio: "A developer who loves building things and exploring new technologies. Passionate about open source, rhythm games, Minecraft, and creative coding. Always chasing the next challenge — whether it's shipping a side project at 3am or hitting a new personal best on osu! Mania.",
    philosophy:
      "I believe the best way to learn is to build. Every project is a chance to experiment, break things, and discover something unexpected. Code is just another form of creative expression.",
    roles: [
      "Developer",
      "Creator",
      "Open Source Enthusiast",
      "osu! Mania Player",
      "Creative Coder",
      "Night Owl",
      "ACG Lover",
    ],
    interests: [
      { label: "Rhythm Games", emoji: "" },
      { label: "Open Source", emoji: "" },
      { label: "UI Design", emoji: "" },
      { label: "Music", emoji: "" },
      { label: "Anime", emoji: "" },
      { label: "Late Night Coding", emoji: "" },
    ],
    currently: [
      "Building personal homepage with React & Next.js",
      "Playing osu! Mania",
      "Exploring agents and AI tools",
    ],
    timeline: [
      {
        year: "2019",
        title: "First Steps in Programming",
        description: "Started learning to code, teaching myself C++ and Python",
      },
      {
        year: "2022-4",
        title: "The Charm of Rhythm",
        description: "Got hooked on osu!, especially Mania mode — chasing higher scores and faster reflexes",
      },
      {
        year: "2022-2024",
        title: "Intensifying High School Life",
        description: "Had to temporarily set aside my passions, but still held onto my own brilliant dreams",
      },
      {
        year: "2025-6",
        title: "Weaving Melodies",
        description: "Started arranging music, creating electronic tracks and game soundtracks — turning ideas into sound",
      },
      {
        year: "2025-7",
        title: "Frontend Adventure",
        description: "Began learning frontend development, exploring the world of the web and vanilla JS — falling deeper in love with coding",
      },
      {
        year: "2025-11",
        title: "First Vue.js Blog Project Begins",
        description: "Continued exploring and learning in tech, constantly improving my skills",
      },
      {
        year: "2025-12",
        title: "First Vue.js Blog Project Completed",
        description: "Gained invaluable experience from this project, fueling my drive to keep moving forward in frontend development",
      },
      {
        year: "2026-3",
        title: "Learn React & Next.js",
        description: "Started learning React and Next.js to build more complex, high-performance applications — quickly fell in love with component architecture and server-side rendering",
      },
      {
        year: "2026-4",
        title: "Building a React & Next.js Personal Homepage",
        description: "Discovered wonderful libraries and tools like Framer Motion, Tailwind CSS, and more — making the build process both challenging and endlessly fun",
      },
    ],
    cards: {
      bio: "Bio",
      currently: "Currently",
      philosophy: "Philosophy",
      techStack: "Tech Stack",
      interests: "Interests",
      journey: "Journey",
      thingsToLearn: "THINGS TO LEARN",
      getInTouch: "Get in touch",
      activeNow: "Active now",
    },
    briefIntro:
      "A developer who loves building things and exploring new technologies. Passionate about open source, rhythm games, and creative coding.",
    timelineSubtitle: "Journey",
    timelineHeading: "Timeline",
    timelineDescription:
      "Every milestone marks a step forward. From first lines of code to building real applications — this is the path that shaped who I am today.",
  },
  blog: {
    sectionTitle: "Blog",
    heading: "Thoughts",
    description:
      "Ideas, learnings, and explorations in code, design, and life.",
    searchPlaceholder: "Search posts...",
    filteredBy: "Filtered by",
    clear: "Clear",
    noPostsFound: "No posts found",
    withTag: "with tag",
    matching: "matching",
    clearAllFilters: "Clear all filters",
    minRead: "min read",
    backToBlog: "Back to Blog",
    morePosts: "More Posts",
    share: "Share",
    copyLink: "Copy Link",
    copied: "Copied!",
  },
  contact: {
    heading: "CONTACT",
    subtitle: "Get in touch",
    description:
      "Have a question or want to work together? Drop me a message.",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
    sending: "Sending...",
    sent: "Message Sent",
    sentDescription:
      "Thank you for reaching out. I'll get back to you soon.",
    sendAnother: "Send another message →",
    error: "Something went wrong. Please try again.",
  },
  social: {
    heading: "SOCIAL",
    subtitle: "Connect",
    description: "Where I share, create, and connect with the world",
  },
  projects: {
    heading: "PROJECTS",
    subtitle: "What I Build",
    description:
      "A collection of things I've built — from open source tools to Minecraft mods.",
    filterAll: "All",
    filterOpensource: "Open Source",
    filterMinecraft: "Minecraft",
    viewProject: "View Project",
    categories: {
      opensource: "Open Source",
      minecraft: "Minecraft",
    },
  },
  music: {
    heading: "MUSIC",
    subtitle: "Listen",
    description:
      "Original arrangements and electronic compositions. Download and enjoy.",
    download: "Download",
    noTracks: "No tracks yet. Stay tuned.",
  },
  footer: {
    about: "About",
    aboutDescription:
      "My little corner of the internet. Building things, playing rhythm games, and exploring the web.",
    online: "Online",
    navigation: "Navigation",
    home: "Home",
    connect: "Connect",
    backToTop: "Back to top",
    designedWith: "Designed with intent",
  },
  base: {
    title: "Lantxx Personal Homepage",
    description: "Endless Curiosity, Boundless Creation",
  },
};

const zh: Translations = {
  nav: {
    home: "HOME",
    about: "ABOUT",
    blog: "BLOG",
    social: "SOCIAL",
    projects: "PROJECTS",
    contact: "CONTACT",
    music: "MUSIC",
  },
  hero: {
    subtitle: "`兴趣使然创造，热爱依旧坚持`",
    lines: ["开发者", "创作者", "Osu! Mania 玩家", "创意编程者", "夜猫子", "开源爱好者", "ACG 爱好者"],
    explore: "探索我的卡片",
  },
  about: {
    sectionTitle: "About",
    whoAmI: "我是谁",
    tagline: "认知无限，创造无穷",
    lines: ["开发者", "创作者", "Osu! Mania 玩家", "创意编程者", "夜猫子", "开源爱好者", "ACG 爱好者"],
    bio: "一个热爱构建和探索新技术的开发者。热衷于开源、音游、Minecraft 和创意编程。始终在追寻下一个挑战——无论是凌晨三点上线一个副业项目，还是在 osu! Mania 上刷新个人最佳。",
    philosophy:
      "我相信最好的学习方式就是动手尝试。每个项目都是一次实验、打破常规、发现意外的机会。代码只是创意表达的另一种形式。",
    roles: [
      "开发者",
      "创作者",
      "开源爱好者",
      "osu! Mania 玩家",
      "创意编程者",
      "夜猫子",
      "ACG 爱好者",
    ],
    interests: [
      { label: "音游", emoji: "" },
      { label: "开源", emoji: "" },
      { label: "UI 设计", emoji: "" },
      { label: "音乐", emoji: "" },
      { label: "动漫", emoji: "" },
      { label: "深夜编码", emoji: "" },
    ],
    currently: ["用 React & Next.js 构建个人主页", "玩 osu! Mania", "探索 agents 和 AI 工具"],
    timeline: [
      {
        year: "2019",
        title: "初入编程世界",
        description: " 接触编程，开始自学 C++ 和 Python",
      },
      {
        year: "2022-4",
        title: "音符跳动的魅力",
        description: "音乐游戏，尤其是osu!Mania 模式，开始追求更高的分数和更快的反应",
      },
      {
        year: "2022-2024",
        title: "日益紧张的高中生活",
        description: "暂时得放下热爱，但仍坚持着属于自己的璀璨的梦想",
      },
      {
        year: "2025-6",
        title: "成为旋律的编织者",
        description: "开始尝试编曲，创作电子音乐和游戏配乐，享受将想法变成声音的过程",
      },
      {
        year: "2025-7",
        title: "前端开发的冒险",
        description: "开始学习前端开发，探索网页世界和原生js，不断热爱不断学习",
      },
      {
        year: "2025-11",
        title: "第一个vue.js博客项目的开始",
        description: "继续在技术领域探索和学习，不断提升自己的能力",
      },
      {
        year: "2025-12",
        title: "完成第一个vue.js博客项目",
        description: "通过这个项目，积累了宝贵的经验，并激励自己继续在前端开发的道路上前进",
      },
      {
        year: "2026-3",
        title: "学习React和Next.js",
        description: "为了构建更复杂和高性能的应用，开始学习React和Next.js，并迅速爱上了它们的组件化和服务端渲染特性",
      },
      {
        year: "2026-4",
        title: "着手构建由React和Next.js的个人主页",
        description: "遇到了各种美妙的库和工具，如Framer Motion、Tailwind CSS等，使得构建过程既充满挑战又乐趣无穷",
      },
    ],
    cards: {
      bio: "简介",
      currently: "当前",
      philosophy: "理念",
      techStack: "技术栈",
      interests: "兴趣",
      journey: "旅程",
      thingsToLearn: "旅途进行中",
      getInTouch: "联系我",
      activeNow: "在线中",
    },
    briefIntro:
      "一个热爱构建和探索新技术的开发者。热衷于开源、音游和创意编程。",
    timelineSubtitle: "旅程",
    timelineHeading: "时间线",
    timelineDescription:
      "每一个里程碑都是前进的一步。从写下第一行代码到构建真正的应用——这是塑造了今日之我的旅程。",
  },
  blog: {
    sectionTitle: "博客",
    heading: "Thoughts",
    description: "关于代码、设计和生活的想法、学习与探索。",
    searchPlaceholder: "搜索文章...",
    filteredBy: "筛选：",
    clear: "清除",
    noPostsFound: "未找到文章",
    withTag: "标签为",
    matching: "匹配",
    clearAllFilters: "清除所有筛选",
    minRead: "分钟阅读",
    backToBlog: "返回博客",
    morePosts: "更多文章",
    share: "分享",
    copyLink: "复制链接",
    copied: "已复制！",
  },
  contact: {
    heading: "CONTACT",
    subtitle: "取得联系",
    description: "有问题或想合作？给我留言吧。",
    name: "姓名",
    email: "邮箱",
    subject: "主题",
    message: "消息",
    send: "发送消息",
    sending: "发送中...",
    sent: "消息已发送",
    sentDescription: "感谢您的来信，我会尽快回复您。",
    sendAnother: "再发一条消息 →",
    error: "出了点问题，请重试。",
  },
  social: {
    heading: "SOCIAL",
    subtitle: "连接",
    description: "我分享、创作和与世界连接的地方",
  },
  projects: {
    heading: "PROJECTS",
    subtitle: "我的作品",
    description:
      "我制作的作品集合——从开源工具到 Minecraft 模组。",
    filterAll: "全部",
    filterOpensource: "开源",
    filterMinecraft: "我的世界",
    viewProject: "查看项目",
    categories: {
      opensource: "开源",
      minecraft: "我的世界Mod",
    },
  },
  music: {
    heading: "MUSIC",
    subtitle: "聆听",
    description:
      "原创编曲与电子作品。下载并享受。",
    download: "下载",
    noTracks: "暂无曲目，敬请期待。",
  },
  footer: {
    about: "关于",
    aboutDescription:
      "互联网上的神秘角落。",
    online: "online",
    navigation: "导航",
    home: "首页",
    connect: "社交",
    backToTop: "回到顶部",
    designedWith: "热爱生活与技术",
  },
  base: {
    title: "Lantxx 个人主页",
    description: "认知无限，创造无穷",
  },
};

function getDict(locale: Locale) {
  return locale === "zh" ? zh : en;
}

export function t(locale: Locale, path: string): unknown {
  const keys = path.split(".");
  let current: Record<string, unknown> = getDict(locale) as unknown as Record<string, unknown>;
  for (const key of keys) {
    if (typeof current === "object" && current !== null && key in current) {
      const val = current[key];
      current = val as Record<string, unknown>;
    } else {
      let fb: Record<string, unknown> = getDict(defaultLocale) as unknown as Record<string, unknown>;
      for (const k of keys) {
        if (typeof fb === "object" && fb !== null && k in fb) {
          fb = fb[k] as Record<string, unknown>;
        } else {
          return path;
        }
      }
      return fb;
    }
  }
  return current;
}

export function getTranslations(locale: Locale): Translations {
  return getDict(locale);
}

export type { Translations };
