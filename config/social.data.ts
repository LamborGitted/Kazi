interface BilibiliConfig {
    show: boolean;
    homepage_url: string;

    //icon_auto: true时，icon字段无效，自动使用b站头像
    icon_auto: boolean;
    icon: string;

    //优先级：video_show_auto >  video_list
    show_video_list: boolean;
    video_list : string[];
    
    background_img : string;
}

interface GithubConfig {
    show: boolean;
    homepage_url: string;

    //icon_auto: true时，icon字段无效，自动使用github头像
    icon_auto: boolean;
    icon: string;

    //优先级：repo_show_auto >  repo_list
    //repo_show_auto: true时，自动显示最近更新的仓库，false时显示repo_list中的仓库
    show_repo_list: boolean;
    repo_show_auto: boolean;
    repo_list : string[];

    background_img : string;
}

interface OSUConfig {
    show: boolean;
    homepage_url: string;
    
    //icon_auto: true时，icon字段无效，自动使用osu头像
    icon_auto: boolean;
    icon: string;

    //优先级：recent_score_show_auto >  recent_score_list
    //recent_score_show_auto: true时，自动显示最近的成绩，false时显示recent_score_list中的成绩
    show_recent_score_list: boolean;
    recent_score_show_auto: boolean;
    recent_score_list : string[];

    background_img : string;
}

interface XConfig {
    show: boolean;
    homepage_url: string;
    
    //icon_auto: true时，icon字段无效，自动使用X头像
    icon_auto: boolean;
    icon: string;
    
    //优先级：tweet_show_auto >  tweet_list
    //tweet_show_auto: true时，自动显示最近的推文，false时显示tweet_list中的推文
    show_tweet_list: boolean;
    tweet_show_auto: boolean;
    tweet_list : string[];

    background_img : string;
}

const bilibili_config: BilibiliConfig = {
    show: true,
    homepage_url: "https://space.bilibili.com/12345678",

    icon_auto: true,
    icon: "",

    show_video_list: false,
    video_list : [],

    background_img : "https://i0.hdslb.com/bfs/archive/1234567890abcdef1234567890abcdef12345678.jpg"
};

const github_config: GithubConfig = {
    show: true,
    homepage_url: "https://github.com/LamborGitted",

    icon_auto: true,
    icon: "",

    show_repo_list: false,
    repo_show_auto: false,
    repo_list : [],

    background_img : ""
};

const osu_config: OSUConfig = {
    show: true,
    homepage_url: "https://osu.ppy.sh/users/12345678",

    icon_auto: true,
    icon: "",

    show_recent_score_list: false,
    recent_score_show_auto: false,
    recent_score_list : [],
    background_img : ""
};

const x_config: XConfig = {
    show: true,
    homepage_url: "https://x.com/LamborGitted",

    icon_auto: true,
    icon: "",

    show_tweet_list: false,
    tweet_show_auto: false,
    tweet_list : [],
    background_img : ""
};

export { bilibili_config, github_config, osu_config, x_config };

