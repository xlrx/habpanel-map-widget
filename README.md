# DWD Strassenwetterdienst Widget for HABPanel

This widget is forked from *ghys/habpanel-map-widget* (credits to Yannick Schaus) and will display a map from OpenStreetMap with up to 8 configurable DWD SWS road sensors positioned using openHAB Location items.

The markers will update in real time whenever the state of the underlying item changes. Clicking on a marker will reveal the label of the item in a tooltip.

Important: make sure you use the items and rules (ensure the same naming convention style) from https://community.openhab.org/t/howto-road-reconnaissance-report-for-german-roads/81233

## Installation

Make sure the `git` command is available on your system, Clone this repository into your openHAB's `html` configuration folder:

    $ cd /etc/openhab/html
    $ git clone https://github.com/xlrx/habpanel-map-widget

(*the /etc/openhab/html is where the folder is on Linux package installations, change as necessary. See https://docs.openhab.org/installation/linux.html#file-locations*).

Alternatively you can download a ZIP file of the repository contents and extract it into the `habpanel-map-widget` subfolder. Cloning the repository is the preferred option though, because you'll be able to update the widget's supporting files by pulling the latest changes (with `git pull`).

Use the widget gallery in HABPanel to access this repository (you might be reading this in it right now!) and click the big green Import Widget button.

### Updating

If you used Git, go back to the `html/habpanel-map-widget` folder in your openHAB configuration where you cloned this repository, and pull the changes with Git:

    $ git pull

Or, re-download the ZIP and overwrite the contents.

Next, go to the HABPanel custom widget list, open the widget's tile context menu, choose "Update..." and confirm.

You might need to go over the widget's settings on your dashboards again, or remove them and re-add them.

## Configuration

The widget's configuration include a Center section, allowing to set the longitude, latitude and zoom level of the initial center of the map.

Use for instance https://www.openstreetmap.org/ to determine these parameters: search for a place, center and zoom the map as necessary, and check the URL in your browser's address bar, it will have this format:

https://www.openstreetmap.org/search?query=paris%2C%20france#map=12/48.8589/2.3469

Here you can see the zoom level is 12, the latitude is 48.8589, and the longitude is 2.3469.

The other sections are for the 8 possible markers, each with these options:

- **Enabled:** click to enable the marker
- **Name:** the display name of the marker
- **openHAB item:** choose an item holding the position of the marker - either a Location item or a String with the position in 'latitude,longitude' format
- **Marker icon:** choose a Glyphicon to display: examples include *user*, *tag*, *star*. See the full list of available icons at https://getbootstrap.com/docs/3.3/components/


## Acknowledgements

This widget includes the following libraries:

- https://github.com/leaflet/leaflet
- https://github.com/nmccready/angular-simple-logger
- https://github.com/angular-ui/ui-leaflet
- https://github.com/hiasinho/Leaflet.vector-markers
