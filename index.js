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
import Provider from './utils/MobxRnnProvider';

import TournamentsListViewController from './controllers/TournamentsListViewController';
import TournamentInfoViewController from './controllers/TournamentInfoViewController';
import EventInfoViewController from './controllers/EventInfoViewController';
import BracketViewController from './controllers//BracketViewController';
import BookmarksViewController from './controllers/BookmarksViewController';
import SettingsViewController from './controllers/settings';

const Constants = {
    Screens: {
        TournamentsList: 'memelee.tournamentsList',
        TournamentInfoScreen: 'memelee.tournamentInfoScreen',
        TournamentEventInfoScreen: 'memelee.tournamentEventInfoScreen',
        Bracket: 'memelee.tournamentBracket',
        Bookmarks: 'memelee.bookmarks',
        Settings: 'memelee.settings'
    }
};

Navigation.registerComponent(Constants.Screens.TournamentsList, () => TournamentsListViewController, Stores, Provider);
Navigation.registerComponent(Constants.Screens.TournamentInfoScreen, () => TournamentInfoViewController, Stores, Provider);
Navigation.registerComponent(Constants.Screens.TournamentEventInfoScreen, () => EventInfoViewController, Stores, Provider);
Navigation.registerComponent(Constants.Screens.TournamentEventBracket, () => BracketViewController, Stores, Provider);
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
