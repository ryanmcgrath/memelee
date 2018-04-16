/**
 *  AttendeesListViewController
 *  
 *  Yeah, I do it iOS style. Handles fetching and displaying upcoming tournaments.
 *
 *  @copyright Ryan McGrath 2018.
 */

import moment from 'moment';
import React from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {inject, observer} from 'mobx-react/native';
import {SearchBar} from 'react-native-elements';

import styles from '../styles';
import Constants from '../utils/Constants';
import MemeleeViewController from './MemeleeViewController';
import TournamentRow from './components/TournamentRow';

const keyExtractor = (item, index) => item.id;

export default class AttendeesListViewController extends MemeleeViewController {
    state = {
        selectedIndex: 0
    };

    swapIndex = (index) => this.setState({
        selectedIndex: index
    });

    renderItem = ({item}) => (<View />)

    render() {
        const props = {
            data: this.props.data,
            keyExtractor: keyExtractor,
            renderItem: this.renderItem
        };
        
        const segmentedProps = {
            values: ['Players', 'Teams'],
            borderRadius: 0,
            activeTabStyle: styles.tournamentInfoActiveTableStyle,
            tabStyle: styles.tournamentInfoTabsStyle,
            tabTextStyle: styles.tournamentInfoTabTextStyle,
            selectedIndex: this.state.selectedIndex,
            onTabPress: this.swapIndex
        };

        return (<View>
            <SegmentedControlTab {...segmentedProps} />
            <FlatList {...props} />
        </View>);
    }
}
