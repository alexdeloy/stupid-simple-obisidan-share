# Stupid Simple Obsidian Share
## A stupid simple self-hosted sharing service for Obsidian files

The world is getting more complicated every day. The same is true for the software development cosmos.

But what if it would not always have to be that way?

What if we make our lifes unnecessary complex ourselfs by throwing around containers, builders, frameworks, versioning hell and hundreds of MB of dependencies for ridiculously small tasks?

What if we go back to a simpler web?

Let's keep simple things, simple again. **Stupid simple** even.

Introducing _Stupid Simple Obsidian Share_.

A self-hosted service to convert your [Obsidian](https://obsidian.md/) page to static HTML and share them with others.

No Docker, no NPM, no build process, no bullshit.

## Installation

1) Copy the contents of the `server` folder in a directory on your webserver
2) Copy the `plugin` folder in your `.obsidian/plugins` folder and rename it to `stupid-simple-obisidan-share`
3) In Obsidan press the new _share_ button in the sidebar
4) The plugin sends the content of the current file to the server and a link to the generated HTML is pasted in your clipboard

## Todos

Yes it is very basic and unsafe for now. For the intended usecase of sharing some notes with friends and some clients, it does the job though.

There is a lot of room for improvments to come:
- check if a page was already shared in the current version
- better URLs
- authentication with the backend by a secret key
- minimal management interface to delete generated files again?

## Attributions

Built with Emanuil Rusev's excellent [Parsedown](https://github.com/erusev/parsedown) library and [MVP CSS](https://github.com/andybrewer/mvp/)

