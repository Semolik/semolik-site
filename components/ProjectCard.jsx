import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/ProjectCard.module.css'

export default class ProjectCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			github_user: props.github_user,
			github_repo: props.github_repo,
			load_github_data: props.load_github_data === undefined || props.load_github_data, // default true
			description: props.description || props.children,
			name: props.name,
			start: null,
			link: props.link,
			isLoaded: false,
			git: null,
			label: props.label,
			label_color: props.label_color || '#CEC2FF',
			min_height: props.min_height,
		}

	}
	componentDidMount() {

		const { github_user, github_repo, name, description, link, load_github_data } = this.state;
		const self = this;

		if (load_github_data) {
			axios.get(`https://api.github.com/repos/${github_user}/${github_repo}`)
				.then(function (responce) {
					console.log(responce)
					var data = responce.data;
					var result = {
						isLoaded: true,
						description: description || data.description,
						name: name || data.name,
						git: data.html_url,
						link: link || data.homepage,
					};
					self.setState(result);
				})
				.catch(function (error) {
					console.log(error);
				})
		} else {
			var data = {
				isLoaded: true,
			};
			if (github_user && github_repo) {
				data.git = `https://github.com/repos/${github_user}/${github_repo}`;
			}
			self.setState(data);
		}
	}
	render() {
		const { isLoaded, name, description, link, git, label, label_color, min_height } = this.state;
		if (!isLoaded) {
			return <div></div>
		}
		return (
			<div className={styles.project_card} style={min_height ? { height: 'min-content' } : {}}>
				<div className={styles.name}>{name}</div>
				{label &&
					<div className={styles.label} style={{ backgroundColor: label_color }}>{label}</div>
				}
				<div className={styles.description}>{description}</div>
				<div className={styles.links}>
					{git &&
						<a href={git} className={styles.link} rel="noopener noreferrer" target='_blank' >
							<FontAwesomeIcon icon={faGithub} />
						</a>
					}
					{link &&
						<a href={link} className={styles.link} rel="noopener noreferrer" target='_blank' >
							<FontAwesomeIcon icon={faLink} />
						</a>
					}
				</div>
			</div>
		)
	}
}