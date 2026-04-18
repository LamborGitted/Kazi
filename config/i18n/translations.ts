import { defaultLocale, type Locale } from "./locales";

type TranslationValue = string | readonly string[] | readonly unknown[] | { readonly [key: string]: TranslationValue };
type Translations = { readonly [key: string]: TranslationValue };

const en: Translations = {
  nav: {
    about: "About",
    blog: "Blog",
    social: "Social",
    contact: "Contact",
  },
  hero: {
    subtitle: "Learn more, Build more",
    lines: ["Developer", "Creator", "Osu! Mania Player"],
    explore: "Explore My World",
  },
  about: {
    sectionTitle: "About",
    whoAmI: "Who am I",
    tagline: "Learn more, Build more",
    bio: "A developer who loves building things and exploring new technologies. Passionate about open source, rhythm games, and creative coding. Always chasing the next challenge — whether it's shipping a side project at 3am or hitting a new personal best on osu! Mania.",
    philosophy:
      "I believe the best way to learn is to build. Every project is a chance to experiment, break things, and discover something unexpected. Code is just another form of creative expression.",
    roles: [
      "Developer",
      "Creator",
      "Open Source Enthusiast",
      "osu! Mania Player",
      "Creative Coder",
      "Night Owl",
    ],
    interests: [
      { label: "Rhythm Games", emoji: "🎵" },
      { label: "Open Source", emoji: "🔓" },
      { label: "UI Design", emoji: "🎨" },
      { label: "Music", emoji: "🎧" },
      { label: "Anime", emoji: "✨" },
      { label: "Late Night Coding", emoji: "🌙" },
    ],
    currently: [
      "Building personal projects",
      "Playing osu! Mania",
      "Exploring new frameworks",
    ],
    timeline: [
      {
        year: "2024",
        title: "Building & Learning",
        description:
          "Started building personal homepage and open source projects",
      },
      {
        year: "2023",
        title: "Exploring Tech",
        description:
          "Deep dive into React, Next.js and modern web technologies",
      },
      {
        year: "2022",
        title: "Getting Started",
        description:
          "Began the coding journey, learning programming fundamentals",
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
  footer: {
    about: "About",
    aboutDescription:
      "Personal corner on the internet. Building things, playing rhythm games, and exploring the web.",
    online: "Online",
    navigation: "Navigation",
    home: "Home",
    connect: "Connect",
    backToTop: "Back to top",
    designedWith: "Designed with intent",
  },
  base: {
    title: "Lantxx Personal Homepage",
    description: "Learn more , Build more",
  },
};

const zh: Translations = {
  nav: {
    about: "关于",
    blog: "博客",
    social: "社交",
    contact: "联系",
  },
  hero: {
    subtitle: "学得更多，造得更多",
    lines: ["开发者", "创作者", "Osu! Mania 玩家"],
    explore: "探索我的世界",
  },
  about: {
    sectionTitle: "关于",
    whoAmI: "我是谁",
    tagline: "学得更多，造得更多",
    bio: "一个热爱构建和探索新技术的开发者。热衷于开源、音游和创意编程。始终在追寻下一个挑战——无论是凌晨三点上线一个副业项目，还是在 osu! Mania 上刷新个人最佳。",
    philosophy:
      "我相信最好的学习方式就是动手构建。每个项目都是一次实验、打破常规、发现意外的机会。代码只是创意表达的另一种形式。",
    roles: [
      "开发者",
      "创作者",
      "开源爱好者",
      "osu! Mania 玩家",
      "创意编程者",
      "夜猫子",
    ],
    interests: [
      { label: "音游", emoji: "🎵" },
      { label: "开源", emoji: "🔓" },
      { label: "UI 设计", emoji: "🎨" },
      { label: "音乐", emoji: "🎧" },
      { label: "动漫", emoji: "✨" },
      { label: "深夜编码", emoji: "🌙" },
    ],
    currently: ["构建个人项目", "玩 osu! Mania", "探索新框架"],
    timeline: [
      {
        year: "2024",
        title: "构建与学习",
        description: "开始搭建个人主页和开源项目",
      },
      {
        year: "2023",
        title: "探索技术",
        description: "深入学习 React、Next.js 和现代 Web 技术",
      },
      {
        year: "2022",
        title: "启程",
        description: "开始编程之旅，学习编程基础",
      },
    ],
    cards: {
      bio: "简介",
      currently: "当前",
      philosophy: "理念",
      techStack: "技术栈",
      interests: "兴趣",
      journey: "旅程",
      thingsToLearn: "待学之事",
      getInTouch: "联系我",
      activeNow: "在线中",
    },
    briefIntro:
      "一个热爱构建和探索新技术的开发者。热衷于开源、音游和创意编程。",
  },
  blog: {
    sectionTitle: "博客",
    heading: "想法",
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
  },
  contact: {
    heading: "联系",
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
    heading: "社交",
    subtitle: "连接",
    description: "我分享、创作和与世界连接的地方",
  },
  footer: {
    about: "关于",
    aboutDescription:
      "互联网上的个人角落。构建项目，玩音游，探索 Web。",
    online: "在线",
    navigation: "导航",
    home: "首页",
    connect: "社交",
    backToTop: "回到顶部",
    designedWith: "用心设计",
  },
  base: {
    title: "Lantxx 个人主页",
    description: "学得更多，造得更多",
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _dictionaries: { en: Translations; zh: Translations } = { en, zh };

function getDict(locale: Locale) {
  return locale === "zh" ? zh : en;
}

export function t(locale: Locale, path: string): TranslationValue {
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
      return fb as TranslationValue;
    }
  }
  return current as TranslationValue;
}

export function getTranslations(locale: Locale): Translations {
  return getDict(locale);
}

export type { Translations, TranslationValue };
