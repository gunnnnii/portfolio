---
name: smlygift
title: cryptocurrency tipping bot
thumbnail: "../images/twitter-bot_tweet.png"
desc: I created a tipping bot using the Twitter API to allow tweeters to send each other tips through the Smileycoin protocol
github: https://github.com/gunnnnii/smlygift
---

Smileygift is a twitter bot that allows users to send each other Smileycoin[^1] as tips through Twitter. It utilizes both the Twitter REST API and the Twitter Webhooks API.
This project was my final project for a cryptocurrency class I took in the University of Iceland. It was very fun to work with all these different technologies to create a coherent functional program.

![direct message example, using the balance! command.](../images/twitter-bot_tweet.png)

The backend is written in Typescript and runs in NodeJS. It makes extensive use of the [Twitter Autohook](https://github.com/twitterdev/autohook) library to enable comminucation through direct messaging, as well as to watch for mentions. It also uses Twitter's REST API to post tweets and send messages in response to events. The bot allows users to check their balance, send tips and withdraw their funds.

All the cryptocurrency functionality is achieved through the Smileycoin wallet, which is a fork from the Litecoin wallet.

[^1]: Smileycoin is a project started by a group including Gunnar Stefánsson(not me hehe) who taught the course. Its main goal is education and research rather then profitability. Smileycoin is entirely open source and the project can be accessed on [Github](https://github.com/tutor-web/smileyCoin).
