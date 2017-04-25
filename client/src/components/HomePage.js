import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';

const HomePage = () => (
	<Card className="container">
		<img src={require("../movie.jpg")} alt="MOVIE LOGO" height="100px" width="100px" />
		<CardTitle title="Movie Application" subtitle="Please Login to Search your Favourite Movies..." />
	</Card>
);

export default HomePage;