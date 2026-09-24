export type Discover = {
	title: string;
	class: string;
	description: string;
	items: { title: string; url?: string; description?: string; items?: string[] }[];
};

export type Communities = {
	title: string;
	class: string;
	description: string;
	items: { title: string; url: string; image: string; description: string }[];
};
