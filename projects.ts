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

declare interface ProjectType {
    title: string;
    shortDescription: string;
    description: string;
    image: string;
    tags: string[];
    git: string | null;
    period: string[];
    status: statuses[];
    screenshots: string[];
    worksNow: boolean;
    url: string | null;
}
const projects: ProjectType[] = [
    {
        title: "Semolik music",
        shortDescription: "Музыкальный сервис для начинающих музыкантов",
        description:
            "Музыкальный сервис для начинающих музыкантов. Это мой дипломный проект.",
        image: "/images/1.jpg",
        tags: [
            ProjectTags.nuxt,
            ProjectTags.fastapi,
            ProjectTags.sqlalchemy,
            ProjectTags.postgresql,
        ],
        git: "https://github.com/semolik/music",
        period: ["Ноябрь 2022 - сейчас"],
        status: [statuses.inProgress],
        screenshots: [
            "/images/SemolikMusic/1.jpg",
            "/images/SemolikMusic/2.jpg",
        ],
        url: null,
        worksNow: false,
    },
    {
        title: "AnimePlayer",
        shortDescription:
            "Сайт для просмотра аниме с сервисов Animevost и Anidub",
        description:
            "Сайт для просмотра аниме с сервисов Animevost и Anidub.\
        Первый проект, в котором я использовал React.js.\
        Api для получения данных сделано на flask. \
        Было несколько попыток переписать проект, сначала на Vue.js в начале июле 2022 года,\
        затем в декабре этого же года на Nuxt.js в ней была добавлена авторизация, и планировалось добавить еще много функций,\
        но в итоге проект был отложен до лучших времен. \
        На хостинге находится первая версия, которая была написана на React.js.",
        image: "/projects/AnimePlayer/1.png",
        tags: [ProjectTags.react, ProjectTags.flask],
        git: "https://github.com/Semolik/AnimePlayer",
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
    },
    {
        title: "ASUtimetable",
        shortDescription:
            "Приложение для просмотра расписания занятий университета",
        description:
            "Приложение для просмотра расписания занятий университета. \
            Мне не нравилось как выглядит расписание занятий в приложении университета, поэтому я решил написать свое. \
            Расписание занятий парсилось с сайта университета. \
            Приложение было написано на Vue.js. \n \
            На данный момент структура сайта университета изменилась, поэтому приложение не работает, поддержка приложения прекращена.",
        image: "/projects/ASUtimetable/1.png",
        tags: [ProjectTags.vue, ProjectTags.fastapi, ProjectTags.redis],
        git: "https://github.com/Semolik/ASUtimetable",
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
    },
    {
        title: "Semolik bot",
        shortDescription: "Бот для Telegram c различными функциями",
        description:
            "Бот для Telegram. Бот был написан на Python с использованием библиотеки telethon. \
            Идея появилась после того как я увидел популярного на то время userbot'a friendly-telegram и решил написать своего,\
             в то время я только начинал изучать Python. До того как этот бот появился именно в виде бота, это был аккаунт, на котором был установлен userbot.\n \
             На данный момент бот не поддерживается, в связи с этим он имеет ошибки но большинство функций работают. \
             Так как его используют я решил не прекращать его работу. \n\
             Он имеет много функций, вот некоторые из них: \n\
            - Создание демотиваторов \n \
            - Создание мемов \n \
            - Создание стикерпаков \n \
            - Скачивание музыки с YouTube \n \
            - и многое другое",
        image: "/projects/SemolikBot/avatar.jpg",
        tags: [ProjectTags.python, ProjectTags.telethon],
        git: null,
        period: ["Октябрь 2020 - Октябрь 2021"],
        status: [statuses.notSupported, statuses.done],
        screenshots: ["/images/SemolikBot/1.jpg"],
        worksNow: true,
        url: "https://t.me/Semolik_bot",
    },
    {
        title: "Car",
        shortDescription:
            "Машинка на радиоуправлении с Arduino и контроллером PS2",
        description:
            "Машинка на радиоуправлении с Arduino и контроллером PS2\n \
            В проекте использовались следующие компоненты: \n \
            - Arduino Nano \n \
            - Контроллер и приемник PS2 джойстика \n \
            - Платформа машинки \n \
            - Аккумуляторы 18650 x2 \n \
            - Драйвер l298n \n \
            - Адресная лента ws2812b \n \
            - Контроллер заряда \n \
            - Корпус \n",
        image: "/images/Car/1.jpg",
        tags: [ProjectTags.arduino],
        git: "https://github.com/Semolik/Car",
        period: ["Январь 2023"],
        status: [statuses.done],
        screenshots: ["/images/Car/1.jpg", "/images/Car/2.jpg"],
        worksNow: false,
        url: null,
    },
    {
        title: "AnimeVostPlayer",
        shortDescription:
            "Сайт для просмотра аниме с сервиса AnimeVost, один из моих первых сайтов",
        description:
            "Сайт для просмотра аниме с сервиса AnimeVost. Написан на чистом JavaScript.  Можно сказать первый опыт написания сайта и использования JavaScript.\n \
            Он имеет следующие функции: \n \
            - Просмотр недавно добавленных аниме \n \
            - Просмотр аниме по жанрам (ограниченно) \n \
            - Просмотр аниме по годам (ограниченно) \n \
            - Сохренение аниме в избранное \n \
            - Сохранение просмотренных серий \n",
        image: "/projects/AnimeVostPlayer/1.png",
        tags: [ProjectTags.javascript],
        git: "https://github.com/Semolik/AnimeVostPlayer",
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
    },
];

export { projects, ProjectType, ProjectTags, statuses };
