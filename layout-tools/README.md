# Layout Tools (v. 4)

> Layout Tools has been moved to [@massimo-cassandro/m-utilities](https://github.com/massimo-cassandro/m-utilities). This repository will no longer be updated.

Layout development utility.

Demo: <https://massimo-cassandro.github.io/layout-tools/test/>

## Installation

Install Layout Tools using npm:

```shell
npm i --save-dev @massimo-cassandro/layout-tools
```

Then add it to the page to be monitored:

```html
<script src="[path_to_layout_tools]/layout_tools-min.js" data-fw="__framework__"></script>
```
where `__framework__` corresponds to the used css framework.
Choose between **bootstrap3**, **bootstrap4** or **foundation6**. 

Default is `bootstrap4`. 

The scripts loads the `layout_tools.css` file searching for it in same folder of the js one. If necessary, you can set an alternative css path thru the `data-css` attribute:

```html
<script src="[path_to_layout_tools]/layout_tools-min.js" data-css="path/layout_tools.css"></script>
```

## The tools

The script reports the active CSS breakpoint at the top left of the page. Clicking on it will display:

* a button to hide the layout tools (it remains translucent on mouseover). To show it again you need to click the button again. If present, the Symfony debug bar is also hidden. You can add more toolbars to be removed by editing the `other_toolbars_selectors` constant in the` _ui.js` module
* a button to completely remove layout tools and other toolbars. This is useful when you need to completely delete all toolbars for demonstration and documentation purposes. When the page reloads, all tools will be visible again
* the size of the window
* userAgent, pixel density and screen size
* a checkbox to show informations about all the images that are loaded with the page.
* Some settings are saved in the browser session storage, so that, when the page is reloaded, their status is restored.
