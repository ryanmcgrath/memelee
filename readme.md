# A Smash.gg (Completely Unofficial) App
Welcome! If you've hit this repository, you were probably looking for a Smash.gg app, frustrated that one doesn't exist. I know the feeling - it's why I originally looked into building this. Ever tried to view the bracket and watch a match at the same time? A mobile browser = no fun for this.

Ultimately, this repo represents a product I chose not to move forward with further development on. The reasoning boils down to:

- Smash.gg's API is technically unofficial, and has no guarantees of not breaking. There were a few points in development where this happened. Can't really launch a product that might arbitrarily break. I could go the route of having a server in the middle that acts as a cache or something, but that's a lot of work for something that will (hopefully) be superseded by an official app someday.
- Being that the Smash.gg API is pretty unofficial, it's also not particularly well documented. This isn't their fault or anything, as they're pretty clear about this fact, so it's not meant as a dig at them! I just know I spent a few afternoons piecing together how the various API calls work together (e.g, fetching featured tournaments, searching, brackets/phases/etc).

### What the hell is a Memelee?
[My little brother (@notjamss)](https://twitter.com/notjamss) and I play Melee a lot, by which I mean... I've been playing the game since it came out, this kid's been playing for a year, and he nowadays beats my ass every time.  Memelee (meme, pronounced may-m for some reason, lay) is a name we jokingly call our netplay sets since they usually turn into contests of who can do the dumbest combos to the other.

|   |   |
| --- | -------- |
| Melee is probably one of the most expressive and difficult to master games ever (accidentally) created, and I dunno if I've ever seen a kid improve as fast as he has. Attending Smashcon two years ago with him (as spectators) was a big highlight - at the right is a photo of him at a meet'n'greet with Wobbles. | <img src="https://github.com/ryanmcgrath/memelee/blob/master/screenshots/jake.jpg" width="250"> |

He was sadly diagnosed with Leukemia over the past few months, and I started building this around that same time as a small project with him. If you like what you see here, or you get some use out of it, or if you're just feeling overall generous, I'd encourage you to donate to a fund of your choice for cancer patients. If you're an esports org that wants to send him some swag or something, hit me up and I'm happy to help orchestrate it.

### Screenshots
<img src="https://github.com/ryanmcgrath/memelee/blob/master/screenshots/x.png?raw=true" width="100"> <img src="https://github.com/ryanmcgrath/memelee/blob/master/screenshots/xx.jpg?raw=true" width="100">
<img src="https://github.com/ryanmcgrath/memelee/blob/master/screenshots/xxx.jpg?raw=true" width="100"> <img src="https://github.com/ryanmcgrath/memelee/blob/master/screenshots/xxxx.png?raw=true" width="100">
<img src="https://github.com/ryanmcgrath/memelee/blob/master/screenshots/xxxxx.jpg?raw=true" width="100"> <img src="https://github.com/ryanmcgrath/memelee/blob/master/screenshots/xxxxxx.png?raw=true" width="100">

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
