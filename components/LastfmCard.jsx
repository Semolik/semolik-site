import React from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image'
import Marquee from "react-fast-marquee"
import styles from '../styles/LastfmCard.module.css'
import home_styles from '../styles/Home.module.css'

export default class LastfmCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }
    componentDidMount() {
        this.loadData();
        setInterval(this.loadData, 1000 * 20);
    }
    loadData = () => {
        const self = this;
        axios.get('/api/lastfm')
            .then(function (response) {
                self.setState({ data: response.data.nowplaying });
            })
            .catch(function (error) {
                console.log(error.message);
                self.setState({ data: null });
            })
    }
    render() {
        const { data } = this.state;
        return (
            <AnimatePresence>

                {data && (
                    <motion.div
                        key='lastfm'
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className={[home_styles.card, styles.last_fm_container].join(" ")}
                    >
                        <motion.div
                            key={data.name}
                            initial={{ x: -300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className={styles.last_fm}
                        >
                            <div className={styles.img_container}>
                                <Image src={data.image} alt={data.name} layout='fill' />
                            </div>
                            <div className={styles.block}>
                                <div className={styles.artist}>{data.artist}</div>
                                <Marquee gradientColor={[226, 236, 252]}>
                                    <p className={styles.name}>{data.name}</p>
                                    <p className={styles.name}>{data.name}</p>
                                    <p className={styles.name}>{data.name}</p>
                                </Marquee>
                                <div className={styles.artist}>{data.album}</div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }
}