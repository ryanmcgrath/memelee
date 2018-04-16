/**
 *  AttendeesListViewController
 *  
 *  Yeah, I do it iOS style. Handles fetching and displaying upcoming tournaments.
 *
 *  @copyright Ryan McGrath 2018.
 */

import React from 'react';
import {ScrollView, StyleSheet, Image, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import Markdown, {PluginContainer} from 'react-native-markdown-renderer';
import SettingsList, {Header, Item} from 'react-native-settings-list';
import openMap from 'react-native-open-maps';

import styles from '../styles';
import MemeleeViewController from './MemeleeViewController';

export default class LocationViewController extends MemeleeViewController {
    render() {
        const addy = '\n' + this.props.data.venue.name + '\n' + this.props.data.venue.address + ' ' + this.props.data.venue.city + 
            ' ' + this.props.data.venue.state + ' ' + this.props.data.venue.postalCode + '\n' + this.props.data.venue.country + '\n';
        
        const s = StyleSheet.flatten(styles.tournamentDetailsEventWrapper);
        const ss = {
            itemWidth: 50,
            backgroundColor: s.backgroundColor,
            style: styles.tournamentDetailsEventWrapper,
            titleStyle: styles.tournamentDetailsEventItem
        };

        return (<ScrollView>
            <SettingsList style={styles.tournamentEventsWrapper} borderWidth={s.borderBottomWidth} borderColor={s.borderBottomColor}>
                <Item {...ss} title={addy} onPress={() => openMap({latitude: this.props.data.map.lat, longitude: this.props.data.map.lng})} />
            </SettingsList>

            {this.props.data.gettingThere ? <View style={styles.tournamentDetailsTextWrapper}>
                <Markdown style={styles.tournamentDetailsText}>
                    {this.props.data.gettingThere}
                </Markdown>
            </View> : null}
        </ScrollView>);
    }
}
