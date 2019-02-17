import Data from './dates.json';

const { dates, countries, cities, bands } = Data.reduce(
  (a, c) => {
    const { city, country, date, bands } = c;
    const { year, mounth } = date;

    // dates
    if (!a.dates[year]) a.dates[year] = {};
    if (!a.dates[year][mounth]) a.dates[year][mounth] = [];
    a.dates[year][mounth].push(c);

    // cities
    const code = `${country}__${city}`;
    if (!a.cities[code]) a.cities[code] = 1;
    else ++a.cities[code];

    //countries
    if (!a.countries[country]) a.countries[country] = 1;
    else ++a.countries[country];

    // bands
    bands.forEach(band => {
      if (!a.bands[band]) a.bands[band] = 1;
      else ++a.bands[band];
    });

    return a;
  },
  { dates: {}, countries: {}, cities: {}, bands: {} }
);

const ListSorted = l =>
  Object.keys(l)
    .map(k => [k, l[k]])
    .sort((a, b) => b[1] - a[1]);

const Lists = {
  Countries: ListSorted(countries),
  Cities: ListSorted(cities),
  Bands: ListSorted(bands),
  Dates: dates
};

export const DatesByRange = (f, t) => {
  const _fDate = new Date(f.year, f.mounth, f.day);
  const _from = _fDate.getTime();
  const _tDate = new Date(t.year, t.mounth, t.day);
  const _to = _tDate.getTime();

  return Data.filter(({ date: { year, mounth, day } }) => {
    const _sDate = new Date(year, mounth, day);
    const _date = _sDate.getTime();
    return _date >= _from && _date <= _to;
  });
};

export default Lists;
