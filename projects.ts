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

    period: string[];
    status: statuses[];
    screenshots: string[];
    worksNow: boolean;
    url: string | null;
}
interface projectExport extends ProjectType {
    id: string;
    git: string | null;
}
const projectsInfo: ProjectType[] = [
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
        // git: "https://github.com/semolik/music",
        repo: {
            owner: "semolik",
            name: "music",
        },
        period: ["Ноябрь 2022 - Июнь 2023"],
        status: [statuses.inProgress],
        screenshots: [
            "/projects/SemolikMusic/1.png",
            "/projects/SemolikMusic/2.png",
            "/projects/SemolikMusic/3.png",
            "/projects/SemolikMusic/4.png",
        ],
        url: null,
        worksNow: false,
        head: null,
    },
    {
        title: "AnimePlayer",
        shortDescription:
            "Сайт для просмотра аниме с сервисов Animevost и Anidub",
        image: "/projects/AnimePlayer/1.png",
        tags: [ProjectTags.react, ProjectTags.flask],
        // git: "https://github.com/Semolik/AnimePlayer",
        repo: {
            owner: "semolik",
            name: "AnimePlayer",
        },
        period: [
            "Январь 2022 - начало мая 2022",
            "Июль 2022",
            "Декабрь 2022 - январь 2023",
        ],
        status: [statuses.suspended],
        screenshots: [
            "/projects/AnimePlayer/1.png",
            "/projects/AnimePlayer/2.png",
            "/projects/AnimePlayer/3.png",
            "/projects/AnimePlayer/4.png",
            "/projects/AnimePlayer/5.png",
        ],
        worksNow: true,
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
        period: ["Ноябрь 2022"],
        status: [statuses.notSupported],
        screenshots: [
            "/projects/ASUtimetable/1.png",
            "/projects/ASUtimetable/2.png",
            "/projects/ASUtimetable/3.png",
            "/projects/ASUtimetable/4.png",
        ],
        worksNow: false,
        url: null,
        head: null,
    },
    {
        title: "Semolik bot",
        shortDescription: "Бот для Telegram c различными функциями",
        tags: [ProjectTags.python, ProjectTags.telethon],
        repo: null,
        period: ["Октябрь 2020 - Октябрь 2021"],
        status: [statuses.notSupported, statuses.done],
        screenshots: [],
        worksNow: true,
        url: "https://t.me/Semolik_bot",
        head: "/projects/SemolikBot/slider.png",
        image: "/projects/SemolikBot/avatar.jpg",
    },
    {
        title: "Car",
        shortDescription:
            "Машинка на радиоуправлении с Arduino и контроллером PS2",
        image: "/projects/Car/1.png",
        tags: [ProjectTags.arduino],
        // git: "https://github.com/Semolik/Car",
        repo: {
            owner: "semolik",
            name: "Car",
        },
        period: ["Январь 2023"],
        status: [statuses.done],
        screenshots: [],
        worksNow: false,
        url: null,
        head: "/projects/Car/slider.png",
    },
    {
        title: "AnimeVostPlayer",
        shortDescription:
            "Сайт для просмотра аниме с сервиса AnimeVost, один из моих первых сайтов",
        image: "/projects/AnimeVostPlayer/1.png",
        tags: [ProjectTags.javascript],
        // git: "https://github.com/Semolik/AnimeVostPlayer",
        repo: {
            owner: "semolik",
            name: "AnimeVostPlayer",
        },
        period: ["Ноябрь 2021 - Январь 2022"],
        status: [statuses.done, statuses.notSupported],
        screenshots: [
            "/projects/AnimeVostPlayer/1.png",
            "/projects/AnimeVostPlayer/2.png",
            "/projects/AnimeVostPlayer/3.png",
            "/projects/AnimeVostPlayer/4.png",
        ],
        worksNow: true,
        url: "https://old-anime-player.semolik.ru",
        head: null,
    },
];
const projects: projectExport[] = (projectsInfo as projectExport[]).map(
    (project) => {
        project.id = project.title.toLowerCase().replace(/\s/g, "-");
        project.git = project.repo
            ? `https://github.com/${project.repo.owner}/${project.repo.name}`
            : null;
        return project;
    }
);
export { projects, projectExport, ProjectTags, statuses };
