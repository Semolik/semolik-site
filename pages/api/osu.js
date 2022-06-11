import send from '../../utils';
const { v2, auth } = require('osu-api-extended');
const timeout = 60;
var cache = require('memory-cache');

export default async function handler(req, res) {
    const cachedResponse = cache.get('osu');
    if (cachedResponse) {
        send(res, cachedResponse, timeout);
        return;
    }
    await auth.login(process.env.OSU_CLIENT_ID, process.env.OSU_CLIENT_CLIENT_SECRET);
    const data = await v2.user.details(process.env.OSU_USER_ID, 'osu', 'id');
    var out = { online: data.is_online };
    if (data.statistics && data.rank_history.data) {
        out['rank_history'] = data.rank_history.data;
        out['id'] = data.id;
        out['statistics'] = data.statistics;
        var timestamp = data.statistics.play_time;
        var days = Math.floor(timestamp / 60 / 60 / 24);
        var hours = Math.floor(timestamp / 60 / 60);
        out['play_time'] = `${days}d ${hours - (days * 24)}h ${Math.floor(timestamp / 60) - (hours * 60)}m`;
        out['play_time_hours'] = hours;
    } else {
        console.log("Запрос отдал некорректные данные");
        console.log(data);
    }
    cache.put('osu', out, 1000 * timeout);
    send(res, out, timeout);
}