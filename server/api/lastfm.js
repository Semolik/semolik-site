import NodeCache from "node-cache";
import { LastFmNode } from "lastfm";
const { LAST_FM_API_KEY, LAST_FM_API_SECRET, LAST_FM_USERNAME } =
    useRuntimeConfig().public;
const lastfm = new LastFmNode({
    api_key: LAST_FM_API_KEY,
    secret: LAST_FM_API_SECRET,
    useragent: "lastfm-node",
});
const cache = new NodeCache();

export default defineEventHandler(async (event) => {
    const cachedData = cache.get("lastfm");
    if (cachedData) {
        return cachedData;
    }
    return new Promise((resolve, reject) => {
        lastfm.request("user.getRecentTracks", {
            user: LAST_FM_USERNAME,
            limit: 1,
            handlers: {
                success: function (data) {
                    var track = data.recenttracks.track[0];
                    var nowplaying = null;
                    if (track) {
                        var attr = track["@attr"];
                        if (attr) {
                            if (attr.nowplaying) {
                                nowplaying = {
                                    name: track.name,
                                    album: track.album["#text"],
                                    artist: track.artist["#text"],
                                };
                                if (track.image.length > 0) {
                                    var image = track.image.filter(
                                        (el) => el.size === "extralarge"
                                    );
                                    nowplaying.image = image
                                        ? image[0]["#text"]
                                        : track.image[track.image.length - 1][
                                              "#text"
                                          ];
                                }
                            }
                        }
                    }
                    cache.set("lastfm", nowplaying, 60);
                    return resolve(nowplaying);
                },
                error: function (error) {
                    cache.set("lastfm", null, 60);
                    return resolve(null);
                },
            },
        });
    });
});
