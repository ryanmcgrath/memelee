/**
 *  Utils
 *
 *  Various utilities used throughout the app. A kitchen junk drawer, if you will.
 *
 *  @copyright Ryan McGrath 2018
 */

import {Linking} from 'react-native';

export const parseSlugs = (tournament, evt) => {
    const evtSlugs = evt && evt.slug.split('/');
    const evtSlug = evt && evtSlugs.length > 0 ? evtSlugs[evtSlugs.length - 1] : null;
    const tournamentSlug = (
        tournament.slug ? tournament.slug : 
            tournament.slugs && tournament.slugs.length ? tournament.slugs[0] : ''
    ).replace('tournament/', '');
   
    const slugs = {tournamentSlug: null, evtSlug: null};

    if(tournamentSlug && tournamentSlug !== '')
        slugs.tournament = tournamentSlug;

    if(evtSlug && evtSlug !== '')
        slugs.evt = evtSlug;

    return slugs;
};

export const openURL = (url) => {
    return Linking.canOpenURL(url).then(supported => {
        if(supported) Linking.openURL(url);
        else console.warn('Cannot open URL: ' + url);
    });
};
