<script lang="ts">
	let { data } = $props();
</script>

<section class="hero">
	<div class="hero-content">
		{#if data.content}
			<span>{data.content}</span>
		{/if}
		<a href="/about">
			<button>About us</button>
		</a>
	</div>

	<a class="scroll" href="#explore" aria-label="Scroll down for mode content">
		<ion-icon name="chevron-down-outline" aria-label="Outlined chevron icon pointing down"
		></ion-icon>
	</a>
	<video autoplay loop muted playsinline>
		<source src="/assets/videos/network.mp4" type="video/mp4" />
		Your browser does not support the video tag.
	</video>
</section>

<div class="kdl-container">
	{#if data.collections?.projects}
		<section class="explore">
			<h2>Explore</h2>
			<h3>Featured projects</h3>
			<a class="browse" href="/projects/">Browse all projects</a>
			<section class="projects">
				{#each data.collections.projects as project (project)}
					<div class="project">
						<img src={project.data.feature.image} alt={project.data.feature.description} />
						<h4>
							<a href={project.page.url}>{project.data.name}</a>
						</h4>
						<!-- TODO: implement truncate and safe html processing -->
						<p>{project.content}</p>
						<!-- <p>{ project.content | safe | truncate(250) | safe }</p> -->
					</div>
				{/each}
			</section>

			<h3>Latest blog posts</h3>
			<a class="browse" href="/blog/">Browse all posts</a>
			<section class="blog">
				{#each data.collections.posts as post (post)}
					<div class="post">
						<!-- {{- imageMacro(post.data.feature) -}} -->
						<img src={post.data.feature.image} alt={post.data.feature.description} />
						<small>{post.data.date}</small>
						<!-- <small>{{ timeMacro(post.data.date) -}}</small> -->
						<h4>
							<a href={post.url}>{post.data.title}</a>
						</h4>
						<p>{post.data.excerpt}</p>
					</div>
				{/each}
			</section>
		</section>
	{/if}
</div>

<section class="discover">
	<h2>Discover</h2>
	{#each data.discover as section (section)}
		<h3>{section.title}</h3>
		<p>{section.description}</p>
		<section class={section.class}>
			{#each section.items as item (item)}
				<!-- NOTE: check this -->
				<div class="{section.class}-block">
					<h4>
						{#if 'url' in item}
							<a href={item.url}>{item.title}</a>
						{:else}
							{item.title}
						{/if}
					</h4>
					{#if 'items' in item}
						<ul>
							{#each item.items as _item (_item)}
								<li>{_item}</li>
							{/each}
						</ul>
					{/if}

					{#if 'description' in item}
						<p>{item.description}</p>
					{/if}
				</div>
			{/each}
		</section>
	{/each}
</section>

{#if data.communities}
	<section class="communities">
		<h2>{data.communities?.title}</h2>
		<p>{data.communities.description}</p>
		<section class="projects">
			{#each data.communities.items as item (item)}
				<div class="project">
					<img src={item.image} alt={item.description} />
					<h4>
						<a href={item.url}>{item.title}</a>
					</h4>
					<p>{item.description}</p>
				</div>
			{/each}
		</section>
	</section>
{/if}

<section class="contact">
	<h2>Interested in working with us?</h2>
	<a href="/contact-us/">
		<button>Contact us</button>
	</a>
	<p>
		<a href="/faqs/">Frequently Asked Questions</a>
	</p>
</section>

<style>
</style>
