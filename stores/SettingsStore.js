/**
 *  SettingsStore
 *
 *  Exactly what it sounds like.
 *
 *  @copyright Ryan McGrath 2018
 */

import moment from 'moment';
import {observable, action, runInAction} from 'mobx';

class Store {
    @observable settings;

    constructor() {
        this.settings = {};
    }
};

export default new Store();
