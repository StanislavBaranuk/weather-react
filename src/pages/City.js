import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {setWeather} from 'actions';
import request from 'middleware/async-request';
import {getWeatherByID} from 'api';

import {WeatherCard, WeatherCardModel} from 'cmp/WeatherCard';

import {Link} from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherLoading: false,
      weatherLoaded: false,
    };

    this.initWeather = this.initWeather.bind(this);
  }

  componentDidMount() {
    this.initWeather();
  }

  initWeather() {
    const id = this.props.match.params['id'];

    if (!isNaN(id)) {
      this.setState({weatherLoading: true});
      this.props.loadWeatherByID(id).then(() => {
        this.setState({weatherLoading: false, weatherLoaded: true});
      });
    }
  }

  render() {
    let WeatherCardObject = null;

    if (this.state.weatherLoaded) {
      WeatherCardObject = new WeatherCardModel(
          _.get(this.props.weather, 'name'),
          _.get(this.props.weather, 'sys.country'),
          _.get(this.props.weather, 'weather[0].main'),
          _.get(this.props.weather, 'weather[0].icon'),
          _.get(this.props.weather, 'weather[0].description'),
          _.get(this.props.weather, 'main.temp'),
          _.get(this.props.weather, 'main.pressure'),
          _.get(this.props.weather, 'main.humidity'),
          _.get(this.props.weather, 'wind.speed'),
          _.get(this.props.weather, 'wind.deg'),
          _.get(this.props.weather, 'clouds.all'),
      );
    }

    const loadingText = this.state.weatherLoading ? 'Weather loading ...' : '';

    const loading = this.state.weatherLoading && !this.state.weatherLoaded;

    return (
        <div className="App">
          <WeatherCard
              model={WeatherCardObject}
              loading={loading}
              loadingText={loadingText}
          />
          <Link to='/'>
            <span>Go back</span>
          </Link>
        </div>
    );
  }
}

export default connect(
    state => ({
      weather: state.weather,
    }),
    dispatch => ({
      loadWeatherByID: (id) => {
        return dispatch(request(setWeather, getWeatherByID, id));
      },
    }),
)(Home);
