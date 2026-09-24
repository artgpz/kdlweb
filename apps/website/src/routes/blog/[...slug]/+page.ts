// import { error } from '@sveltejs/kit';
// import type { EntryGenerator, PageLoad } from './$types';
// import slugify from '@sindresorhus/slugify';
//
// export const load = (async ({ params }) => {
// 	const modules = import.meta.glob('/src/lib/data/md/blog/*.md');
//
// 	const contentModule = modules[`/src/lib/data/md/blog/${params.slug}.md`];
//
// 	console.log(params.slug, modules);
// 	if (!contentModule) {
// 		error(404, "Can't find content");
// 	}
//
// 	const { default: component, metadata } = await contentModule().then();
//
// 	return { component, metadata };
// }) satisfies PageLoad;
//
// export const entries: EntryGenerator = async () => {
// 	const modules = import.meta.glob('/src/lib/content/*.md');
//
// 	const entries = Object.keys(modules).map((path) => {
// 		return { slug: slugify(path) };
// 	});
//
// 	return entries;
// };

import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`../../../lib/data/md/blog/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
}
