
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram, faDiscord, faGithub, faSteam, falink } from '@fortawesome/free-brands-svg-icons'
import CodeStatsIcon from '../public/cs-logo.svg'
import toast, { Toaster } from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import axios from 'axios'
import Marquee from "react-fast-marquee"
import { motion, AnimatePresence } from "framer-motion"
import ProjectCard from '../components/ProjectCard'
import { Line } from "react-chartjs-2"
import Chart from 'chart.js/auto'


const copyToClipboard = (text) => {
	if (copy(text)) {
		toast.success('Скопировано!')
	} else {
		toast.error('Ошибка копирования текста!')
	}
}

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lastfm: null,
			osu: null,
		}

	}
	componentDidMount() {
		this.loadLastFM();
		this.loadOsu();
		setInterval(this.loadLastFM, 1000 * 20);
		setInterval(this.loadOsu, 1000 * 60);
	}
	loadOsu = () => {
		const self = this;
		axios.get('/api/osu')
			.then(function (response) {
				self.setState({ osu: response.data });
			})
			.catch(function (error) {
				self.setState({ osu: null });
			})
	}
	loadLastFM = () => {
		const self = this;
		axios.get('/api/lastfm')
			.then(function (response) {
				self.setState({ lastfm: response.data.nowplaying });
			})
			.catch(function (error) {
				console.log(error.message);
				self.setState({ lastfm: null });
			})
	}
	OsuBlock = (props) => {
		const { label, value } = props;
		return (
			<div className={styles.block}>
				<div className='label'>{label}</div>
				<motion.div
					className='value'
					initial={{ y: -10, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					key={[label, value]}>{value}</motion.div>
			</div>
		)
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
	render() {
		const { lastfm, osu } = this.state;
		const OsuBlock = this.OsuBlock;
		var labels = new Array();
		if (this.state.osu) {
			for (var i = 1; i < this.state.osu.rank_history.length; i++) {
				labels.push(`${i} ${this.getNoun(i, 'день', 'дня', 'дней')} назад`);
			}
		}
		labels.reverse();



		// const options = {
		// 	responsive: true,
		// 	hoverMode: 'label',
		// 	stacked: false,
		// 	scales: {
		// 		y: {},
		// 		y2: {
		// 			position: 'right',
		// 			reverse: true
		// 		}
		// 	}
		// };


		// const data = {
		// 	labels,
		// 	datasets: [
		// 		{
		// 			label: 'Рейтинг в мире',
		// 			data: this.state.osu ? this.state.osu.rank_history : [],
		// 			borderColor: 'rgb(255, 99, 132)',
		// 			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		// 		},

		// 	],
		// };
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
					data: this.state.osu ? this.state.osu.rank_history : [],
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
			<div className={styles.container} >
				<Head>
					<title>Semolik</title>
					<meta name="description" content="Semolik's site" />
					<link rel="icon" href="/favicon.png" />
				</Head>

				<Toaster position="top-right" reverseOrder={false} />
				<main className={styles.main}>

					<div className={styles.grid}>
						<div className={styles.profile_column}>
							<div className={styles.profile}>
								<Image priority={true} src="/avatar.jpg" alt="Avatar" layout='fill' />
							</div>
							<div className={styles.links_container}>
								<a href="https://t.me/semolik" target="_blank" rel="noopener noreferrer">
									<FontAwesomeIcon icon={faTelegram} />
								</a>
								<a href="https://codestats.net/users/semolik" target="_blank" rel="noopener noreferrer">
									<CodeStatsIcon />
								</a>
								<a onClick={() => { copyToClipboard('Semolik#4725') }}>
									<FontAwesomeIcon icon={faDiscord} />
								</a>
								<a href="https://github.com/Semolik" target="_blank" rel="noopener noreferrer">
									<FontAwesomeIcon icon={faGithub} />
								</a>
								<a href="https://steamcommunity.com/id/Semolik/" target="_blank" rel="noopener noreferrer">
									<FontAwesomeIcon icon={faSteam} />
								</a>

							</div>
						</div>
						<AnimatePresence>
							{osu && (
								<motion.div
									initial={{ x: -300, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: -300, opacity: 0 }}
									className={[styles.card, styles.osu].join(" ")}
									key='osu'
								>
									<div className={styles.label}>osu</div>
									{osu.online &&
										<div className={[styles.status, styles.block].join(" ")}>
											Сейчас в сети
										</div>
									}
									<div className={styles.graph}>
										<Line options={options} data={data} height={100}/>
									</div>

									<OsuBlock label='pp' value={osu.statistics.pp} />
									<OsuBlock label='Количество игр' value={osu.statistics.play_count} />
									<OsuBlock label='Рейтинг в стране' value={'#' + osu.statistics.country_rank} />
									<OsuBlock label='Рейтинг в мире' value={'#' + osu.statistics.global_rank} />
									<OsuBlock label='Точность попаданий' value={Math.round(osu.statistics.hit_accuracy) + '%'} />
									<OsuBlock label='Времени в игре' value={osu.play_time} />
									<a href={`https://osu.ppy.sh/users/${osu.id}`} className={styles.link} target="_blank" rel="noopener noreferrer">Открыть</a>
								</motion.div>
							)}
						</AnimatePresence>
						<ProjectCard github_user='Semolik' github_repo='AnimePlayer' label='в разработке' min_height={true}>
							<p>Продолжение идеи AnimeVostPlayer но уже с использованием React, расширенными возможностями и собственным api.</p>
							<p>Работает с Anidub, Animevost и этот список будет пополняться.</p>
							<p style={{ textAlign: 'center', fontWeight: 500 }}>Возможности</p>
							<ul>
								<li>Улучшен поиск аниме на шикимори</li>
								<li>Обновленный дизайн</li>
								<li>Нет ограничений при поиске и на страницах жанров</li>
								<li>Берет информацию с нескольких сайтов</li>
							</ul>
							<p>На данный момент переделывается <a href="https://github.com/Semolik/AnimePlayer-api">api</a>. Планируется доработать frontend и привести репозиторий в нормальный вид.</p>
						</ProjectCard>
						<ProjectCard github_user='Semolik' github_repo='AnimeVostPlayer' min_height={true}>
							<p>Небольшой сайтик для просмотра для просмотра аниме с сайта animevost.org. Работает напрямую с их api из за чего имеет ограничения.</p>
							<p style={{ textAlign: 'center', fontWeight: 500 }}>Имеет возможности</p>
							<ul>
								<li>Сохранения аниме в избранное</li>
								<li>Отображания страницы с аниме на шикимори</li>
							</ul>
						</ProjectCard>

						<AnimatePresence>

							{lastfm && (
								<motion.div
									key='lastfm'
									initial={{ x: -300, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: -300, opacity: 0 }}
									className={[styles.card, styles.last_fm_container].join(" ")}
								>
									<motion.div
										key={lastfm.name}
										initial={{ x: -300, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										className={styles.last_fm}
									>
										<div className={styles.img_container}>
											<Image src={lastfm.image} alt={lastfm.name} layout='fill' />
										</div>
										<div className={styles.block}>
											<div className={styles.artist}>{lastfm.artist}</div>
											<Marquee gradientColor={[226, 236, 252]}>
												<p className={styles.name}>{lastfm.name}</p>
												<p className={styles.name}>{lastfm.name}</p>
												<p className={styles.name}>{lastfm.name}</p>
											</Marquee>
											<div className={styles.artist}>{lastfm.album}</div>
										</div>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>

					</div>
				</main>
			</div>
		)
	}
}