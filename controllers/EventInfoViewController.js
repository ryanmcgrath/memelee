/**
 *  EventInfoViewController
 *  
 *  Yeah, I do it iOS style. Handles displaying tournament event data.
 *
 *  @copyright Ryan McGrath 2018.
 */

import moment from 'moment';
import React from 'react';
import {ScrollView, Image, Text, View, TouchableOpacity} from 'react-native';
import Markdown from 'react-native-simple-markdown'
//import SmashGG from '../store';

import MemeleeViewController from './MemeleeViewController';

export default class EventInfoViewController extends MemeleeViewController {
    state = {
        standings: [],
        brackets: []
    };

    componentWillMount() {
        const evtSlugs = this.props.evt.slug.split('/');
        const evtSlug = evtSlugs.length > 0 ? evtSlugs[evtSlugs.length - 1] : null;
        const tournamentSlug = this.props.tournament.slugs[0].replace('tournament/', '');
        
        if((evtSlug && evtSlug !== '') && (tournamentSlug && tournamentSlug != '')) {
            SmashGG.fetchEventExpanded(tournamentSlug, evtSlug).then(this.updateBracketsData).catch(console.error);
            SmashGG.fetchEventStandings(tournamentSlug, evtSlug).then(this.updateStandingsData).catch(console.error);
        }
    }

    updateBracketsData = (data) => {
        this.setState({brackets: data});
    }
    
    updateStandingsData = (data) => {
        this.setState({standings: data});
    }

    onBracketPress = (bracket) => {
        this.props.navigator.push({
            screen: 'memelee.bracket',
            title: bracket.name,
            backButtonTitle: 'Back',
            passProps: {
                tournament: this.props.tournament,
                evt: this.props.evt,
                bracket: bracket
            },
            navigatorStyle: {tabBarHidden: true}
        });
    }

    render() {
        return (<ScrollView>
            <Text style={{padding: 8, backgroundColor: '#003366', fontSize: 16}}>Brackets</Text>
            {this.state.brackets.map(bracket => (
                <TouchableOpacity key={bracket.id} onPress={() => this.onBracketPress(bracket)}>
                    <Text style={{padding: 8, backgroundColor: 'gray'}}>{bracket.name}</Text>
                </TouchableOpacity>
            ))}

            <Text style={{padding: 8, marginTop: 20, backgroundColor: '#003366', fontSize: 16}}>Standings</Text>
            <View style={{flexDirection: 'row', backgroundColor: '#010101'}}>
                <Text style={{backgroundColor: '#010101', color: '#f9f9f9', padding: 8, paddingLeft: 58, width: 230}}>Players</Text>
                <Text style={{backgroundColor: '#010101', color: '#f9f9f9', padding: 8}}>Losses</Text>
            </View>
            {this.state.standings.map(standing => (
                <View key={standing.id} style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'gray'}}>
                    <Text key={standing.id} style={{padding: 8, width: 50, textAlign: 'center', backgroundColor: 'gray'}}>
                        {standing.finalPlacement}
                    </Text>
                    <Text style={{padding: 8, width: 180}}>{standing.name}</Text>
                    <View style={{padding: 8, flex: 1}}>{standing.losses.map(loss => <Text key={standing.id + loss} style={{flexShrink: 1}}>{loss}</Text>)}</View>
                </View>
            ))}
        </ScrollView>);
    }
}
