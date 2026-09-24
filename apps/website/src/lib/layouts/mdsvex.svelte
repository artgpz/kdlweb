<script lang="ts" module>
	import { img, p, h1, h2, h3, h4 } from '@kdl/ui';
	export { p, img, h1, h2, h3, h4 };
</script>

<script lang="ts">
	let props = $props();
</script>

<article>
	{@render props.children?.()}
</article>
