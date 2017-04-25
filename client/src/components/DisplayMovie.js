import React from 'react';
import {Card, CardHeader, CardTitle} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Auth from '../modules/Auth';

import request from 'superagent';


export default class Display extends React.Component{

	constructor(props){
		super(props);
		this.favourites = this.favourites.bind(this);
	}

	favourites(){
		request
		.post('/movieApi/addToFav')
		// .set({'Content-Type': 'application/json', 'Authorization': `bearer ${Auth.getToken()}`})
		.send({
			Title: this.props.send.Title,
			Year: this.props.send.Year,
			imdbID: this.props.send.imdbID,
			Type: this.props.send.Type,
			Poster: this.props.send.Poster
		})
		.end(function(err, res){
			if(err){
				console.log(err);
			}else{
				alert(res.body.message);
			}
		})
	}


	render(){
		return(
			<Card className="movieContainer">				    
			    <Avatar src={this.props.send.Poster} size={150} />
			    <CardTitle title={this.props.send.Title} subtitle={this.props.send.Year} />
			    <CardTitle title={this.props.send.Type} subtitle="Add to Favourites"/>
			    <svg onClick={this.favourites} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
			</Card>
		);
	}
}