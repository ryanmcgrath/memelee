/**
 *  index.js, ala the App itself~
 *
 *  Handles registering navigation components (screens), and making sure some basic
 *  tab bar styling is applied.
 *
 *  @copyright Ryan McGrath 2018
 */

import React from 'react';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import Stores from './stores';
import Constants from './utils/Constants';
import Provider from './utils/MobxRnnProvider';

import TournamentsListViewController from './controllers/TournamentsListViewController';
import TournamentInfoViewController from './controllers/TournamentInfoViewController';
import AttendeesListViewController from './controllers/AttendeesListViewController';
import LocationViewController from './controllers/LocationViewController';
import ContactViewController from './controllers/ContactViewController';
import GenericInfoViewController from './controllers/GenericInfoViewController';
import EventInfoViewController from './controllers/EventInfoViewController';
import BracketViewController from './controllers//BracketViewController';
import BookmarksViewController from './controllers/BookmarksViewController';
import SettingsViewController from './controllers/settings';

Navigation.registerComponent(Constants.Screens.TournamentsList, () => TournamentsListViewController, Stores, Provider);
Navigation.registerComponent(Constants.Screens.TournamentInfoScreen, () => TournamentInfoViewController, Stores, Provider);
Navigation.registerComponent(Constants.Screens.TournamentEventInfoScreen, () => EventInfoViewController, Stores, Provider);
Navigation.registerComponent(Constants.Screens.Attendees, () => AttendeesListViewController, Stores, Provider);
Navigation.registerComponent(Constants.Screens.Location, () => LocationViewController, Stores, Provider);
Navigation.registerComponent(Constants.Screens.Contact, () => ContactViewController, Stores, Provider);
Navigation.registerComponent(Constants.Screens.Info, () => GenericInfoViewController, Stores, Provider);
Navigation.registerComponent(Constants.Screens.Bracket, () => BracketViewController, Stores, Provider);
Navigation.registerComponent(Constants.Screens.Bookmarks, () => BookmarksViewController, Stores, Provider);
Navigation.registerComponent(Constants.Screens.Settings, () => SettingsViewController, Stores, Provider);

Promise.all(['contacts', 'book', 'settings'].map(icon => Icon.getImageSource(icon, 26))).then(values => {
    Navigation.startTabBasedApp({
        tabsStyle: styles.tabBarStyles,

        tabs: [
            {label: 'Tournaments', icon: values[0], title: 'Tournaments', screen: Constants.Screens.TournamentsList},
            {label: 'Bookmarks', icon: values[1], title: 'Bookmarks', screen: Constants.Screens.Bookmarks},
            {label: 'Settings', icon: values[2], title: 'Settings', screen: Constants.Screens.Settings}
        ]
    });
});
