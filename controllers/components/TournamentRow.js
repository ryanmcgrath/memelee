/**
 *  TournamentRow.js
 *
 *  That row that displays tournament info.
 *
 *  @copyright Ryan McGrath 2018.
 */

import React from 'react';
import {Image, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../../styles';

const width = Dimensions.get('window').width;

export default class TournamentRow extends React.Component {
    onPress = () => {
        this.props.onTap(this.props.tournament);
    }

    render() {
        const x = width - 32;
        const w = {width: x, height: 130}; //x * this.props.tournament.memeleePromoImage.ratio};

        return (<View style={styles.tournamentRowWrapper}>
            <TouchableOpacity onPress={this.onPress} style={styles.tournamentRow}>
                <Image style={[styles.tournamentRowPromoImage, w]} source={this.props.tournament.memeleePromoImage.msrc} />
                <View style={styles.tournamentRowTextWrapper}>
                    <Text style={styles.tournamentRowName}>{this.props.tournament.name}</Text>
                    
                    <Text style={styles.tournamentRowDateRange}>
                        <Icon name="calendar-text" size={16} color={styles.tournamentPromoIconColors.calendar} /> {this.props.tournament.memeleeTournamentRange}
                    </Text>
                    
                    <Text style={styles.tournamentRowLocation}>
                        <Icon name="map-marker" size={16} color={styles.tournamentPromoIconColors.mapMarker} /> {this.props.tournament.hasOnlineEvents && (!this.props.tournament.city || this.props.tournament.city === '') ? 'Online' : (this.props.tournament.city ? this.props.tournament.city + ', ' : '') + (this.props.tournament.addrState ? this.props.tournament.addrState : '')}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.tournamentRowEventsCount}>
                            <Icon name="trophy-variant" size={16} color={styles.tournamentPromoIconColors.eventsCount} /> {this.props.tournament.memeleeEventsCount} Events
                        </Text>
                        <Text style={[styles.tournamentRowEventsCount, {marginLeft: 10}]}>
                            <Icon name="human-greeting" size={16} color={styles.tournamentPromoIconColors.attendeesCount} /> {this.props.tournament.attendeeCount} Attendees
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>);
    }
}
