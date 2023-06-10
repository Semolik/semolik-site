import NodeCache from "node-cache";
import { LastFmNode } from "lastfm";
const {
    LAST_FM_API_KEY,
    LAST_FM_API_SECRET,
    public: { LAST_FM_USERNAME },
} = useRuntimeConfig();
const lastfm = new LastFmNode({
    api_key: LAST_FM_API_KEY,
    secret: LAST_FM_API_SECRET,
    useragent: "lastfm-node",
});
const cache = new NodeCache();

const getTrackInfo = (artist, name) => {
    const cachedData = cache.get(`lastfm-track-${artist}-${name}`);
    if (cachedData) {
        return cachedData;
    }

    return new Promise((resolve, reject) => {
        lastfm.request("track.getInfo", {
            artist: artist,
            track: name,
            username: LAST_FM_USERNAME,
            handlers: {
                success: function (data) {
                    cache.set(`lastfm-track-${artist}-${name}`, data, 60);
                    return resolve(data);
                },
                error: function (error) {
                    console.log("Error: " + error.message);
                    return resolve(null);
                },
            },
        });
    });
};

export default defineEventHandler(async (event) => {
    const cachedData = cache.get("lastfm");
    if (cachedData) {
        return cachedData;
    }
    return new Promise(async (resolve, reject) => {
        lastfm.request("user.getRecentTracks", {
            user: LAST_FM_USERNAME,
            limit: 1,
            handlers: {
                success: async function (data) {
                    var track = data.recenttracks.track[0];
                    var nowplaying = null;
                    if (track) {
                        var attr = track["@attr"];
                        if (attr) {
                            if (attr.nowplaying === "true") {
                                var track_info = await getTrackInfo(
                                    track.artist["#text"],
                                    track.name
                                );

                                nowplaying = {
                                    name: track.name,
                                    album: track.album["#text"],
                                    artist: track.artist["#text"],
                                    plays: track_info.track.userplaycount,
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
                    cache.set("lastfm", nowplaying, 30);
                    return resolve(nowplaying);
                },
                error: function (error) {
                    cache.set("lastfm", null, 30);
                    return resolve(null);
                },
            },
        });
    });
});
