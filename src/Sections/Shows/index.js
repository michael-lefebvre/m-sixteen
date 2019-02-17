import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { withApp } from 'Hoc';
import Lists from './Data';
// import { DatesByRange } from './Data'
import './index.scss';

const { Dates, Countries, Cities, Bands } = Lists;

// console.log(DatesByRange({year: 2007, mounth: 5, day: 1 }, {year: 2007, mounth: 6, day: 1 }))

class Shows extends PureComponent {
  //
  // Life cycle
  // --------------------------------------------------

  //
  // Helpers
  // --------------------------------------------------

  //
  // Events Handlers
  // --------------------------------------------------

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { isActive } = this.props;

    const className = classNames('shows layer', {
      'layer--active': isActive,
      'shows--active': isActive
    });

    return (
      <div className={className}>
        <div>
          <h1>Show</h1>
          <ul>
            {Object.keys(Dates).map(year => (
              <li key={`shows__fulllist__${year}`}>
                <strong>{year}</strong>
                <ul>
                  {Object.keys(Dates[year]).map(mounth => (
                    <li key={`shows__fulllist__${year}__${mounth}`}>
                      <strong>{mounth}</strong>
                      <ul>
                        {Dates[year][mounth].map((show, i) => (
                          <li key={`shows__fulllist__${year}__${mounth}__${i}`}>
                            - {show.date.day} : {show.city}, {show.country}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <hr />
          <h1>Bands</h1>
          <ul>
            {Bands.map(([band, values], i) => (
              <li key={`shows__listbands__${i}`}>
                <strong>{band}</strong> ({values})
              </li>
            ))}
          </ul>
          <hr />
          <h1>Countries</h1>
          <ul>
            {Countries.map(([country, values], i) => (
              <li key={`shows__listcountries__${i}`}>
                <strong>{country}</strong> ({values})
              </li>
            ))}
          </ul>
          <hr />
          <h1>Cities</h1>
          <ul>
            {Cities.map(([code, values], i) => {
              const [country, city] = code.split('__');
              return (
                <li key={`shows__listcities__${i}`}>
                  <strong>
                    {city}, {country}
                  </strong>{' '}
                  ({values})
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapContextToProps = context => ({
  isActive: !context.matches('ready.shows.idle')
});

export default withApp(mapContextToProps)(Shows);
