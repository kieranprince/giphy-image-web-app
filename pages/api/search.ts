// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type DataResponse = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<DataResponse>) {
	const { search } = req.body;
	const giphyAPIKey = process.env.GIPHY_API_KEY;

	// Prepare and validate inputs
	if (!giphyAPIKey) {
		throw 'Giphy API Key is not set in the .env.local file.';
	}
	let searchTerm = '';
	if (Array.isArray(search)) {
		searchTerm = search.join('');
	} else {
		searchTerm = search ?? '';
	}

	// Build URL
	let giphyAPIURL = new URL('https://api.giphy.com/v1/stickers/search');
	giphyAPIURL.searchParams.append('q', searchTerm);
	giphyAPIURL.searchParams.append('limit', '3');
	giphyAPIURL.searchParams.append('rating', 'g');
	giphyAPIURL.searchParams.append('api_key', giphyAPIKey);

	// Make the request
	let response = await fetch(giphyAPIURL.toString());

	if (response.ok) {
		const results = await response.json();
		// Cache the API response for 30 seconds
		res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
		res.status(200).json({ results: results.data });
	} else {
		res.status(400).json({ error: `Fetch to the Image API failed with code: ${response.status.toString()}` });
	}
}
