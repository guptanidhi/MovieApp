import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import request from 'superagent';
// import Auth from '../modules/Auth';

import FavMovieItem from '../components/FavMovieItem.js';

export default class FavouritePage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			favMovies: []
		}
	}

	componentDidMount(){
		var self = this;
		request
		.get("/movieApi/getFavList")
		// .set({'Content-Type': 'application/json', 'Authorization': `bearer ${Auth.getToken()}`})
		.set('Accept', 'application/json')
		.end(function(err, res){
			if(err){
				console.log("error: "+err);
			}else{
				var favArray = JSON.parse(res.text);
				self.setState({
					favMovies: favArray
				});
			}
		})
	}

	render(){
		if(this.state.favMovies.length == 0){
			return(
				<Card className="container">
					<img src={require("../favourite.jpg")} alt="Favourite LOGO" height="100px" width="100px" />
					<CardTitle title="Wait... Fetching your Favourite movies" subtitle="May be there is no item in your Favourite List." />
				</Card>
			)			
		}
		return(			
			<FavMovieItem favList={this.state.favMovies} />
		)
	}
}

// return <h2>Wait... Fetching your favourite movies or may be there is no item in your Favourite List.</h2>