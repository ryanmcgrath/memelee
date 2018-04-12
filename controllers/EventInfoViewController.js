/**
 *  EventInfoViewController
 *  
 *  Yeah, I do it iOS style. Handles displaying tournament event data.
 *
 *  @copyright Ryan McGrath 2018.
 */

import moment from 'moment';
import React from 'react';
import {ScrollView, StyleSheet, ActivityIndicator, Image, Text, View, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import Markdown from 'react-native-simple-markdown'
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SettingsList, {Header, Item} from 'react-native-settings-list';

import styles from '../styles';
import Constants from '../utils/Constants';
import MemeleeViewController from './MemeleeViewController';

const Loading = (props) => (
    <View style={{paddingTop: 20}}>
        <ActivityIndicator animating size="large" />
    </View>
);

const Standings = (props) => (
    props.error ? <View style={{padding: 20}}>
        <Text style={styles.eventsErrorTextHeader}>No Standings Found</Text>
        <Text style={styles.eventsErrorText}>Matches may not have been played yet.</Text>
    </View> : <View>
        <View style={{flexDirection: 'row', backgroundColor: '#010101'}}>
            <Text style={{backgroundColor: '#010101', color: '#f9f9f9', padding: 8, paddingLeft: 58, width: 230}}>Players</Text>
            <Text style={{backgroundColor: '#010101', color: '#f9f9f9', padding: 8}}>Losses</Text>
        </View>
        <ScrollView>
        {props.standings.map(standing => (
            <View key={standing.id} style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'gray'}}>
                <Text key={standing.id} style={{padding: 8, width: 50, textAlign: 'center', backgroundColor: 'gray'}}>
                    {standing.standing}
                </Text>
                <Text style={{padding: 8, width: 180}}>{standing.name}</Text>
                <View style={{padding: 8, flex: 1}}>{standing.losses.map(loss => <Text key={standing.id + loss} style={{flexShrink: 1}}>{loss}</Text>)}</View>
            </View>
        ))}
        </ScrollView>
    </View>
);

const s = StyleSheet.flatten(styles.tournamentDetailsEventWrapper);
const Brackets = (props) => (
    <SettingsList style={styles.tournamentEventsWrapper} borderWidth={s.borderBottomWidth} borderColor={s.borderBottomColor}>
        {props.brackets.map(bracket => (
            <Item key={bracket.name} itemWidth={50} title={bracket.name} backgroundColor={s.backgroundColor} style={styles.tournamentDetailsEventWrapper} titleStyle={styles.tournamentDetailsEventItem} onPress={() => props.onPress(bracket)} />
        ))}
    </SettingsList>
);

@inject('Events') @observer
export default class EventInfoViewController extends MemeleeViewController {
    state = {selectedIndex: 0};

    onBracketPress = (bracket) => {
        this.props.navigator.push({
            screen: Constants.Screens.Bracket,
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

    swapIndex = (index) => {
        this.setState({selectedIndex: index});
    }

    render() {
        return (<View>
            <SegmentedControlTab values={['Standings', 'Brackets']} borderRadius={0} activeTabStyle={styles.tournamentInfoActiveTableStyle} tabStyle={styles.tournamentInfoTabsStyle} tabTextStyle={styles.tournamentInfoTabTextStyle} selectedIndex={this.state.selectedIndex} onTabPress={this.swapIndex} />
           
            {this.state.selectedIndex === 0 ? 
                this.props.Events.fetchingStandingData ?
                    <Loading /> : <Standings standings={this.props.Events.standings} error={this.props.Events.standingsError} />
                : null
            }

            {this.state.selectedIndex === 1 ? 
                this.props.Events.fetchingBracketData ?
                    <Loading /> : <Brackets error={this.props.Events.standingsError} brackets={this.props.Events.phases} onPress={this.onBracketPress} />
                : null
            }
        </View>);
    }
}
