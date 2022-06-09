import send from '../../utils';
const { v2, auth } = require('osu-api-extended');

const timeout = 60;
var cache = require('memory-cache');
export default async function handler(req, res) {
    await auth.login(process.env.OSU_CLIENT_ID, process.env.OSU_CLIENT_CLIENT_SECRET);
    const data = await v2.user.scores.category(7562902, 'recent');
    send(res, data, timeout);
}