# Fischl
Fischl is a fully serverless Discord bot designed to handle interaction-based commands efficiently, offering lightweight deployment without the need for dedicated hosting.

# Features
Currently, Fischl merely supports slash command interactions. However, I'll soon add support for other interaction based commands. But then again, calling it merely is pretty stupid since most bots nowdays rely on slash commands since discord doesn't want some low shi popular level bot to have message access in any discord server.

# Comparison with Server Bots
- The problem with other bots is that they require dedicated hosting and a maintained server to continue functioning, but as for Fischl, she runs on serverless functions, ( for me, on vercel ) and hence requiring no maintaince 

- Having no dedicated server also means that your bot may run without a coin being spent

# Limitations
There are some things that are simply not possible with simply interactions, the following are some examples of discord bots that Fischl will most likely fail to achieve.

- Music bots
Since they have to continously play music, and while serverless functions are meant to be ran for short period of times ( 10s on vercel ). Its pretty much even stupid to consider making a music bot with Fischl

- Moderation bots
They are dependent on various triggers that are totally not related to interactions. such as sending a offensive message, spamming, spamming join & leave, etc.

- Giveaway bots
They have to keep track of time and show the result when the time is crossed past it or reaches it, but serverless functions only wake up when an interaction occurs, which makes it very impossible.