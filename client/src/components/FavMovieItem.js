import React from 'react';
import FavouritePage from '../containers/FavouritePage.js';
import { Card, CardTitle } from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import SvgIcon from 'material-ui/SvgIcon';
import Avatar from 'material-ui/Avatar';
import {red500} from 'material-ui/styles/colors';
import request from 'superagent';

export default class FavMovieItem extends React.Component{
	// console.log(this.props.favList)
	constructor(props){
		super(props);
		this.state = {
			favListArray: this.props.favList
		}
		this.cellClicked = this.cellClicked.bind(this);
	}

	cellClicked(row, columnDetail, event){
		var key = event.target.dataset.myRowIdentifier;
		var self = this;
		var updatedArray = this.state.favListArray;
		if(key !== undefined){
			if (confirm('Are you sure you want to delete this movie from your favourite list?')) {
			    request
				.delete('/movieApi/deleteMovie')
				// .set({'Content-Type': 'application/json', 'Authorization': `bearer ${Auth.getToken()}`})
				.send({
					movieId: key
				})
				.end(function(err, res){
					if(err){
						console.log(err);
					}else{
						alert(res.body.message);
						updatedArray.splice(row, 1);
						self.setState({
							favListArray: updatedArray
						})
					}
				})
			}
		}
	}
	
	favoriteMovieItem(){
		var tableBody = [];

		this.state.favListArray.map(function(item, index){
			var body =
				<TableRow key={item._id}>	
					<TableRowColumn>
						<Avatar src={item.Poster} size={80} />
					</TableRowColumn>				
					<TableRowColumn>{item.Title}</TableRowColumn>
					<TableRowColumn>{item.Year}</TableRowColumn>					
					<TableRowColumn>{item.Type}</TableRowColumn>
					<TableRowColumn>{item.imdbID}</TableRowColumn>
					<TableRowColumn>							
						<SvgIcon>
							<path color={red500} data-my-row-identifier={item._id} d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
						</SvgIcon>
					</TableRowColumn>
				</TableRow>

			// Add all favourite movies
			tableBody.push(body);
		})
		return(
			<Table selectable={false} onCellClick={this.cellClicked}>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn><h3>Poster</h3></TableHeaderColumn>
						<TableHeaderColumn><h3>Title</h3></TableHeaderColumn>
						<TableHeaderColumn><b>Year</b></TableHeaderColumn>
						<TableHeaderColumn><b>Type</b></TableHeaderColumn>
						<TableHeaderColumn><b>imdbID</b></TableHeaderColumn>
						<TableHeaderColumn><b>Delete</b></TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{tableBody}
				</TableBody>
			</Table>
		)
	}

	render(){
		return(
			<div>
				<Card className="container">
					<img src={require("../favourite.jpg")} alt="MOVIE LOGO" height="100px" width="100px" />
					<CardTitle title="Favourite List" />
				</Card>				
				{this.favoriteMovieItem(this)}
			</div>
		);
	}
}

// <HomeIcon color={red500} hoverColor={greenA200}  data-my-row-identifier={item._id}/>