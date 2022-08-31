import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const Home: NextPage = () => {
	// State
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState<any[]>([]);

	// Actions
	const searchImages = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Prepare API call
		const searchData = JSON.stringify({
			search: searchTerm,
		});
		const endpoint = '/api/search';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: searchData,
		};

		// Get results
		const response = await fetch(endpoint, options);

		const result = await response.json();
		setResults(result.results);
	};

	const handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
		setSearchTerm(event.currentTarget.value);
	};

	const loadNext = () => {
		console.log('next');
	};

	const loadPrevious = () => {
		console.log('prev');
	};

	return (
		<div>
			<Head>
				<title>Blazingly Fast Image Search</title>
				<meta name="description" content="An image search tool you can count on." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1>Blazingly Fast Image Search</h1>
			<p>An image search tool you can count on.</p>

			<form action="/api/search" method="post" onSubmit={searchImages}>
				<label htmlFor="search">Search for:</label>
				<input name="search" type="text" value={searchTerm} onChange={handleSearchChange} required />
				<button type="submit">Search</button>
			</form>

			<label htmlFor="displayOptions">Display options:</label>
			<select name="displayOptions">
				<option value="Center Top">Center Top</option>
				<option value="Center Bottom">Center Bottom</option>
				<option value="Center">Center</option>
			</select>

			<h2>Search results for {searchTerm}</h2>

			<main>
				<ul className="results">
					{results.map((result) => {
						return (
							<li className="results-item" key={result.id}>
								<h3>{result.title}</h3>
								<iframe src={result.embed_url} width="400" height="400" frameBorder="0" allowFullScreen></iframe>
							</li>
						);
					})}
				</ul>
				<button onClick={loadPrevious}>Previous</button>
				<button onClick={loadNext}>Next</button>
			</main>
		</div>
	);
};

export default Home;
