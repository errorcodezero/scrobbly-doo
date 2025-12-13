<script lang="ts">
	import type { Track } from "../lib/last_fm";
	import "@fontsource-variable/sora";

	let { track }: { track: Track } = $props();
</script>

<svelte:head>
	{#if track.defined}
		<meta property="og:title" content={track.name} />
		<meta property="og:image" content={track.images.at(1)} />
		<meta property="og:type" content="music.song" />
		<meta property="og:music:album" content={track.album} />
		<meta property="og:music:musician" content={track.artists} />
	{/if}
	<title>{track.name}</title>
</svelte:head>

{#if track.defined}
	<div id="track">
		<img
			alt="{track.name} album cover"
			srcset={String(track.images.at(1))}
		/>
		<div id="text">
			<span id="name">{track.name}</span>
			<span id="artists">{track.artists}</span>
			<span id="album">{track.album}</span>
		</div>
	</div>
{:else}
	<span>no music :p</span>
{/if}

<style>
	* {
		font-family: "Sora Variable", sans-serif;
	}

	#track {
		display: flex;
		align-items: center;
	}

	#text {
		display: grid;
		padding-left: 0.5em;
		color: var(--ctp-mocha-text);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	#name {
		font-size: 1.5em;
		color: var(--ctp-mocha-text);
	}

	#artists {
		font-size: 1em;
		color: var(--ctp-mocha-subtext0);
	}

	#album {
		font-size: 0.75em;
		color: var(--ctp-mocha-subtext1);
	}
</style>
