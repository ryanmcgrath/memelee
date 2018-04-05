/**
 *  Stylesheets
 *
 *  App-wide stylesheets, in one sheet because I'm lazy as hell.
 *
 *  @copyright Ryan McGrath 2018
 */

import {StyleSheet, Platform} from 'react-native';

const PlatformEnum = {IOS: 'ios', ANDROID: 'android'};

const textColor = '#e4e4e7';
const iconColor = '#00a1fe';

const stylesheet = StyleSheet.create({
    searchContainerStyle: {
        backgroundColor: '#12191f',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingLeft: 8,
        paddingRight: 8
    },

    tournamentsListView: {paddingBottom: 16},

    tournamentRowWrapper: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 6
    },

    tournamentRow: {
        justifyContent: 'center',
        backgroundColor: '#1d2730',
        borderRadius: 6,
        overflow: 'hidden'
    },

    tournamentRowPromoImage: {
        backgroundColor: '#181b26',
    },

    tournamentRowTextWrapper: {
        flex: 1,
        padding: 16
    },

    tournamentRowName: { color: textColor, fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    tournamentRowDateRange: { color: textColor, marginBottom: 8 },
    tournamentRowLocation: { color: textColor, marginBottom: 8 },
    tournamentRowEventsCount: { color: textColor },

    tournamentInfoHeader: {
        backgroundColor: '#181b26',
        height: 200
    },

    tournamentInfoTabsStyle: {
        borderWidth: 0,
        paddingVertical: 10,
        backgroundColor: '#101319'
    },

    tournamentInfoTabTextStyle: {
        color: iconColor
    },

    tournamentInfoActiveTabStyle: {
        backgroundColor: iconColor
    },

    tournamentDetailsTextWrapper: {
        padding: 18
    },

    tournamentDetailsEventWrapper: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#0e141a',
        backgroundColor: '#1d2730'
    },

    tournamentDetailsEventItem: {
        color: textColor,
        fontSize: 16,
    },

    tournamentInfoButtonsRow: {
        flexDirection: 'row'
    },

    tournamentRegistrationButton: {
        backgroundColor: iconColor,
        padding: 10,
        flex: 1
    },

    tournamentRegistrationButtonText: {
        color: textColor,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    tournamentBookmarkButton: {
        flex: 1,
        backgroundColor: iconColor,
        padding: 10,
    }
});

/**
 *  navigatorStyles
 *
 *  Handles styling the navigation (top) bar. Needs to be a separate property to avoid
 *  React Native's CSS parsing junk.
 */
stylesheet.navigatorStyles = {
    navBarBackgroundColor: '#12191f',
    navBarTextColor: '#e6e6e8',
    navBarButtonColor: '#307ace',
    navBarTranslucent: false,
    navBarNoBorder: true,
    screenBackgroundColor: '#12191f',
    largeTitle: true,
    statusBarTextColorScheme: 'light'
};

/**
 *  tabBarStyles
 *
 *  Handles styling the tab (bottom) bar. Needs to be a separate property to avoid
 *  React Native's CSS parsing junk.
 */
stylesheet.tabBarStyles = {
    tabBarBackgroundColor: '#101319',
    tabBarTranslucent: true,
    tabBarButtonColor: '#25313a',
    tabBarSelectedButtonColor: '#0090eb',
    tabBarHideShadow: false
};

/**
 *  tournamentPromoIconColors
 *
 *  Colors for specific icons.
 */
stylesheet.tournamentPromoIconColors = {
    calendar: iconColor,
    mapMarker: iconColor,
    eventsCount: iconColor,
    attendeesCount: iconColor
};

/**
 *  tournamentDetailsText
 *
 *  Styles for the markdown-parsed area that describes tournaments. Separate property
 *  due to the way it relies on some annoying key words.
 */
stylesheet.tournamentDetailsText = StyleSheet.create({ 
    view: {},

    codeBlock: {
        borderWidth: 1,
        borderColor: "#1d2730",
        backgroundColor: "#1d2730",
        padding: 10,
        borderRadius: 4,
        color: textColor
    },

    codeInline: {
        borderWidth: 1,
        borderColor: "#1d2730",
        backgroundColor: "#1d2730",
        padding: 10,
        borderRadius: 4,
        color: textColor
    },

    del: {
        backgroundColor: "#000000"
    },

    em: {
        fontStyle: "italic"
    },

    headingContainer: {
        flexDirection: "row"
    },

    heading: {},
    
    heading1: {
        fontSize: 26,
        lineHeight: 32,
        marginBottom: 15
    },

    heading2: {
        fontSize: 24
    },

    heading3: {
        fontSize: 18
    },

    heading4: {
        fontSize: 16
    },

    heading5: {
        fontSize: 13
    },

    heading6: {
        fontSize: 11
    },

    hr: {
        backgroundColor: '#28333d',
        height: 1,
        marginVertical: 10
    },
    
    blockquote: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 20,
        backgroundColor: '#1d2730'
    },

    inlineCode: {
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: "Courier",
        fontWeight: "bold"
    },

    list: {},
    
    listItem: {
        flex: 1,
        flexWrap: "wrap"
        // backgroundColor: 'green',
    },

    listUnordered: {},

    listUnorderedItem: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },

    listUnorderedItemIcon: {
        marginLeft: 10,
        marginRight: 10,
        
        ...Platform.select({
            [PlatformEnum.IOS]: {
                lineHeight: 36
            },

            [PlatformEnum.ANDROID]: {
                lineHeight: 30
            }
        })
    },

    listUnorderedItemText: {
        fontSize: 20,
        lineHeight: 20
    },

    listOrdered: {},
    
    listOrderedItem: {
        flexDirection: "row"
    },

    listOrderedItemIcon: {
        marginLeft: 10,
        marginRight: 10,
        
        ...Platform.select({
            [PlatformEnum.IOS]: {lineHeight: 36},
            [PlatformEnum.ANDROID]: {lineHeight: 30}
        })
    },

    listOrderedItemText: {
        fontWeight: "bold",
        lineHeight: 20
    },

    paragraph: {
        marginTop: 10,
        marginBottom: 10,
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },

    hardbreak: {
        width: '100%',
        height: 1
    },

    strong: {
        fontWeight: "bold"
    },

    table: {
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 3
    },

    tableHeader: {},
    
    tableHeaderCell: {
        flex: 1,
        // color: '#000000',
        padding: 5
        // backgroundColor: 'green',
    },

    tableRow: {
        borderBottomWidth: 1,
        borderColor: "#000000",
        flexDirection: "row"
    },

    tableRowCell: {
        flex: 1,
        padding: 5
    },

    text: {color: textColor, fontSize: 16, lineHeight: 22},
    
    strikethrough: {
        textDecorationLine: "line-through"
    },

    link: {
        textDecorationLine: "underline"
    },

    u: {
        borderColor: "#000000",
        borderBottomWidth: 1
    },

    image: {
        flex: 1
    }
});

export default stylesheet;
