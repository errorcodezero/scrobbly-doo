<script lang="ts">
	import type { Track } from "../lib/last_fm";

	let { track }: { track: Track } = $props();
</script>

{#if track.defined}
	<meta property="og:title" content={track.name} />
	<meta property="og:image" content={track.images.at(1)} />
	<meta property="og:type" content="music.song" />
	<meta property="og:music:album" content={track.album} />
	<meta property="og:music:musician" content={track.artists} />
{/if}
<title>{track.name}</title>
