/**
 *  BracketViewController
 *  
 *  Yeah, I do it iOS style. Handles displaying tournament bracket data.
 *
 *  @copyright Ryan McGrath 2018.
 */

import moment from 'moment';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {v4} from 'uuid';

//import SmashGG from '../store';
import MemeleeViewController from './MemeleeViewController';

const Match = ({set, ...rest}) => (
    <View style={{backgroundColor: '#3b3b48', borderColor: '#0e0e12', borderWidth: 0.5, borderRadius: 4, marginBottom: 20}}>
        <Text style={{padding: 5, color: '#dbdbde'}}>{set.entrant1.name ? set.entrant1.name : ''} <Text>{set.entrant1Score}</Text></Text>
        <View style={{borderTopWidth: 0.5, borderTopColor: '#2a2a33'}} />
        <Text style={{padding: 5, color: '#dbdbde'}}>{set.entrant2.name ? set.entrant2.name : ''} <Text>{set.entrant2Score}</Text></Text>
    </View>
);

export default class BracketViewController extends MemeleeViewController {
    state = {
        brackets: {
            winners: [],
            losers: [],
            grandFinals: []
        }
    };

    componentWillMount() {
        const evtSlugs = this.props.evt.slug.split('/');
        const evtSlug = evtSlugs.length > 0 ? evtSlugs[evtSlugs.length - 1] : null;
        const tournamentSlug = this.props.tournament.slugs[0].replace('tournament/', '');
 
        SmashGG.fetchBracketData(tournamentSlug, evtSlug, this.props.bracket.id).then(this.updateBracketsData).catch(console.error);
    }

    updateBracketsData = (brackets) => {
        this.setState({brackets: brackets});
    }
    
    render() {
        return (<ScrollView style={{flex: 1, backgroundColor: '#21212d'}} contentContainerStyle={{width: 10001}}>
            {['winners', 'losers'].map(key => (
                <View key={key} style={{backgroundColor: '#21212d', flexDirection: 'row', paddingTop: 20, paddingBottom: 20, paddingLeft: 20}}>
                    {this.state.brackets[key].map(bracket => (
                        <View key={bracket.key} style={{backgroundColor: '#21212d', marginRight: 20, width: 200, flexDirection: 'column'}}>
                            <Text>{bracket.title}</Text>
                            {bracket.sets.map(set => <Match key={set.id} set={set} />)}
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>);
    }
}

