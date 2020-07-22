import React, {Component} from 'react';
import _ from 'lodash';
import Location from 'helpers/Location';
import {connect} from 'react-redux';
import {setWeather, setCurrentLocation} from 'actions';
import request from 'middleware/async-request';
import {getWeatherByCoords, getWeatherByID} from 'api';

import {WeatherCard, WeatherCardModel} from 'cmp/WeatherCard';
import SelectLocation from 'cmp/SelectLocation';

import {Redirect} from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationStatus: false,
      weatherLoading: false,
      weatherLoaded: false,
      redirect: null,
    };

    this.initHomePage = this.initHomePage.bind(this);
  }

  componentDidMount() {
    if (!this.state.weatherLoaded && this.state.locationStatus === false) {
      this.initHomePage();
    }
  }

  initHomePage() {
    const loadWeather = (coords) => {
      this.setState({locationStatus: true, weatherLoading: true});
      this.props.loadWeatherByCoords(coords.lat, coords.lon).then(() => {
        this.setState({weatherLoading: false, weatherLoaded: true});
      });
      this.props.saveCurrentLocation(coords.lat, coords.lon);
    };

    if (this.props.currentLocation) {
      loadWeather(this.props.currentLocation)
    } else {
      Location.getCurrent().then((data) => {
        loadWeather(data);
      }).catch((error) => {
        this.setState({locationStatus: null});
      });
    }
  }

  loadWeatherByID(id) {
    this.setState({redirect: '/city/' + id});
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

    const loadingText = this.state.locationStatus === false
        ? 'Try to get location ...'
        : this.state.locationStatus === null ? 'Allow showing of location ...' : this.state.weatherLoading ?
                'Weather loading ...' : 'Couldn\'t load weather ...';

    const loading = (!this.state.locationStatus || this.state.weatherLoading)
        && !this.state.weatherLoaded;

    if (this.state.redirect) return <Redirect to={this.state.redirect}/>;

    return (
        <div className="App">
          <WeatherCard
              model={WeatherCardObject}
              loading={loading}
              loadingText={loadingText}
          />
          <SelectLocation onActivate={this.loadWeatherByID.bind(this)}/>
        </div>
    );
  }
}

export default connect(
    state => ({
      weather: state.weather,
      currentLocation: state.location
    }),
    dispatch => ({
      loadWeatherByCoords: (lat, lon) => {
        return dispatch(request(setWeather, getWeatherByCoords, lat, lon));
      },
      loadWeatherByID: (id) => {
        return dispatch(request(setWeather, getWeatherByID, id));
      },
      saveCurrentLocation: (lat, lon) => {
        dispatch(setCurrentLocation({lat, lon}));
      },
    }),
)(Home);
