<template>
    <div id="drawhere" ref="content"></div>
</template>
<style lang="scss" scoped>
#drawhere {
    display: flex;
    width: 100%;
    min-height: 90vh;
    flex: 1;
}
</style>
<script>
import {
    Engine,
    Render,
    Bodies,
    Runner,
    Composite,
    Mouse,
    MouseConstraint,
} from "matter-js";
import decomp from "poly-decomp";

export default {
    props: {
        border: {
            type: Number,
            default: 10,
        },
        words: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            engine: null,
            width: 0,
            height: 0,
        };
    },
    methods: {
        async addWordBlock(word) {
            const image = "/api/card?title=" + word;
            const imageInfo = await new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error("Could not load image"));
                img.src = image;
            });
            const width = imageInfo.width;
            const height = imageInfo.height;
            function generateRandom(min = 0, max = 100) {
                // find diff
                let difference = max - min;

                // generate random number
                let rand = Math.random();

                // multiply with difference
                rand = Math.floor(rand * difference);

                // add with min value
                rand = rand + min;

                return rand;
            }

            const block = Bodies.rectangle(
                generateRandom(0, this.width), // left
                0, // top
                width / 2, // width
                height / 2, // height
                {
                    chamfer: { radius: 10 },
                    render: {
                        fillStyle: "orange",
                        strokeStyle: "black",
                        lineWidth: 2,
                        sprite: {
                            texture: image,
                            xScale: 0.5,
                            yScale: 0.5,
                        },
                    },
                }
            );
            Composite.add(this.engine.world, block);
        },
    },
    async mounted() {
        if (process.client) {
            window.decomp = decomp;
            // read the width and height of the container
            let width = this.$refs.content.offsetWidth,
                height = this.$refs.content.offsetHeight;
            this.width = width;
            this.height = height;
            let engineOptions = {
                    timing: {
                        timestamp: 0.5,
                        timeScale: 0.5,
                    },
                },
                renderOptions = {
                    width: width,
                    height: height,
                    wireframes: false,
                    wireframeBackground: "transparent",
                    background: "transparent",

                    showDebug: false,
                    showBroadphase: false,
                    showBounds: false,
                    showVelocity: false,
                    showCollisions: false,
                    showSeparations: false,
                    showAxes: false,
                    showPositions: false,
                    showAngleIndicator: false,
                    showIds: false,
                    showShadows: false,
                    showVertexNumbers: false,
                    showConvexHulls: false,
                    showInternalEdges: false,
                };
            // create an engine
            let engine = Engine.create(engineOptions),
                world = engine.world;
            this.engine = engine;

            // create a renderer
            var render = Render.create({
                element: document.querySelector("#drawhere"),
                engine,
                options: renderOptions,
            });
            for (let word of this.words) {
                await this.addWordBlock(word);
            }

            const border = 1;
            Composite.add(world, [
                Bodies.rectangle(width, 0, width * 2, border, {
                    isStatic: true,
                    render: {
                        fillStyle: "transparent",
                    },
                }), // top
                Bodies.rectangle(width, height, width * 2, border, {
                    isStatic: true,
                    render: {
                        fillStyle: "transparent",
                    },
                }), // bottom
                Bodies.rectangle(width, height, border, width * 2, {
                    isStatic: true,
                    render: {
                        fillStyle: "transparent",
                    },
                }), // right
                Bodies.rectangle(0, height, border, height * 2, {
                    isStatic: true,
                    render: {
                        fillStyle: "transparent",
                    },
                }), // left
            ]);

            var mouse = Mouse.create(render.canvas),
                mouseConstraint = MouseConstraint.create(engine, {
                    mouse: mouse,
                    constraint: {
                        stiffness: 0.2,
                        render: {
                            visible: false,
                        },
                    },
                    collisionFilter: {
                        mask: 0x0001,
                        category: 0x0001,
                    },
                });

            Composite.add(world, mouseConstraint);

            // keep the mouse in sync with rendering
            render.mouse = mouse;

            // fit the render viewport to the scene
            Render.lookAt(render, {
                min: { x: 0, y: 0 },
                max: { x: width, y: height },
            });

            Runner.run(engine);
            // run the renderer
            Render.run(render);
        }
    },
};
</script>
