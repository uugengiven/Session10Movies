import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      movies: []
    }

    this.loadMovies = this.loadMovies.bind(this);
  }

  componentDidMount()
  {
    this.loadMovies();
  }

  loadMovies()
  {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=b6fbc7f3f313bd395902af464ef47262&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
        console.log(jsonData);
        this.setState({movies: jsonData.results})
    });
  }

  makeMovieTitle(movie)
  {
    return <h1>{movie.title} ({movie.vote_average})</h1>
  }

  render() {
    let displayMovies = [];
    this.state.movies.forEach((item) => {
      displayMovies.push(this.makeMovieTitle(item));
    });

    displayMovies = this.state.movies.map(this.makeMovieTitle);

    // use either a forEach or a map, both aren't needed

    return (
      <div className="App">
        <h1>I have loaded {this.state.movies.length} movies!</h1>
        {displayMovies}
      </div>
    );
  }
}
export default App;
