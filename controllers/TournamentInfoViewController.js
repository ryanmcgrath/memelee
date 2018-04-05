/**
 *  TournamentInfoViewController
 *  
 *  Yeah, I do it iOS style. Handles fetching and displaying tournament data.
 *
 *  @copyright Ryan McGrath 2018.
 */

import moment from 'moment';
import React from 'react';
import {ScrollView, StyleSheet, Image, Text, View, TouchableOpacity, Dimensions} from 'react-native';
//import Markdown from 'react-native-simple-markdown'
import Markdown from 'react-native-markdown-renderer';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SettingsList, {Header, Item} from 'react-native-settings-list';

import styles from '../styles';
import MemeleeViewController from './MemeleeViewController';

const w = Dimensions.get('screen').width;
/*            <View style={styles.tournamentInfoButtonsRow}>
                <TouchableOpacity style={styles.tournamentRegistrationButton} onPress={this.registerForTournament}>
                    <Text style={styles.tournamentRegistrationButtonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tournamentBookmarkButton} onPress={this.registerForTournament}>
                    <Text style={styles.tournamentRegistrationButtonText}>Bookmark</Text>
                </TouchableOpacity>
            </View>
*/


export default class TournamentInfoViewController extends MemeleeViewController {
    state = {
        selectedIndex: 0
    };

    onEventTapped = (evt) => {
        this.props.navigator.push({
            screen: 'memelee.tournamentEventInfoScreen',
            title: evt.name,
            passProps: {tournament: this.props.tournament, evt: evt},
            navigatorStyle: {tabBarHidden: true}
        });
    }

    swapIndex = (index) => {
        this.setState({
            selectedIndex: index
        });
    }

    render() {
        const s = StyleSheet.flatten(styles.tournamentDetailsEventWrapper);

        return (<ScrollView>
            <Image style={[styles.tournamentInfoHeader, {width: w}]} source={this.props.tournament.memeleePromoImage.msrc} />
           
            <SegmentedControlTab values={['Overview', 'Events']} borderRadius={0} activeTabStyle={styles.tournamentInfoActiveTableStyle} tabStyle={styles.tournamentInfoTabsStyle} tabTextStyle={styles.tournamentInfoTabTextStyle} selectedIndex={this.state.selectedIndex} onTabPress={this.swapIndex} />

            {this.state.selectedIndex === 0 ? (<View style={styles.tournamentDetailsTextWrapper}>
                <Markdown style={styles.tournamentDetailsText}>
                    {this.props.tournament.details && this.props.tournament.details !== '' ? this.props.tournament.details : ''}
                </Markdown>
            </View>) : null}
            
            {this.state.selectedIndex === 1 ? (<SettingsList style={styles.tournamentEventsWrapper} borderWidth={s.borderBottomWidth} borderColor={s.borderBottomColor}>
                {this.props.tournament.memeleeEvents.map(evt => (
                    <Item key={evt.id} itemWidth={50} title={evt.name} backgroundColor={s.backgroundColor} style={styles.tournamentDetailsEventWrapper} titleStyle={styles.tournamentDetailsEventItem} /> 
                ))}
            </SettingsList>) : null}
        </ScrollView>);
    }
}
