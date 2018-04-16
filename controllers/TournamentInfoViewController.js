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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

const determineTabs = (tournament) => {
    const slugs = parseSlugs(tournament, null);
    const tabs = [
        // Actually can't do this without using what's pretty clearly a private API. :(
        // {slug: 'attendees', name: 'Attendees', screen: Constants.Screens.Attendees, adminOnly: false, data: []}
        {slug: 'attendees', icon: 'link', name: 'Attendees', url: 'https://smash.gg/tournament/' + slugs.tournament + '/attendees/players', adminOnly: false}
    ];

    if(
        tournament.gettingThere || tournament.lat || tournament.lng || tournament.mapsPlaceId || tournament.venueName ||
        tournament.venueAddress || tournament.city || tournament.addrState || tournament.countryCode || tournament.postalCode
    ) tabs.push({
        slug: 'location',
        name: 'Location',
        icon: 'map-marker',
        screen: Constants.Screens.Location,
        adminOnly: false,
        data: {
            gettingThere: tournament.gettingThere,
            map: {
                lat: tournament.lat,
                lng: tournament.lng,
                mapsPlaceId: tournament.mapsPlaceId,
            },
            venue: {
                name: tournament.venueName,
                address: tournament.venueAddress,
                city: tournament.city,
                state: tournament.addrState,
                country: tournament.countryCode,
                postalCode: tournament.postalCode
            }
        }
    });
    
    tabs.push({
        slug: 'contact',
        name: 'Contact',
        icon: 'email',
        screen: Constants.Screens.Contact,
        adminOnly: false,
        data: {
            email: tournament.contactEmail,
            info: tournament.contactInfo,
            phone: tournament.contactPhone,
            twitter: tournament.contactTwitter
        }
    });

    if(tournament.rules && tournament.rules !== '') {
        if(tournament.rules.startsWith('http://') || tournament.rules.startsWith('https://')) {
            tabs.push({slug: 'rules', icon: 'link', name: 'Rules', url: tournament.rules, adminOnly: false});
        } else {
            tabs.push({slug: 'rules', name: 'Rules', icon: 'file-document-box', info: tournament.rules, adminOnly: false});
        }
    }

    if(tournament.prizes && tournament.prizes !== '') {
        if(tournament.prizes.startsWith('http://') || tournament.prizes.startsWith('https://')) {
            tabs.push({slug: 'prizes', name: 'Prizes', icon: 'trophy', url: tournament.prizes, adminOnly: false});
        } else {
            tabs.push({slug: 'prizes', name: 'Prizes', icon: 'trophy', info: tournament.prizes, adminOnly: false});
        }
    }

    if(tournament.publishing && tournament.publishing.fantasy)
        tabs.push({
            slug: 'fantasy',
            name: 'Fantasy',
            icon: 'chart-timeline',
            url: 'https://smash.gg/tournament/' + slugs.tournament + '/fantasy/',
            adminOnly: false
        });

    const generatedTabs = tournament.generatedTabs;
    if(generatedTabs) { 
        const objs = Object.keys(generatedTabs).map(key => generatedTabs[key]);
        
        objs.forEach(tab => {
            Object.keys(tab).map(key => ({
                slug: key,
                name: tab[key].name,
                adminOnly: tab[key].adminOnly,
                icon: 'link',
                url: 'https://smash.gg/tournament/' + slugs.tournament + '/' + key
            })).filter(tab => !tab.adminOnly || tab.adminOnly === false).forEach(tab => tabs.push(tab));
        });
    }

    const links = tournament.links;
    if(links) {
        Object.keys(tournament.links).forEach(key => {
            tabs.push({
                slug: key,
                icon: 'link',
                name: key[0].toUpperCase() + key.substring(1),
                url: links[key]
            });
        });
    }

    return tabs;
}

const SIcon = (icon) => (
    <View style={{height:30, marginLeft:10, alignSelf:'center'}}>
        <Icon name={icon} size={26} color={styles.tournamentPromoIconColors.eventsCount} />
    </View>
);

export default class TournamentInfoViewController extends MemeleeViewController {
    state = {
        selectedIndex: 0,
        tabs: []
    };

    componentWillMount = () => {
        this.setState({
            tabs: determineTabs(this.props.tournament)
        });
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
                passProps: {data: tab.data},
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
                    {this.state.tabs.map(tab => <Item icon={SIcon(tab.icon)} key={tab.slug} {...ss} title={tab.name} onPress={() => this.handleTab(tab)} />)}
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
