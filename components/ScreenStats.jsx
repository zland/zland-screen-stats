/*!
 * Copyright 2015 Florian Biewald
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

require('screenStats/sass/style');

var React = require('react');
var PureRenderMixin = React.addons.PureRenderMixin;
var StatsStore = require('stats/stores/StatsStore');
var GameStore = require('game/stores/GameStore');

function getStoreValues() {
  var accuracy = Math.round(StatsStore.getZombieHits() / StatsStore.getShotsFired() * 100)
  return {
    distance: Math.round(StatsStore.getDistance()),
    accuracy: isNaN(accuracy) ? 0 : accuracy,
    deaths: StatsStore.getDeaths(),
    kills: StatsStore.getZombiesShot()
  }
}

module.exports = React.createClass({

  mixins: [PureRenderMixin],

  getInitialState: function() {
    return getStoreValues();
  },

  componentDidMount: function() {
    StatsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    StatsStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStoreValues());
  },

  render: function() {
    return (
      <ul className="screen-stats">
        <li>Distance: {this.state.distance}m</li>
        <li>Accuracy: {this.state.accuracy}%</li>
        <li>Deaths: {this.state.deaths}</li>
        <li>Kills: {this.state.kills}</li>
      </ul>
    )
  }
});
