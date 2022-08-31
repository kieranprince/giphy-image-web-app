import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Blazingly Fast Image Search</title>
				<meta name="description" content="An image search tool you can count on." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Blazingly Fast Image Search</h1>
			<p>An image search tool you can count on.</p>
		</div>
	);
};

export default Home;
