import { get_tracks as get_current_track, last_fm } from "../../lib/last_fm";

export async function GET({ params }: { params: any }) {
	const search = params.album;

	return new Response(JSON.stringify((await get_current_track(last_fm))), {
		status: 200
	});
}
