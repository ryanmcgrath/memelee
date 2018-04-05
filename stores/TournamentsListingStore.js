/**
 *  TournamentListingsStore
 *
 *  Store for tournament listing and search data.
 *
 *  @copyright Ryan McGrath 2018
 */

import axios from 'axios';
import moment from 'moment';
import {observable, action, runInAction} from 'mobx';

const placeholders = [
    require('../images/placeholder1.png'),
    require('../images/placeholder2.png'),
    require('../images/placeholder3.png'),
];

class Store {
    @observable tournamentsList;
    @observable searchResults;
    @observable fetchingData;
    @observable mode;
    
    constructor() {
        this.tournamentsList = [];
        this.searchResults = [];
        this.fetchingData = false;
        this.mode = 'featured';
    }

    @action('Fetch Featured Tournaments')
    fetchFeatured = async (opts) => {
        this.fetchingData = true;
        this.mode = 'featured';
        
        const args = Object.assign({
            list: 'featured',
            reset: false
        }, opts || {});

        const api = 'https://smash.gg/api/-/gg_api./tournaments/list/featured;';
        const url = api + Object.keys(args).map(key => `${key}=${args[key]}`).join(';') + '?returnMeta=true'
        const response = await fetch(url);
        const data = await response.json();
        
        runInAction('Parse tournament listing data', () => {
            this.tournamentsList = this.parseData(data.entities.tournament, data.entities.event);
            this.mode = 'featured';
            this.fetchingData = false;
        });
    }

    searchTimer = null;
    cancelSource = null;

    @action('Perform Search')
    search = async (query) => {
        if(this.searchTimer) {
            clearTimeout(this.searchTimer);

            if(this.cancelSource) {
                this.cancelSource.cancel();
                this.cancelSource = null;
            }
        }

        if(query === '') {
            this.mode = 'featured';
            this.fetchingData = false;
            return;
        }

        this.searchTimer = setTimeout(async () => {
            this.fetchingData = true;
            this.cancelSource = axios.CancelToken.source();

            const api = 'https://smash.gg/api/-/gg_api./public/tournaments/schedule;';
            const args = {
                filter: encodeURIComponent(query),
                page: 1,
                per_page: 60,
                reset: false,
                schedule: true
            };

            const url = api + Object.keys(args).map(key => `${key}=${args[key]}`).join(';');
            axios.get(url, {
                cancelToken: this.cancelSource.token,
                params: {returnMeta: 'true'}
            }).then(response => {
                runInAction('Parse search results data', () => {
                    this.searchResults = this.parseData(response.data.items.entities.tournament, response.data.items.entities.event);
                    this.mode = 'search';
                    this.fetchingData = false;
                }); 
            }).catch(thrown => {
                // There's no need to do anything here, at least for now.
                if(axios.isCancel(thrown))
                    return;

                console.error(thrown);
            });            
        }, 500);
    }

    parseData = (tourneys, events) => {
        var tournaments = [];

        for(var i = 0, l = tourneys.length; i < l; i++) {
            var tourney = tourneys[i];
            if(tourney['private'] || tourney.sandboxMode || tourney.testMode)
                continue;

            var img = tourney.images.filter(img => img.width === 1200);
            if(img.length > 0)
                tourney.memeleePromoImage = {width: img[0].width, msrc: {uri: img[0].url}};
            else
                tourney.memeleePromoImage = {width: 1200, msrc: placeholders[Math.floor(Math.random() * 3)]};

            var starts = moment.unix(tourney.startAt).utc(),
                ends = moment.unix(tourney.endAt);

            tourney.memeleeTournamentRange = starts.format('MM/DD/YYYY') + ' - ' + ends.format('MM/DD/YYYY');
            tourney.memeleeEventsCount = tourney.eventIds.length;
            
            /* Stitch together the event listings... */
            tourney.memeleeEvents = tourney.eventIds.map(eventID => {
                const evts = events.filter(obj => obj.id === eventID);
                return evts.length > 0 ? evts[0] : null;
            }).filter(evt => evt !== null);

            tournaments.push(tourney)
        }

        return tournaments;
    }
}

export default new Store();
