const timeout = 20;
import send from '../../utils'
var LastFmNode = require('lastfm').LastFmNode;
var lastfm = new LastFmNode({
	api_key: process.env.LAST_FM_API_KEY,
	secret: process.env.LAST_FM_API_SECRET
});
var cache = require('memory-cache');


export default function handler(req, res) {
	const cachedResponse = cache.get('lastfm');
	return new Promise((resolve, reject) => {
		if (cachedResponse) {
			send(res, cachedResponse, timeout);
			return resolve();
		}
		lastfm.request("user.getRecentTracks", {
			user: process.env.LAST_FM_USERNAME,
			limit: 1,
			handlers: {
				success: function (data) {
					var track = data.recenttracks.track[0];
					var response = { nowplaying: null };
					if (track) {
						var attr = track['@attr'];
						if (attr) {
							if (attr.nowplaying) {
								var nowplaying = {
									name: track.name,
									album: track.album['#text'],
									artist: track.artist['#text']
								};
								if (track.image.length > 0) {
									var image = track.image.filter((el) => (el.size === 'extralarge'));
									nowplaying.image = image ? image[0]['#text'] : track.image[track.image.length - 1]['#text'];
								}
								response.nowplaying = nowplaying;
							}
						}
					}
					cache.put('lastfm', response, 1000 * timeout);
					send(res, response, timeout);
					return resolve();
				},
				error: function (error) {
					console.log('lastfm произошла ошибка');
					console.log(error);
					res.json(error);
					res.status(405).end();
					return resolve()
				}
			}
		})
	})
}