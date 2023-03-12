import { satori } from "v-satori";
import card from "@/components/card.vue";
import fs from "fs";

const openSans = fs.readFileSync("assets/fonts/OpenSans-Regular.ttf");

export default eventHandler(async (event) => {
    const query = getQuery(event);
    const colors = ["red", "orange", "yellow", "purple", "pink", "white"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const color = colors[randomIndex];
    const svg = await satori(card, {
        props: {
            title: query.title,
            icon: query.icon,
            color,
        },

        fonts: [
            {
                name: "Open Sans",
                data: openSans,
                weight: 400,
                style: "normal",
            },
        ],
    });

    setHeader(event, "Content-Type", "image/svg+xml");

    return svg;
});
