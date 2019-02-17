import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withApp } from 'Hoc';
import Machine from 'Machines';

class LayoutDebug extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="home-video--mobile">
        <ul>
          <li>
            <button onClick={this.props.onNext}>NEXT</button>
          </li>
          <li>
            {this.props.getNextEvents().map((e, i) => {
              return (
                <button key={`btn__${i}`} onClick={() => Machine.send(e)}>
                  {e}
                </button>
              );
            })}
          </li>
          {this.props.stateMatches('ready.home.hero.mounted') && <li>HOME</li>}
          <li>
            <hr />
            <ul style={{ paddingLeft: 15 }}>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/releases/album">album</Link> ||{' '}
                <Link to="/releases/split">split</Link> ||{' '}
                <Link to="/releases/ep">ep</Link>
              </li>
              <li>
                <Link to="/videos/nevers">nevers</Link> ||{' '}
                <Link to="/videos/rouge">rouge</Link>
              </li>
            </ul>
          </li>
        </ul>
        <pre>{JSON.stringify(this.props.getValue(), null, 2)}</pre>
        <pre>{JSON.stringify(this.props.getStrings(), null, 2)}</pre>
        <pre>{JSON.stringify(this.props.getContext(), null, 2)}</pre>
        <pre>{JSON.stringify(this.props.getNextEvents(), null, 2)}</pre>
      </div>
    );
  }
}

const mapContextToProps = ({ context }) => ({
  HelloSection: context.section.current
});

export default withApp(mapContextToProps)(LayoutDebug);
