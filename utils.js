export default function send(res, data, timeout) {
	res.statusCode = 200
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Cache-Control', `max-age=${timeout}`);
	res.setHeader('Cache-Control', 's-maxage=1440000');
	res.end(JSON.stringify(data))
}