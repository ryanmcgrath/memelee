/**
 *  TournamentEventStore
 *
 *  Store for tournament event data. Currently kind of dumb, but that's fine.
 *
 *  @copyright Ryan McGrath 2018
 */

import {v4} from 'uuid';
import {observable, action, runInAction} from 'mobx';
import {parseSlugs} from '../utils';

class Store {
    @observable.ref phases;
    @observable.ref bracketData;
    @observable fetchingData;

    @observable.ref standings;
    @observable fetchingStandingData;
    @observable standingsError;
    
    constructor() {
        this.phases = [];
        this.standings = [];
        this.bracketData = {winners: [], losers: []};
        this.tournamentSlug = null;
        this.evtSlug = null;
        this.fetchingData = false;
        this.fetchingStandingData = false;
        this.standingsError = false;
    }

    parseSlugs = (tournament, evt) => {
        const slugs = parseSlugs(tournament, evt);
        this.tournamentSlug = slugs.tournament;
        this.evtSlug = slugs.evt;
    }

    loadEventData = async(tournament, evt) => {
        this.phases = [];
        this.standings = [];
        this.bracketData = {winners: [], losers: []};
        this.tournamentSlug = null;
        this.evtSlug = null;

        this.parseSlugs(tournament, evt);
       
        if(this.tournamentSlug && this.evtSlug) {
            this.fetchPhases();
            this.fetchStandings();
        }
    }
    
    /**
     *  fetchPhases
     *
     *  Given a set of slugs, fetches event phases.
     */
    fetchPhases = () => {
        const api = 'https://smash.gg/api/-/gg_api./tournament/' + this.tournamentSlug + '/event/' + this.evtSlug + ';';
        const args = {
            expand: JSON.stringify(['phase', 'groups']),
            reset: false,
            slug: this.tournamentSlug,
            eventSlug: this.evtSlug
        };

        fetch(api + Object.keys(args).map(key => `${key}=${args[key]}`).join(';') + '?returnMeta=true').then(
            response => response.json()
        ).then(data => {
            if(typeof data.success !== 'undefined' && !data.success)
                throw new Error(data.message);
            
            runInAction('Parse out Phases...', () => {
                if(data.entities.phase)
                    this.phases = data.entities.phase.map(phase => phase);
            });
        });
    }

    /**
     *  fetchStandings
     *
     *  Given a set of slugs, fetches event standings.
     */
    fetchStandings = () => {
        const api = 'https://smash.gg/api/-/gg_api./tournament/' + this.tournamentSlug + '/event/' + this.evtSlug + '/standings;';
        const args = {
            entityId: null,
            entityType: 'event',
            slug: this.tournamentSlug,
            eventSlug: this.evtSlug,
            expand: JSON.stringify(['entrants', 'standingGroup', 'attendee']),
            mutations: JSON.stringify(['playerData', 'standingLosses']),
            page: 1,
            per_page: 25
        };

        this.standings = [];
        this.fetchingStandingsData = true;
        fetch(api + Object.keys(args).map(key => `${key}=${args[key]}`).join(';') + '?returnMeta=true').then(
            response => response.json()
        ).then(data => {
            runInAction('Parse out Standings...', () => {
                var s = data.items.entities.standing,
                    l = s.length;

                this.standingsError = false;
                this.standings = data.items.entities.entrants.map(entrants => {
                    if(typeof entrants.losses === 'undefined')
                        entrants.losses = [];

                    data.items.entities.standing.forEach(standing => {
                        if(standing.entityId === entrants.id) {
                            if(standing.mutations)
                                entrants.losses = entrants.losses.concat(standing.mutations.losses.map(loss => loss.name));

                            entrants.standing = standing.standing;
                        }
                    });

                    return entrants;
                }).sort((a, b) => a.finalPlacement > b.finalPlacement);
                this.fetchingStandingsData = false;
            });
        }).catch(error => {
            runInAction('Event standings data failed', () => {
                this.standingsError = true;
                this.fetchingStandingsData = false;
            });
        });
    }

    /**
     *  fetchBracketData
     *
     *  Given a set of slugs/bracket ID, fetches bracket data for rendering. Performs a lot
     *  of smaller operations to transpose it into an actually usable format for display.
     *
     *  @arg bracketID {String or Number} ID for the bracket - SmashGG calls this a phase. Go fig.
     */

//https://smash.gg/api/-/gg_api./tournament/fighter-s-spirit-2018-1;eventSlug=street-fighter-v-arcade-edition-singles;expand=["event","phase","wave","station","stream","entrantCounts","tagsByEntity","ruleset"];mutations=["playerData","profileTaskNotifs"];phaseId=246410;reset=false;slug=fighter-s-spirit-2018-1?returnMeta=true


    fetchBracketData = (bracketID) => {
        this.bracketData = {winners: [], losers: []};
        this.bracketID = bracketID;

        const api = 'https://smash.gg/api/-/gg_api./tournament/' + this.tournamentSlug + '/event/' + this.evtSlug + '/phase_groups;';
        const args = {
            slug: this.tournamentSlug,
            eventSlug: this.evtSlug,
            expand: JSON.stringify(['results', 'character']),
            mutations: JSON.stringify(['ffaData', 'playerData']),
            filter: JSON.stringify({phaseId: bracketID}),
            getSingleBracket: true,
            page: 1,
            per_page: 20,
            reset: false,
        };
        
        const url = api + Object.keys(args).map(key => `${key}=${args[key]}`).join(';') + '?returnMeta=true'
        //console.log(url);
        fetch(
            url
        ).then(response => response.json()).then(data => {
            if(data.items.resultEntity && data.items.resultEntity === 'groups' && typeof data.items.entities.sets === 'undefined') {
                this.parseAndStoreGroups(data);
                return;
            }

            const grands = [];
            const brackets = {
                winners: [],
                losers: []
            };

            // Filter through the set list and make sure each object is filled out with necessary data,
            // and then place them into their bracket accordingly. Brackets will be sorted afterwards.
            data.items.entities.sets.forEach(function(result) {
                if(result.entrant1Id === null || result.entrant2Id === null)
                    return;

                result.entrant1 = {};
                result.entrant2 = {};

                if(data.items.entities.entrants)
                    data.items.entities.entrants.forEach(function(entrant) {
                        if(entrant.id === result.entrant1Id)
                            result.entrant1 = entrant;
                    
                        if(entrant.id === result.entrant2Id)
                            result.entrant2 = entrant;
                    });

                if(result.isGF) {
                    grands.push(result);
                } else {
                    var isLosers = result.displayRound < 0,
                        key = isLosers ? 'losers' : 'winners',
                        idx = isLosers ? (result.displayRound * -1) : result.displayRound;
                    
                    while(brackets[key].length < idx) {
                        brackets[key].push({
                            title: '', // Filled in later~
                            sets: []
                        });
                    }
     
                    brackets[key][idx - 1].title = result.fullRoundText;
                    brackets[key][idx - 1].sets.push(result);
                    if(!brackets[key][idx - 1].key)
                        brackets[key][idx - 1].key = v4();
                }
            });

            // GFs are technically in the winners bracket, but for presentation purposes they're shoved
            // in after to be like how smash.gg presents them.
            if(grands.length > 0) {
                grands.forEach(grandFinal => brackets.winners.push({
                    title: 'Grand Finals',
                    sets: [grandFinal],
                    key: v4()
                }));
            }

            runInAction('Set Bracket Data', () => {
                this.bracketData = brackets;
            });
        });
    }

    parseAndStoreGroups = (data) => {
        console.warn('Groups!');
        runInAction('Set Groups Data', () => {

        });
    }
};

export default new Store();
