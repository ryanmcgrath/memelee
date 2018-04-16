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
import {inject, observer} from 'mobx-react/native';

import styles from '../styles';

import MemeleeViewController from './MemeleeViewController';

const Match = ({set, ...rest}) => (
    <View style={styles.matchWrapper}>
        <View style={styles.matchEntrant}>
            <Text style={styles.matchEntrantText}>{set.entrant1.name ? set.entrant1.name : ''}</Text>
            <Text style={[{padding: 5, color: '#fff', borderTopRightRadius: 4}, set.entrant1.id === set.winnerId ? {backgroundColor: '#1bc382'} : {}]}>{set.entrant1Score}</Text>
        </View>
        <View style={styles.matchSeparator} />
        <View style={styles.matchEntrant}>
            <Text style={styles.matchEntrantText}>{set.entrant2.name ? set.entrant2.name : ''}</Text>
            <Text style={[{padding: 5, color: '#fff', borderBottomRightRadius: 4}, set.entrant2.id === set.winnerId ? {backgroundColor: '#1bc382'} : {}]}>{set.entrant2Score}</Text>
        </View>
    </View>
);

@inject('Events') @observer
export default class BracketViewController extends MemeleeViewController {
    componentWillMount() {
        this.props.Events.fetchBracketData(this.props.bracket.id);
    }
   
    render() {
        return (<ScrollView style={{flex: 1, backgroundColor: '#21212d'}} contentContainerStyle={{width: 10001}}>
            {['winners', 'losers'].map(key => (
                <View key={key} style={{backgroundColor: '#21212d', flexDirection: 'row', paddingTop: 20, paddingBottom: 20, paddingLeft: 20}}>
                    {this.props.Events.bracketData[key].map(bracket => (
                        <View key={bracket.key} style={{backgroundColor: '#21212d', marginRight: 20, width: 200, flexDirection: 'column'}}>
                            <Text style={styles.bracketTitle}>{bracket.title}</Text>
                            {bracket.sets.map(set => {
                                if(set.isGF) console.log(JSON.stringify(set, null, 4));
                                return <Match key={set.id} set={set} />;
                            })}
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>);
    }
}

