
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram, faDiscord, faGithub, faSteam, falink } from '@fortawesome/free-brands-svg-icons'
import CodeStatsIcon from '../public/cs-logo.svg'
import toast, { Toaster } from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import LastfmCard from '../components/LastfmCard'
import ProjectCard from '../components/ProjectCard'
import OsuCard from '../components/OsuCard'


const copyToClipboard = (text) => {
	if (copy(text)) {
		toast.success('Скопировано!')
	} else {
		toast.error('Ошибка копирования текста!')
	}
}

export default function Home() {

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
					<OsuCard />
					<ProjectCard github_user='Semolik' github_repo='AnimePlayer' label='в разработке' key='AnimePlayer'>
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
					<ProjectCard github_user='Semolik' github_repo='AnimeVostPlayer' min_height={true} key='AnimeVostPlayer'>
						<p>Небольшой сайтик для просмотра аниме с сайта animevost.org. Работает напрямую с их api из за чего имеет ограничения.</p>
						<p style={{ textAlign: 'center', fontWeight: 500 }}>Имеет возможности</p>
						<ul>
							<li>Сохранения аниме в избранное</li>
							<li>Отображания страницы с аниме на шикимори</li>
						</ul>
					</ProjectCard>
					<LastfmCard />
				</div>
			</main>
		</div>
	)

}