import React from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from "framer-motion"
import { Line } from "react-chartjs-2"
import Chart from 'chart.js/auto'
import styles from '../styles/OsuCard.module.css'
import home_styles from '../styles/Home.module.css'

export default class OsuCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }
    componentDidMount() {
        this.loadData();
        setInterval(this.loadData, 1000 * 60);
    }
    loadData = () => {
        const self = this;
        axios.get('/api/osu')
            .then(function (response) {
                self.setState({ data: response.data });
            })
            .catch(function (error) {
                self.setState({ osu: null });
            })
    }
    getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        return five;
    }
    OsuBlock = (props) => {
        const { label, value } = props;
        return (
            <div className={styles.block}>
                <div className={styles.label}>{label}</div>
                <motion.div
                    className={styles.value}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    key={[label, value]}>{value}
                </motion.div>
            </div>
        )
    }
    renderGraph = (props) => {
        const { rank_history } = props;
        var labels = new Array();
        if (rank_history) {
            for (var i = 1; i < rank_history.length; i++) {
                labels.push(`${i} ${this.getNoun(i, 'день', 'дня', 'дней')} назад`);
            }
        }
        labels.reverse();
        const data = {
            labels: labels,
            datasets: [
                {
                    label: "Рейтинг в мире",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "#ff9f40",
                    borderColor: "#ff9f40",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "#ff9f40",
                    pointBackgroundColor: "#ff9f40",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#ff9f40",
                    pointHoverBorderColor: "#ff9f40",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: rank_history || [],
                },
            ],
        };
        const options = {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxis: {
                    ticks: {
                        backdropColor: "rgba(0, 0, 0, 1)",
                        color: "black",
                        padding: 0,
                    },

                    grid: {
                        color: "black",
                        display: false,
                    },
                    reverse: true,
                },
                xAxis: {
                    ticks: {
                        reverse: true,
                        backdropColor: "rgba(0, 0, 0, 1)",
                        color: "black",
                        display: false,
                    },
                    grid: {
                        color: "black",
                        display: false,
                    },
                    display: false,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
            interaction: {
                mode: "index",
                intersect: false,
            },
        };
        return (
            <div className={styles.graph}>
                <Line options={options} data={data} height={100} />
            </div>
        )
    }

    render() {
        const { data } = this.state;

        return (
            <AnimatePresence>
                {data && Object.keys(data).length > 0 && (
                    <motion.div
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className={[home_styles.card, styles.osu].join(" ")}
                        key='osu'
                    >
                        <div className={styles.label}>osu</div>
                        {data.online &&
                            <div className={[styles.status].join(" ")}>
                                Сейчас в сети
                            </div>
                        }
                        <this.renderGraph rank_history={data.rank_history} />
                        <this.OsuBlock label='pp' value={data.statistics.pp} />
                        <this.OsuBlock label='Количество игр' value={data.statistics.play_count} />
                        <this.OsuBlock label='Рейтинг в стране' value={'#' + data.statistics.country_rank} />
                        <this.OsuBlock label='Рейтинг в мире' value={'#' + data.statistics.global_rank} />
                        <this.OsuBlock label='Точность попаданий' value={Math.round(data.statistics.hit_accuracy) + '%'} />
                        <this.OsuBlock label='Времени в игре' value={data.play_time} />
                        <a href={`https://osu.ppy.sh/users/${data.id}`} className={styles.link} target="_blank" rel="noopener noreferrer">Открыть</a>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }
}