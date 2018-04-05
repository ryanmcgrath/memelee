/**
 *  BookmarksStore
 *
 *  Exactly what it sounds like.
 *
 *  @copyright Ryan McGrath 2018
 */

import moment from 'moment';
import {observable, action, runInAction} from 'mobx';

class Store {
    @observable bookmarks;

    constructor() {
        this.bookmarks = [];
    }
};

export default new Store();
