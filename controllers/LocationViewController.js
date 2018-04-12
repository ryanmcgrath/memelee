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
import {inject, observer} from 'mobx-react/native';
import {SearchBar} from 'react-native-elements';

import styles from '../styles';
import Constants from '../utils/Constants';
import MemeleeViewController from './MemeleeViewController';
import TournamentRow from './components/TournamentRow';

const keyExtractor = (item, index) => item.id;

export default class AttendeesListViewController extends MemeleeViewController {
    renderItem = ({item}) => (<View />)

    render() {
        const props = {
            data: this.props.data,
            keyExtractor: keyExtractor,
            renderItem: this.renderItem
        };

        return <FlatList {...props} renderItem={this.renderItem} />
    }
}
