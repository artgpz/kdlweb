<script lang="ts">
	let { data } = $props();
</script>

<pre>{JSON.stringify(data.meta, null, 2)}</pre>

<main class="kdl-container">
	<article>
		<data.content></data.content>
	</article>
</main>

<style>
</style>
