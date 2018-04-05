/**
 *  TournamentEventStore
 *
 *  Store for tournament event data. Currently kind of dumb, but that's fine.
 *
 *  @copyright Ryan McGrath 2018
 */

import {observable, action, runInAction} from 'mobx';

class Store {
    @observable data;
    @observable fetchingData;
    
    constructor() {
        this.data = {};
    }

    fetchEventExpanded = async (tournamentSlug, eventSlug, opts) => {
        const api = 'https://smash.gg/api/-/gg_api./tournament/' + tournamentSlug + '/event/' + eventSlug + ';';
        const args = Object.assign({
            expand: JSON.stringify(['phase', 'groups']),
            reset: false,
            slug: tournamentSlug,
            eventSlug: eventSlug
        }, opts || {});

        return fetch(
            api + Object.keys(args).map(key => `${key}=${args[key]}`).join(';') + '?returnMeta=true'
        ).then(response => response.json()).then(data => {
            if(typeof data.success !== 'undefined' && !data.success)
                throw new Error(data.message);
            
            return Promise.resolve(data.entities.phase ? data.entities.phase.map(phase => phase) : []);
        });
    }

/**
 *  fetchStandings
 *
 *  Given a set of slugs, fetches event standings.
 *
 *  @arg tournamentSlug {String} Slug for the tournament (e.g, "the-mango").
 *  @arg eventSlug {String} Slug for the event (e.g, "melee-singles").
 *  @arg opts {Object} Optional object for overriding request properties.
 *  @return Promise
 */
/*const fetchEventStandings = (tournamentSlug, eventSlug, opts) => {
    const api = 'https://smash.gg/api/-/gg_api./tournament/' + tournamentSlug + '/event/' + eventSlug + '/standings;';
    const args = Object.assign({
        entityId: null,
        entityType: 'event',
        slug: tournamentSlug,
        eventSlug: eventSlug,
        expand: JSON.stringify(['entrants', 'standingGroup', 'attendee']),
        mutations: JSON.stringify(['playerData', 'standingLosses']),
        page: 1,
        per_page: 25
    }, opts || {});

    return fetch(
        api + Object.keys(args).map(key => `${key}=${args[key]}`).join(';') + '?returnMeta=true'
    ).then(response => response.json()).then(data => {
        var s = data.items.entities.standing,
            l = s.length;

        return Promise.resolve(data.items.entities.entrants.map(entrants => {
            if(typeof entrants.losses === 'undefined')
                entrants.losses = [];

            data.items.entities.standing.forEach(standing => {
                if(standing.entityId === entrants.id && standing.mutations)
                    entrants.losses = entrants.losses.concat(standing.mutations.losses.map(loss => loss.name));
            });

            return entrants;
        }).sort((a, b) => a.finalPlacement > b.finalPlacement));
    });
};

/**
 *  fetchBracketData
 *
 *  Given a set of slugs/bracket ID, fetches bracket data for rendering. Performs a lot
 *  of smaller operations to transpose it into an actually usable format for display.
 *
 *  @arg tournamentSlug {String} Slug for the tournament (e.g, "the-mango").
 *  @arg eventSlug {String} Slug for the event (e.g, "melee-singles").
 *  @arg bracketID {String or Number} ID for the bracket - SmashGG calls this a phase. Go fig.
 *  @arg opts {Object} Optional object for overriding request properties.
 *  @return Promise
 
const fetchBracketData = (tournamentSlug, eventSlug, bracketID, opts) => {
    const api = 'https://smash.gg/api/-/gg_api./tournament/' + tournamentSlug + '/event/' + eventSlug + '/phase_groups;';
    const args = {
        slug: tournamentSlug,
        eventSlug: eventSlug,
        expand: JSON.stringify(['results', 'character']),
        mutations: JSON.stringify(['ffaData', 'playerData']),
        filter: JSON.stringify({phaseId: bracketID}),
        getSingleBracket: true,
        page: 1,
        per_page: 20,
        reset: false,
    };
    
    return fetch(
        api + Object.keys(args).map(key => `${key}=${args[key]}`).join(';') + '?returnMeta=true'
    ).then(response => response.json()).then(data => {
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
            grands.forEach(grandFinal => {
                brackets.winners.push({
                    title: 'Grand Finals',
                    sets: [grandFinal],
                    key: v4()
                });
            });
        }

        return Promise.resolve(brackets);
    });
};*/
}

export default new Store();
