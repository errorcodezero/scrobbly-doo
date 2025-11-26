<script lang="ts">
	import type { Track } from "../lib/last_fm";

	let { track }: { track: Track } = $props();
</script>

{#if track.defined}
	<h1>{track.name}</h1>
	<img alt="{track.name} album cover" srcset={String(track.images.at(-1))} />
	<p>{track.artists}</p>
	<p>{track.album}</p>
{:else}
	<h1>Looks like nothing's playing at the moment!</h1>
{/if}
