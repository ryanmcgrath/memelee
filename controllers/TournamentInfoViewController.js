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
import Markdown, {PluginContainer} from 'react-native-markdown-renderer';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SettingsList, {Header, Item} from 'react-native-settings-list';
import linkify from 'linkify-it';

import styles from '../styles';
import Constants from '../utils/Constants';
import {openURL, parseSlugs} from '../utils';
import EventsStore from '../stores/TournamentEventStore';
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
        selectedIndex: 0,
        tabs: []
    };

    componentWillMount = () => {
        const tabs = [
            {slug: 'attendees', name: 'Attendees', screen: Constants.Screens.Attendees, adminOnly: false},
            {slug: 'location', name: 'Location', screen: Constants.Screens.Location, adminOnly: false},
            {slug: 'contact', name: 'Contact', screen: Constants.Screens.Contact, adminOnly: false}
        ];

        if(this.props.tournament.rules && this.props.tournament.rules !== '') {
            if(this.props.tournament.rules.startsWith('http://') || this.props.tournament.rules.startsWith('https://')) {
                tabs.push({slug: 'rules', name: 'Rules', url: this.props.tournament.rules, adminOnly: false});
            } else {
                tabs.push({slug: 'rules', name: 'Rules', info: this.props.tournament.rules, adminOnly: false});
            }
        }

        if(this.props.tournament.prizes && this.props.tournament.prizes !== '') {
            if(this.props.tournament.prizes.startsWith('http://') || this.props.tournament.prizes.startsWith('https://')) {
                tabs.push({slug: 'prizes', name: 'Prizes', url: this.props.tournament.prizes, adminOnly: false});
            } else {
                tabs.push({slug: 'prizes', name: 'Prizes', info: this.props.tournament.prizes, adminOnly: false});
            }
        }

        if(this.props.tournament.publishing && this.props.tournament.publishing.fantasy)
            tabs.push({
                slug: 'fantasy',
                name: 'Fantasy',
                url: 'https://smash.gg/tournament/' + parseSlugs(this.props.tournament, null).tournament + '/fantasy/',
                adminOnly: false
            });

        const generatedTabs = this.props.tournament.generatedTabs;
        if(generatedTabs) { 
            const objs = Object.keys(generatedTabs).map(key => generatedTabs[key]);
            
            objs.forEach(tab => {
                Object.keys(tab).map(key => ({
                    slug: key,
                    name: tab[key].name,
                    adminOnly: tab[key].adminOnly
                })).filter(tab => !tab.adminOnly || tab.adminOnly === false).forEach(tab => tabs.push(tab));
            });
        }

        this.setState({tabs: tabs});
    }

    onEventTapped = (evt) => {
        EventsStore.loadEventData(this.props.tournament, evt);
        this.props.navigator.push({
            screen: Constants.Screens.TournamentEventInfoScreen,
            title: evt.name,
            passProps: {tournament: this.props.tournament, evt: evt},
            navigatorStyle: {tabBarHidden: true}
        });
    }

    handleTab = (tab) => {
        if(tab.screen)
            return this.props.navigator.push({
                screen: tab.screen,
                title: tab.name,
                passProps: {data: []},
                navigatorStyle: {tabBarHidden: true}
            });

        if(tab.url)
            return openURL(tab.url);

        if(tab.info)
            return this.props.navigator.push({
                screen: Constants.Screens.Info,
                title: tab.name,
                passProps: {info: tab.info},
                navigatorStyle: {tabBarHidden: true}
            });
    }

    swapIndex = (index) => {
        this.setState({
            selectedIndex: index
        });
    }
    
    plugins = []

    render() {
        const s = StyleSheet.flatten(styles.tournamentDetailsEventWrapper);
        const ss = {
            itemWidth: 50,
            backgroundColor: s.backgroundColor,
            style: styles.tournamentDetailsEventWrapper,
            titleStyle: styles.tournamentDetailsEventItem
        };

        return (<ScrollView>
            <Image style={[styles.tournamentInfoHeader, {width: w}]} source={this.props.tournament.memeleePromoImage.msrc} />
           
            <SegmentedControlTab values={['Overview', 'Events']} borderRadius={0} activeTabStyle={styles.tournamentInfoActiveTableStyle} tabStyle={styles.tournamentInfoTabsStyle} tabTextStyle={styles.tournamentInfoTabTextStyle} selectedIndex={this.state.selectedIndex} onTabPress={this.swapIndex} />

            {this.state.selectedIndex === 0 ? (<View>
                <View style={styles.tournamentDetailsTextWrapper}>
                    <Markdown style={styles.tournamentDetailsText} plugins={this.plugins}>
                        {this.props.tournament.details && this.props.tournament.details !== '' ? this.props.tournament.details : ''}
                    </Markdown>
                </View>
                
                <SettingsList style={styles.tournamentEventsWrapper} borderWidth={s.borderBottomWidth} borderColor={s.borderBottomColor}>
                    {this.state.tabs.map(tab => <Item key={tab.slug} {...ss} title={tab.name} onPress={() => this.handleTab(tab)} />)}
                </SettingsList> 
            </View>
            ) : null}
            
            {this.state.selectedIndex === 1 ? (<SettingsList style={styles.tournamentEventsWrapper} borderWidth={s.borderBottomWidth} borderColor={s.borderBottomColor}>
                {this.props.tournament.memeleeEvents.map(evt => (
                    <Item key={evt.id} itemWidth={50} title={evt.name} backgroundColor={s.backgroundColor} style={styles.tournamentDetailsEventWrapper} titleStyle={styles.tournamentDetailsEventItem} onPress={() => this.onEventTapped(evt)} /> 
                ))}
            </SettingsList>) : null}
        </ScrollView>);
    }
}
