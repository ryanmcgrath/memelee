/**
 *  smashGG
 *
 *  Handles communication with Smash.gg endpoints. Mostly promise based.
 *
 *  @copyright Ryan McGrath 2018, unless the content belongs to Smash.gg, in which case,
 *  it's them.
 */

import {v4} from 'uuid';
import moment from 'moment';
import {create} from 'mobx-persist';
import {AsyncStorage} from 'react-native';

import TournamentsListingStore from './TournamentsListingStore';
import TournamentEventStore from './TournamentEventStore';
import BookmarksStore from './BookmarksStore';
import SettingsStore from './SettingsStore';

const hydrate = create({
    storage: AsyncStorage
});

const stores = {
    Tournaments: TournamentsListingStore,
    TournamentEventStore: TournamentEventStore,
    Bookmarks: BookmarksStore,
    Settings: SettingsStore
};

// Hydrate

export default stores;
