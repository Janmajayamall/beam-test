import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export default class Search extends React.Component {

  constructor(props){
    super(props);
    this.state={
        lat:this.props.lat,
        long:this.props.long,
        max:this.props.max
    }
  }

  search = () => {
    this.props.searchScooters(this.state.lat,this.state.long, this.state.max)
  }

  handleLat = (event) => {
    this.setState({lat: event.target.value})
  }

  handleLong = (event) => {
    this.setState({long: event.target.value})
  }


  handleMax = (event) => {
    this.setState({max: event.target.value})
  }

  render(){
  return (
    <div style={styles.main}>
          <input placeholder="Longitude"
            type="number"
            value={this.state.long}
            onChange={this.handleLong}
          />
          <input placeholder="Lattitude"
            type="number"
            value={this.state.lat}
            onChange={this.handleLat}
          />
          <input placeholder="Max Scooters"
            type="number"
            value={this.state.max}
            onChange={this.handleMax}
          />
          <button
            onClick={this.search}>
            Search
          </button>
    </div>
  )}
}


var styles = {
  'main': {
    display: "flex"
  },
}