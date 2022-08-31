import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home: NextPage = () => {
	const searchImages = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
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

	const [searchTerm, setSearchTerm] = useState('');

	const searchResults = [
		{ id: '1', title: 'Image 1', src: 'https://giphy.com/stickers/cat-vibing-BXjqytvu9bKzCUHdzz' },
		{ id: '2', title: 'Image 2', src: 'https://giphy.com/stickers/cat-vibing-BXjqytvu9bKzCUHdzz' },
		{ id: '3', title: 'Image 3', src: 'https://giphy.com/stickers/cat-vibing-BXjqytvu9bKzCUHdzz' },
	];

	return (
		<div>
			<Head>
				<title>Blazingly Fast Image Search</title>
				<meta name="description" content="An image search tool you can count on." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1>Blazingly Fast Image Search</h1>
			<p>An image search tool you can count on.</p>

			<form onSubmit={searchImages}>
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
				{searchResults.map((result) => {
					return (
						<div key={result.id}>
							<h3>{result.title}</h3>
							<Image src={result.src} alt={result.title} height="200" width="200" />
						</div>
					);
				})}
        <button onClick={loadPrevious}>Previous</button>
				<button onClick={loadNext}>Next</button>
			</main>
		</div>
	);
};

export default Home;
