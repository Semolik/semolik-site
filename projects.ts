enum statuses {
    inProgress = "В разработке",
    done = "Завершен",
    notSupported = "Не поддерживается",
    suspended = "Приостановлен",
}
enum ProjectTags {
    nuxt = "Nuxt.js",
    fastapi = "FastAPI",
    sqlalchemy = "SQLAlchemy",
    postgresql = "PostgreSQL",
    react = "React.js",
    flask = "Flask",
    python = "Python",
    telethon = "Telethon",
    javascript = "JavaScript",
    redis = "Redis",
    vue = "Vue.js",
    arduino = "Arduino",
    electron = "Electron",
    celery = "Celery",
}
declare interface repoInfo {
    owner: string;
    name: string;
}

declare interface ProjectType {
    title: string;
    shortDescription: string;
    image: string;
    head: string | null;
    tags: string[];
    repo: repoInfo | null;
    mdFile?: boolean;
    period: string;
    status: statuses[];
    screenshots: string[];
    url: string | null;
}
interface projectExport extends ProjectType {
    id: string;
    git: string | null;
}
const projectsInfo: ProjectType[] = [
    {
        title: "AnimePlayer v2",
        shortDescription:
            "Переработанная версия AnimePlayer с новым функционалом",
        image: "/projects/AnimePlayer-v2/title.png",
        tags: [
            ProjectTags.nuxt,
            ProjectTags.fastapi,
            ProjectTags.redis,
            ProjectTags.sqlalchemy,
            ProjectTags.celery,
            ProjectTags.postgresql,
        ],
        repo: {
            owner: "semolik",
            name: "AnimePlayer",
        },
        period: "Август - Октябрь 2024",
        status: [statuses.suspended],
        screenshots: [
            "/projects/AnimePlayer-v2/1.png",
            "/projects/AnimePlayer-v2/2.png",
            "/projects/AnimePlayer-v2/3.png",
            "/projects/AnimePlayer-v2/4.png",
            "/projects/AnimePlayer-v2/5.png",
        ],
        url: "https://anime.semolik.ru",
        head: null,
    },
    {
        title: "Lastfm discord status",
        shortDescription:
            "Приложение для трансляции текущей песни с Last.fm в дискорд-активность",
        image: "/projects/lastfm-discord-status/3.png",
        tags: [ProjectTags.nuxt, ProjectTags.electron],
        repo: {
            owner: "semolik",
            name: "lastfm-discord-status",
        },
        period: "Январь 2024",
        status: [statuses.suspended],
        screenshots: [
            "/projects/lastfm-discord-status/1.png",
            "/projects/lastfm-discord-status/2.png",
            "/projects/lastfm-discord-status/3.png",
            "/projects/lastfm-discord-status/4.png",
        ],
        url: null,
        head: null,
    },
    {
        title: "Semolik music",
        shortDescription: "Музыкальный сервис для начинающих музыкантов",
        image: "/projects/SemolikMusic/main.png",
        tags: [
            ProjectTags.nuxt,
            ProjectTags.fastapi,
            ProjectTags.sqlalchemy,
            ProjectTags.postgresql,
        ],
        repo: {
            owner: "semolik",
            name: "music",
        },
        period: "Ноябрь 2022 - Июнь 2023",
        status: [statuses.done],
        screenshots: [
            "/projects/SemolikMusic/1.png",
            "/projects/SemolikMusic/2.png",
            "/projects/SemolikMusic/3.png",
            "/projects/SemolikMusic/4.png",
        ],
        url: null,
        head: null,
    },
    {
        title: "AnimePlayer",
        shortDescription:
            "Сайт для просмотра аниме с сервисов Animevost и Anidub",
        image: "/projects/AnimePlayer/1.png",
        tags: [ProjectTags.react, ProjectTags.flask],
        repo: {
            owner: "semolik",
            name: "AnimePlayer",
        },
        period: "2022",
        status: [statuses.notSupported],
        screenshots: [
            "/projects/AnimePlayer/1.png",
            "/projects/AnimePlayer/2.png",
            "/projects/AnimePlayer/3.png",
            "/projects/AnimePlayer/4.png",
            "/projects/AnimePlayer/5.png",
        ],
        url: "https://anime.semolik.ru",
        head: null,
    },
    {
        title: "ASUtimetable",
        shortDescription:
            "Приложение для просмотра расписания занятий университета",
        image: "/projects/ASUtimetable/1.png",
        tags: [ProjectTags.vue, ProjectTags.fastapi, ProjectTags.redis],
        repo: {
            owner: "semolik",
            name: "ASUtimetable",
        },
        period: "2022",
        status: [statuses.notSupported],
        screenshots: [
            "/projects/ASUtimetable/1.png",
            "/projects/ASUtimetable/2.png",
            "/projects/ASUtimetable/3.png",
            "/projects/ASUtimetable/4.png",
        ],
        url: null,
        head: null,
    },
    {
        title: "Semolik bot",
        shortDescription: "Бот для Telegram c различными функциями",
        tags: [ProjectTags.python, ProjectTags.telethon],
        repo: null,
        mdFile: true,
        period: "2020 - 2021",
        status: [statuses.notSupported, statuses.done],
        screenshots: [],
        url: "https://t.me/Semolik_bot",
        head: "/projects/SemolikBot/slider.png",
        image: "/projects/SemolikBot/avatar.jpg",
    },
    {
        title: "RC-Car",
        shortDescription:
            "Машинка на радиоуправлении с Arduino и контроллером PS2",
        image: "/projects/Car/1.png",
        tags: [ProjectTags.arduino],
        repo: {
            owner: "semolik",
            name: "Car",
        },
        period: "2023",
        status: [statuses.done],
        screenshots: [],
        url: null,
        head: "/projects/Car/slider.png",
    },
    {
        title: "AnimeVostPlayer",
        shortDescription:
            "Сайт для просмотра аниме с сервиса AnimeVost, один из моих первых сайтов",
        image: "/projects/AnimeVostPlayer/1.png",
        tags: [ProjectTags.javascript],

        repo: {
            owner: "semolik",
            name: "AnimeVostPlayer",
        },
        period: "2021 - 2022",
        status: [statuses.done, statuses.notSupported],
        screenshots: [
            "/projects/AnimeVostPlayer/1.png",
            "/projects/AnimeVostPlayer/2.png",
            "/projects/AnimeVostPlayer/3.png",
            "/projects/AnimeVostPlayer/4.png",
        ],
        url: "https://old-anime-player.semolik.ru",
        head: null,
    },
];
const projects: projectExport[] = (projectsInfo as projectExport[]).map(
    (project) => {
        project.id = project.title.toLowerCase().replace(/\s/g, "-");
        project.git = project.repo
            ? `https://github.com/${project.repo.owner}/${project.repo.name}/`
            : null;
        return project;
    }
);
export { projects, ProjectTags, statuses };
export type { projectExport };
