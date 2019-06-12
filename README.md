# Yuzu Inspector

This extension lets you inspect and track changes of Yuzu Components in a webpage by adding a new panel the your browser's devtools.

![](images/devtools.png)

## Installation

This extension support:

- Chrome
- Firefox

(WIP)

## Usage

In order to use this extension you need to enable [yuzu's development tools](https://dwightjack.github.io/yuzu/#/packages/yuzu/?id=developer-tools) on the JavaScript main entrypoint of the page.

```js
import { Component, devtools } from 'yuzu';

devtools(Component); // enable development tools
```

**Note**: this extension will work in development mode only (`(process.env.NODE_ENV !== 'production'`).

When detected, a new panel called _Yuzu_ will be added to the browser's development tools window.

### Component Tree Panel

The panel on the left will let you navigate the component tree.

![Extension left panel](images/left-panel.png)

The currently selected component instance will be stored as the `$yuzu0` variable on the global object (`window`). To inspect its state in the devtools console run:

```js
$yuzu0.state;
```

### Component Inspection Panels

#### Element sub-panel

When you select a component on the left panel, its options and state will be shown in the _Element_ sub-panel on the right.

![Extension right panel](images/right-panel.png)

By clicking on the _eye_ icon that appears by hovering the left edge of a state's property, Yuzu Inspector will watch that properties changes and log them to the devtools console.

You can watch the entire state by selecting the _eye_ icon on the right of the panel's title (**Note**: If you watch the entire state, every other property state watcher will be removed).

#### Watchers sub-panel

The _Watchers_ sub-panel show a list of the state properties you are currently watching.

![Extension right panel](images/right-panel-watchers.png)

If the `Persist upon reloads` checkbox is checked the inspector will save the watcher and will re-apply it at page reload. This will let the inspector log properties changes occurring at initialization time.  
**Note**: this feature is experimental and subject to possible false positive results.

Property watchers are grouped by component instance.

By clicking on the `show` link the component will be shown and selected on the Component Tree Panel.

By clicking on the _eye_ icon on the left of a property name you can remove the watcher.

## Development

```
git clone https://github.com/dwightjack/yuzu-devtools
cd yuzu-devtools
yarn
yarn start
```

To generate an unpacked extension run `yarn dev`.

## Build from source

The following commands will generated a builded extension inside the `yuzu-devtools/dist` folder.

```
git clone https://github.com/dwightjack/yuzu-devtools
cd yuzu-devtools
yarn
yarn release
```
