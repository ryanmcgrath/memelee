/**
 *  AttendeesListViewController
 *  
 *  Yeah, I do it iOS style. Handles fetching and displaying upcoming tournaments.
 *
 *  @copyright Ryan McGrath 2018.
 */

import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsList, {Header, Item} from 'react-native-settings-list';

import styles from '../styles';
import {openURL} from '../utils';
import MemeleeViewController from './MemeleeViewController';

export default class ContactViewController extends MemeleeViewController {
    email = () => { openURL('mailto:' + this.props.data.email); }
    phone = () => { openURL('tel:' + this.props.data.phone); }
    twitter = () => { openURL('https://twitter.com/' + this.props.data.twitter); }

    render() {
        const s = StyleSheet.flatten(styles.tournamentDetailsEventWrapper);
        const ss = {
            itemWidth: 50,
            backgroundColor: s.backgroundColor,
            style: styles.tournamentDetailsEventWrapper,
            titleStyle: styles.tournamentDetailsEventItem
        };

        return (<ScrollView>
            <SettingsList>
                {this.props.data.email ? <Item {...ss} title={this.props.data.email} onPress={this.email} icon={
                    <View style={{height:30, marginLeft:10, alignSelf:'center'}}>
                        <Icon name="email" size={26} color={styles.tournamentPromoIconColors.eventsCount} />
                    </View>
                } /> : null}
                {this.props.data.phone ? <Item {...ss} title={this.props.data.phone} onPress={this.phone} icon={
                    <View style={{height:30, marginLeft:10, alignSelf:'center'}}>
                        <Icon name="phone" size={26} color={styles.tournamentPromoIconColors.eventsCount} />
                    </View>                    
                } /> : null}
                {this.props.data.twitter ? <Item {...ss} title={this.props.data.twitter} onPress={this.twitter} icon={
                    <View style={{height:30, marginLeft:10, alignSelf:'center'}}>
                        <Icon name="twitter" size={26} color={styles.tournamentPromoIconColors.eventsCount} />
                    </View>
                } /> : null}
            </SettingsList>

            {this.props.data.info ? <View style={styles.tournamentDetailsTextWrapper}>
                <Markdown style={styles.tournamentDetailsText}>
                    {this.props.data.info}
                </Markdown>
            </View> : null}
        </ScrollView>);
    }
}
