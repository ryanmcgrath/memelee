/**
 *  BookmarksViewController
 *  
 *  Yeah, I do it iOS style. Handles bookmarked tournaments.
 *
 *  @copyright Ryan McGrath 2018.
 */

import moment from 'moment';
import React from 'react';
import {FlatList, Image, Text, View, TouchableOpacity} from 'react-native';

import MemeleeViewController from './MemeleeViewController';

export default class BookmarksViewController extends MemeleeViewController {
    state = {data: []};
    keyExtractor = (item, index) => item.id;

    render() {
        return <FlatList data={this.state.data} keyExtractor={this.keyExtractor} renderItem={({item}) => {
            return <View />;
        }} />
    }
}
