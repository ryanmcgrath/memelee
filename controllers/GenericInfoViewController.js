/**
 *  AttendeesListViewController
 *  
 *  Yeah, I do it iOS style. Handles fetching and displaying upcoming tournaments.
 *
 *  @copyright Ryan McGrath 2018.
 */

import React from 'react';
import {ScrollView, View} from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import Hyperlink from 'react-native-hyperlink';

import styles from '../styles';
import Constants from '../utils/Constants';
import MemeleeViewController from './MemeleeViewController';

export default class GenericInfoViewController extends MemeleeViewController {
    render = () => (<ScrollView>
        <View style={styles.tournamentDetailsTextWrapper}>
            <Hyperlink>
                <Markdown style={styles.tournamentDetailsText}>
                    {this.props.info && this.props.info !== '' ? this.props.info : ''}
                </Markdown>
            </Hyperlink>
        </View>
    </ScrollView>);
}
