import { API_KEY, APPLICATION_NAME, REGISTERED_TO, SHARED_SECRET } from "astro:env/server";

interface LastFM {
	application_name: String
	api_key: String,
	shared_secret: String,
	registered_to: String,
}

function get_url(last_fm: LastFM) {
	return `https://ws.audioscrobbler.com/2.0/?api_key=${last_fm.api_key}&format=json`
}

export async function get_tracks(last_fm: LastFM) {
	const data = await fetch(get_url(last_fm) + `&method=user.getrecenttracks&user=${last_fm.registered_to}&limit=1`).then((body) => body.json());

	if (data.recenttracks.track[0]["@attr"].nowplaying) {
		return data.recenttracks.track[0];
	}
	return ""
}

export let last_fm: LastFM = {
	application_name: APPLICATION_NAME,
	api_key: API_KEY,
	shared_secret: SHARED_SECRET,
	registered_to: REGISTERED_TO
};
