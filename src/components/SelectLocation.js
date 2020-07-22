import React, {Component} from 'react';
import _ from 'lodash'
import Cities from 'assets/data/city.list.json';
import {Button, Dropdown} from 'semantic-ui-react';


class SelectLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      filteredCities: [],
      filter: '',
      selected: null
    };

    this.applyFilter = this.applyFilter.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.initCities = this.initCities.bind(this);
  }

  componentWillMount() {
    this.initCities();
  }

  initCities() {
    const self = this;
    new Promise((resolve) => {
      resolve(_.map(Cities, (item) => {
        return {
          key: item.id,
          text: item.name,
          value: item.name,
          flag: item.country.toLowerCase()
        }
      }))
    }).then((array) => {
      self.setState({
        cities: array
      })
    });
  }

  changeFilter(value) {
    this.setState({filter: value});
    this.applyFilter(value)
  }

  applyFilter(searchBy) {
    this.setState({
      filteredCities: searchBy.length > 0 ? _.filter(this.state.cities, (item) => item.text.substring(0, searchBy.length).toLowerCase() === searchBy.toLowerCase()).slice(0,150) : []
    });
  }

  setSelected(event, data) {
    const { value } = data;
    const { key } = data.options.find(o => o.value === value);
    this.setState({
      selected: key
    })
  }

  render() {
    return (
        <div className='city-select'>
          <Dropdown
              className='city-select__selector'
              placeholder='Find city'
              fluid
              search
              selection
              options={this.state.filteredCities}
              onSearchChange={(e) => this.changeFilter(e.currentTarget.value)}
              onChange={this.setSelected.bind(this)}
          />
          <Button
              className='city-select__submit'
              color='orange'
              content='Next'
              icon='right arrow'
              labelPosition='right'
              onClick={() => this.props.onActivate(this.state.selected)}
          />
        </div>
    );
  }
}

export default SelectLocation;
