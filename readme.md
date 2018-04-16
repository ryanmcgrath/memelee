# A Smash.gg (Completely Unofficial) App
Welcome! If you've hit this repository, you were probably looking for a Smash.gg app, frustrated that one doesn't exist. I know the feeling - it's why I originally looked into building this!

Ultimately, this repo represents a product I chose not to move forward with further development on. The reasoning boils down to:

- Smash.gg's API is technically unofficial, and has no guarantees of not breaking. There were a few points in development where this happened. Can't really launch a product that might arbitrarily break. I could go the route of having a server in the middle that acts as a cache or something, but that's a lot of work for something that will (hopefully) be superseded by an official app someday.
- Being that the Smash.gg API is pretty unofficial, it's also not particularly well documented. This isn't their fault or anything, as they're pretty clear about this fact, so it's not meant as a dig at them! I just know I spent a few afternoons piecing together how the various API calls work together (e.g, fetching featured tournaments, searching, brackets/phases/etc).

### What's Included in Here?
Good question! This repo has the following stuff pretty much working:

- Displaying featured tournaments on the home screen
- Searching for tournaments (past, present, upcoming, etc)
- Viewing tournament information
    - Markdown parsing for tournament "About" sections
    - Dedicated views for contact info, location details, etc
    - Parses out links and/or items like Stores, Compendiums, and so on
- A mostly working Bracket view
    - Depending on response formats from Smash.gg, this may or may not work depending on what tournament you try viewing. A good example to check out is top 8 for `The Mango` or one of the recent `Big House` or `Genesis` tournaments.

It's built with the following:

- React Native (I don't particularly care for Android, so I've not run it on there, but nothing in this package shouldn't run on Android once configured)
- [react-native-navigation](https://github.com/wix/react-native-navigation), because using the actual navigation constructs for each platform matters for it to feel native.
- Mobx, with a few niceties to make it play nice with react-native-navigation.
- Everything else you see in `package.json` that I'm honestly too lazy to list out in depth here (i.e, not notable enough to warrant a point).

### License?
Do whatever you want with this. I make no guarantees about it being up to date on any versions of React Native as that's a fast moving target, and if Smash.gg changes their API at some point then that'll obviously also cause issues. I'm open sourcing it moreso to gauge how much the community likes the idea, and to pass on all of this should someone else wanna pick it up and mess around with it.

I guess the only restriction would be that if you use this, just throw some credit somewhere. I'm not too particular as to where. Anything that's copyright Smash.gg is theirs and theirs alone, and I make no claims otherwise.

### Questions or comments?
- [Twitter: @ryanmcgrath](https://twitter.com/ryanmcgrath/)
- [Web: https://rymc.io](https://rymc.io)
- [Email: ryan@rymc.io](mailto:ryan@rymc.io)

### Screenshots
<img src="https://rymc.io/smashgg/1.png" width="250"> <img src="https://rymc.io/smashgg/2.png" width="250">
<img src="https://rymc.io/smashgg/3.png" width="250"> <img src="https://rymc.io/smashgg/4.png" width="250">
<img src="https://rymc.io/smashgg/5.png" width="250"> <img src="https://rymc.io/smashgg/6.png" width="250">
<img src="https://rymc.io/smashgg/7.png" width="250">
