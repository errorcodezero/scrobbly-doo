import {
	API_KEY,
	APPLICATION_NAME,
	REGISTERED_TO,
	SHARED_SECRET,
} from "astro:env/server";

export interface LastFM {
	application_name: string;
	api_key: string;
	shared_secret: string;
	registered_to: string;
}

export interface Track {
	defined: boolean;
	name: string;
	artists: string;
	images: string[];
	album: string;
}

export let last_fm: LastFM = {
	application_name: APPLICATION_NAME,
	api_key: API_KEY,
	shared_secret: SHARED_SECRET,
	registered_to: REGISTERED_TO,
};

function get_url(last_fm: LastFM) {
	return `https://ws.audioscrobbler.com/2.0/?api_key=${last_fm.api_key}&format=json`;
}

export async function get_tracks(last_fm: LastFM): Promise<Track> {
	const data = await fetch(
		get_url(last_fm) +
		`&method=user.getrecenttracks&user=${last_fm.registered_to}&limit=1`,
	).then((body) => body.json());

	try {
		const track_data = data.recenttracks.track[0];
		if (data.recenttracks.track[0]["@attr"]["nowplaying"] == "true") {
			console.log(track_data);
			let images: String[] = [];
			for (let i = 0; i < track_data.image.length; i++) {
				images.push(track_data.image[i]["#text"]);
			}
			const track: Track = {
				defined: true,
				name: track_data.name,
				artists: track_data.artist["#text"],
				images: images,
				album: track_data.album["#text"],
			};
			return track;
		}
	} catch {
		return {
			defined: false,
			name: "",
			artists: "",
			images: [],
			album: "",
		};
	}
	return {
		defined: false,
		name: "",
		artists: "",
		images: [],
		album: "",
	};
}
