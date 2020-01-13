[![GitHub license](https://img.shields.io/github/license/andrehtissot/electron-game-collection.svg)](https://github.com/andrehtissot/electron-game-collection/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/andrehtissot/electron-game-collection.svg)](https://github.com/andrehtissot/electron-game-collection/issues)
[![Known Vulnerabilities](https://snyk.io/test/github/andrehtissot/electron-game-collection/badge.svg?targetFile=package.json)](https://snyk.io/test/github/andrehtissot/electron-game-collection?targetFile=package.json)
[![DeepScan grade](https://deepscan.io/api/teams/3417/projects/6527/branches/54967/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3417&pid=6527&bid=54967)

# How to Build and Run
The most simplest way to build it as a complete package is by running this script:
```bash
mkdir ~/game-collection
cd ~/game-collection
git clone https://github.com/andrehtissot/electron-game-collection.git
git clone https://github.com/andrehtissot/electron-game-collection-server.git
git clone https://github.com/andrehtissot/electron-game-collection-steam-plugin.git
cd electron-game-collection
npm install
npm run build-release
```
And within `~/game-collection/out`, you shall find the directory with the binary ready.

# The Project
Having more than a couple of computer games can get difficult to manage, specially when the collection is divided between many different stores.

There are many launchers out there, usually not multi-platform, helpful to manage installed or locally stored,  but none focused on the online collection.

## History
As the goal was ease the control of a big collection and having a computer was a giving, the interface was designed primarily for desktops.

As the app would focus on the online collection, there would be no problem on requiring it to be implemented multi-platform.

If any platform-specific feature would be considered, it would be available as an option. Ideally as a "plugin".

### Mockups
As a first draft of the interface, using [Pencil](https://pencil.evolus.vn/), the three main screens were designed.

#### Overview
![overview mockup screen](https://user-images.githubusercontent.com/1174345/61177213-8e8e1400-a5cf-11e9-9ac6-2db8f4dcfea9.png)

#### Library
![library mockup screen](https://user-images.githubusercontent.com/1174345/61177230-e6c51600-a5cf-11e9-86e8-73d1655fe3c3.png)

#### Settings
![settings mockup screen](https://user-images.githubusercontent.com/1174345/61177239-30156580-a5d0-11e9-9ce6-9ee5cc0082ce.png)

### Main icon
As the icon would be presented in many different sizes, a "public domain" (WTFPL) SVG icon was chosen, simple but clear. Later its color were changed.
[Original link](https://www.iconfinder.com/icons/2639820/controller_game_icon#size=128)

![modified main icon](https://user-images.githubusercontent.com/1174345/61177341-47a21d80-a5d3-11e9-9b30-f1243b165ce1.png)

## Experiments
As of this point, the screen was mocked, an icon was chosen, and the requirements were loading from the web and being multi-platform. But what to use?

### Angular
As today nothing is more reliable to continue to be supported than HTML, the easiest way to start, even if just to prototype, is a web page. To not start from zero, at the time, the Angular community was growing and the framework looked solid.

The simplicity intended and issues with performance, inspired me to look for alternatives.

### QT
Brought the performance I expected and presented nicely for the desktop look and feel.

Unfortunately the time cost of implementation, inspired me to look into its js-like variant, QML.

### QML
Easy to develop, easy componentize. Thread support unfortunately still on C++, but quite nice to work with.

But the hacks to overcome the configuration limitations of its graphical components started getting messy.

### Electron
It is quite funny how little multi-platform desktop technologies have evolved in the last decade.

But, as chromium is everywhere, it's also shippable as a desktop app, with a mix of browser and node.

### ReactJS
As this weird times we live in, that betting for web technologies works even for desktop development, the current state of frameworks and libraries where investigated again, and, to avoid the overhead, keep the simplicity and make use of the professional skills I already apply, ReactJS was chosen.

The debug tools offered by Redux made me chose it in the beginning.
But as Context API got more attention, its simplicity and lesser boilerplate code convinced me.

The same simplicity made me convert, gradually, to stateless components and hooks.

### ReactJS SPA + Node Backend => Standalone Electron app
Having the app as a SPA had the benefits of allowing me to test it against the newest chrome versions, giving a better performance and better debug tools.

But file access, for downloading a large number of files, would not be available within the browser.
Plus having to work around Cross Origin Request issues made a clear case for a separation of a "frontend" and a "backend".

Which, when bundle into the electron package, would start a window as a browser and run the backend scripts with its embedded node, not requiring the user to install anything special, just running the standalone app.

### Types over tests
For this project, only the chromium run-time mattered and the components were redone as many times as necessary until the performance expected was met. For that reason, instead of investing on traditional automated tests, it was chosen to have a strict set of typescript rules to avoid writing code prone to errors instead of trying to catch them.

# The App
The app, while not complete, does some in regards to communicate with the main store today, Steam.

And its edit settings, workarounded by exporting and importing CSVs.

## Screens
### Overview
This screen presents, in a grid, all the games in the database, with the overview image, if available, or the game title. 

On the left top of the screen you can select one of the properties and if is sorted asc or desc.

The tile size is resizable and they respond to window width, avoiding wasting space.

The image bellow has it's tiles here pixelated to avoid copyright issues, as the game tiles images presented are not part of the software, hence not covered by its MIT license.

![overview screen on linux](https://user-images.githubusercontent.com/1174345/72255467-18627c80-3607-11ea-8070-9dbe73c37ec8.jpg)

### Library
This screen presents in a table all the values of the enabled properties.

The properties presented can be enabled/disabled by clicking on the settings menu on the right top of the screen.

Clicking on the column header, the table is sorted by that property.
If it is already sorted asc by the property, it will sort desc. Otherwise it'll sort asc.

For big texts, links or images, a simple modal is displayed.

In this screen, you can trigger the plugin-driven data enhancing per game or for all.

![library screen on mac](https://user-images.githubusercontent.com/1174345/61177378-51785080-a5d4-11e9-9687-665c318c8972.png)

### Settings
In this screen, you can import/export data as CSV files, enable/disable plugins and configure them.

![settings screen on windows](https://user-images.githubusercontent.com/1174345/61177145-63ef8b80-a5ce-11e9-9d1d-0f1d600c2643.png)

## Persistence
The user's data is saved in the IndexedDB, which its storing made use [Dexie](https://dexie.org/) for its convenience alone.

`usePersistedState` was created as `useState` hook, which automatically retrieves and stores the state.

## Plugin design
As by design, this app had an open-ended feature list, having it all inside the main app would eventually get messy, and for most users, not necessary to be loaded.

As the plugins should interact with the interface, to change it, and to use the benefits of ReactJS, from the plugins, it could be given Components to be rendered.

The plugins would also be triggerable in the backend, to execute heavier tasks of manage files.

## Webworkers
Some heavy tasks to manipulate data, like converting from and to CSVs to internal IndexedDB, where given to webworkers.

Standardized communication:
```typescript
[operation: string, params: any[]] => [status: "SUCCESS" | "ERROR", payload: any]
```

"Abortable promises" for an easy async/await AND connections control.

# The Next Steps
Currently, the future of this project depends on the success of projects like GoG Galaxy 2.0.

In the case of lack of:
- Support for smaller stores like Humble Bundle, Origin, Twitch;
- Support for Linux;
- Modability; Or
- Uninteresting UI.

## Dynamic Backend Ports
On app start, to avoid issues with the frontend-backend communication, the server ports should be chosen from available ones. As it now conflict with other app instances and may conflict with other apps.

## Game Details
In the mockups you can the block that should open below one, for overview screen, or more, for library screen. This component is yet implemented, and should be highly extendable with plugins.

## Gamepad Support
It was implemented in older iterations, but removed due to component restructuring, and should be easily ported to this new version.

## Library Columns Resizing
As of now, all the columns share equally the screen width, but were design to be more flexible than this, and with a little work, it would be manually resizable.

## Internationalization
Currently only British English is supported.

## Date Formatting
Unfortunately, due to awful performance from `toLocaleDateString`, a temporary Date to String formatter is used, but it should be configurable.

## More Plugins
It is designed to be extendable, and more stores and or optional features would be supported.

# The Other Repos
- [Backend (node)](https://github.com/andrehtissot/electron-game-collection-server)
