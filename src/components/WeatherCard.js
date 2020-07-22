import React, {Component} from 'react';
import {Card, Dimmer, Flag, Loader, Table, Image} from 'semantic-ui-react';

class WeatherCard extends Component {
  constructor(props) {
    super(props);

    this.getLocationStatus = this.getLocationStatus.bind(this);
    this.getTempC = this.getTempC.bind(this);
  }

  getLocationStatus(status) {
    switch (status) {
      case true: {
        return '';
      }
      case null: {
        return 'Locating...';
      }
      case false: {
        return 'Locating errored';
      }
      default: {
        return '';
      }
    }
  }

  getTempC(tempK) {
    return (tempK - 273.15).toFixed(2)
  }

  render() {
    const model = this.props.model instanceof WeatherCardModel ? this.props.model : new WeatherCardModel();

    let flag = <Flag name={model.country.toLowerCase()}/>;
    let locationText = 'Weather in ' + model.town;
    let icon = 'https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/' + model.icon + '.png';

    let loader = this.props.loading ? <div className='loader'>
      <Dimmer active inverted>
        <Loader size='large'>{this.props.loadingText}</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
    </div> : null;

    return (
    <Card>
      {loader}
      <Card.Content>
        <Card.Header>
          <div className='flex flex--space-between'>
            <span className='m-0'>{locationText} {this.getLocationStatus(this.props.locationStatus)}</span>
          </div>
        </Card.Header>
        <Card.Meta>
          <span className='date'>{flag} {model.country}</span>
        </Card.Meta>
        <div className='flex flex--centered fs-30'>
          <p>{model.weather}</p>
        </div>
        <div className='flex flex--centered p-10'>
          <div className="weather-icon dimension-10 centered-in">
            <img className='dimension-5' src={icon} alt='weather icon'/>
          </div>
          <span className='fs-30 flex flex--centered m-l-10'>{this.getTempC(model.temp)} °C</span>
        </div>
        <Card.Description>
          <Table celled striped>
            <Table.Body>
              <Table.Row>
                <Table.Cell collapsing>
                  Wind
                </Table.Cell>
                <Table.Cell>
                  <div>
                    <p>Speed: {model.windSpeed} m/s</p>
                    <p>Deg: {model.windDeg}°</p>
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>
                  Cloudiness
                </Table.Cell>
                <Table.Cell>
                  {model.clouds} %
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>
                  Pressure
                </Table.Cell>
                <Table.Cell>
                  {model.pressure} hpa
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>
                  Humidity
                </Table.Cell>
                <Table.Cell>
                  {model.humidity} %
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p className='capitalize color-black'>{model.description}</p>
      </Card.Content>
    </Card>
    );
  }
}

class WeatherCardModel {
  constructor(
      town = null,
      country = null,
      weather = null,
      icon = null,
      description = null,
      temp = null,
      pressure = null,
      humidity = null,
      windSpeed = null,
      windDeg = null,
      clouds = null
  ) {
    this.town = town ? town : '';
    this.country = country ? country : '';
    this.weather = weather ? weather : '';
    this.icon = icon ? icon : '';
    this.description = description ? description : '';
    this.temp = temp || !isNaN(Number(temp)) ? temp : '';
    this.pressure = pressure || !isNaN(Number(pressure)) ? pressure : '';
    this.humidity = humidity || !isNaN(Number(humidity)) ? humidity : '';
    this.windSpeed = windSpeed || !isNaN(Number(windSpeed)) ? windSpeed : '';
    this.windDeg = windDeg || !isNaN(Number(windDeg)) ? windSpeed : '';
    this.clouds = clouds || !isNaN(Number(clouds)) ? clouds : '';
  }
}

export {WeatherCard, WeatherCardModel};
