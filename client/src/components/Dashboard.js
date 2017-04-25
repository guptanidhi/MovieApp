import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField'; 
import RaisedButton from 'material-ui/RaisedButton'; 
import request from 'superagent';
import DisplayMovie from './DisplayMovie.js';

export default class Dashboard extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			text: "",
			movieArray: []
		}

		this.handleChange = this.handleChange.bind(this);
		this.searchMovie = this.searchMovie.bind(this);
	}

	handleChange(e){
		this.setState({
			text: e.target.value
		});
	}

	searchMovie(){
		var searchString = this.state.text;
		var url = `http://www.omdbapi.com?s=${searchString}&y=&r=json&plot=short`;
		request.get(url).then((response) => { 
			this.setState({ movieArray: response.body.Search });
		})
	}

	render(){
		// Display Movie List
		const movies = this.state.movieArray.map((e) => {
			return (<DisplayMovie key={e._id} send={e} />)
		})
		
		return(
			<div>
				<Card className="container">
					<img src={require("../movie.jpg")} alt="MOVIE LOGO" height="100px" width="100px" />
					<CardTitle title="Search your Favourite Movie" subtitle="You should get access to this page only after authentication." />
						<div className="field-line">
							<TextField floatingLabelText="Movie Name" name="movieName" onChange={this.handleChange}  />
							<RaisedButton label="Search" primary={true} onClick={this.searchMovie}/>
						</div>
					{this.props.secretData && <CardText style={{ fontSize: '10px', color: 'green'}}>{this.props.secretData}</CardText>}
				</Card>

				<div>
					{movies}
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	secretData: PropTypes.string.isRequired
};