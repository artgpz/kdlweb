import slugify from '@sindresorhus/slugify';

async function getPosts() {
	let posts: Record<string, unknown>[] = [];

	const paths = import.meta.glob('/src/lib/data/md/blog/*.md', { eager: true });

	for (const path in paths) {
		console.log(path);
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug: slugify(metadata.title) };
			// post.published && posts.push(post);
			posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

export async function load() {
	const posts = await getPosts();
	return { posts };
}
