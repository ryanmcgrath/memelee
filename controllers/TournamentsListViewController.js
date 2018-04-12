/**
 *  UpcomingTournamentsViewController
 *  
 *  Yeah, I do it iOS style. Handles fetching and displaying upcoming tournaments.
 *
 *  @copyright Ryan McGrath 2018.
 */

import moment from 'moment';
import React from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import {SearchBar} from 'react-native-elements';

import styles from '../styles';
import Constants from '../utils/Constants';
import MemeleeViewController from './MemeleeViewController';
import TournamentRow from './components/TournamentRow';

const keyExtractor = (item, index) => item.id;

@inject('Tournaments') @observer
export default class UpcomingTournamentsViewController extends MemeleeViewController {
    componentWillMount() {
        this.props.Tournaments.fetchFeatured();
    }
    
    onTap = (tournament) => {
        this.props.navigator.push({
            screen: Constants.Screens.TournamentInfoScreen,
            title: tournament.name,
            passProps: {tournament: tournament},
            navigatorStyle: {tabBarHidden: true}
        });
    }

    renderHeader = () => (
        <SearchBar lightTheme round placeholder={""} onChangeText={this.props.Tournaments.search} containerStyle={styles.searchContainerStyle} />
    )

    renderFooter = () => (
        this.props.Tournaments.fetchingData ? (<View style={{paddingTop: 200}}>
            <ActivityIndicator animating size="large" />
        </View>) : null
    )

    renderItem = ({item}) => (<TournamentRow tournament={item} onTap={this.onTap} />)

    render() {
        const props = {
            data: this.props.Tournaments.fetchingData ? [] : 
                this.props.Tournaments.mode === 'search' ? this.props.Tournaments.searchResults : 
                    this.props.Tournaments.tournamentsList,

            keyExtractor: keyExtractor,
            contentContainerStyle: styles.tournamentsListView,
            ListHeaderComponent: this.renderHeader,
            ListFooterComponent: this.renderFooter,
            renderItem: this.renderItem
        };

        return <FlatList {...props} renderItem={this.renderItem} />
    }
}
