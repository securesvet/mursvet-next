import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://mursvet.ru',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: 'https://mursvet.ru/resume',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		{
			url: 'https://mursvet.ru/writeups',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: 'https://mursvet.ru/projects',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
	];
}
