/**
 *  SettingsViewController
 *  
 *  Yeah, I do it iOS style. Handles settings.
 *
 *  @copyright Ryan McGrath 2018.
 */

import React from 'react';
import {ScrollView} from 'react-native';
import SettingsList, {Header, Item} from 'react-native-settings-list';

import styles from '../../styles';
import MemeleeViewController from '../MemeleeViewController';

export default class SettingsViewController extends MemeleeViewController {
    pressed = () => {}

    render() {
        return (<ScrollView>
            <SettingsList>
                <Header headerText='First Grouping' headerStyle={{color:'white'}}/>
                <Item itemWidth={50} title='Icon Example' onPress={this.pressed} />
            </SettingsList>
        </ScrollView>);
    }
}
