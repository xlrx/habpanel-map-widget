(function() {
    'use strict';

    angular
        .module('app.widgets.map', ['app.services', 'ui-leaflet'])
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$timeout', 'leafletData', 'OHService'];
    function MapController($scope, $timeout, leafletData, OHService) {
        var vm = this;
        var itemStates = {};
        var accuracyStates = {};
        var ready = false;

        vm.center = {};

        vm.markers = {};
        vm.paths = {};

        activate();

        ////////////////

        function onResized() {
            leafletData.getMap().then(function(map) {
                $timeout(function() {
                    map.invalidateSize();
                }, 300);
            });
        }

        function updateValues() {
            leafletData.getMap().then(function(map) {
                $timeout(function () {
                    for (var i = 1; i <= 8; i++) {
                        if ($scope.config['item' + i]) {
                            var item = OHService.getItem($scope.config['item' + i]);
                            var pref = $scope.config['item' + i].split('_')
                            var prefix = pref[0] + "_" + pref[1] + "_" + pref[2] + "_" + pref[3] + "_" + pref[4]
                            var name = $scope.config['name' + i]
                            
                            //var accuracyItem = ($scope.config['showaccuracy' + i]) ? OHService.getItem($scope.config['accuracyitem' + i]) : null;

                            if (item && item.state.indexOf(',') && $scope.config['enabled' + i] === true &&
                                //(item.state !== itemStates[item.name] || (accuracyItem && accuracyItem.state !== accuracyStates[accuracyItem.name]))) {
                                item.state !== itemStates[item.name]) {
                                itemStates[item.name] = item.state;

                                if (!ready) {
                                    map.invalidateSize();
                                    ready = true;
                                }

                                var icon = {
                                    type: 'vectorMarker',
                                    prefix: 'glyphicon',
                                    icon: 'glyphicon-signal'
                                };

                                var SItem = OHService.getItem(prefix + "_S");

                                //console.log("HUHU" + SItem.state );
                                if(SItem.state === '0.0') {
                                    icon.markerColor = '#008000';
                                } else if(SItem.state === '1.0') {
                                    icon.markerColor = '#b0e2ff';
                                } else if(SItem.state == '2.0') {
                                    icon.markerColor = '#1ba1e2';
                                } else if(SItem.state == '3.0') {
                                    icon.markerColor = '#f67731';
                                } else if(SItem.state == '4.0') {
                                    icon.markerColor = '#ff7373';
                                } else if(SItem.state == '5.0') {
                                    icon.markerColor = '#ff4162';
                                } 
                                //if ($scope.config['color' + i]) {
                                //    icon.markerColor = $scope.config['color' + i];
                                //}
                                if ($scope.config['icon' + i]) {
                                    icon.icon = $scope.config['icon' + i];
                                };

                                var lat = parseFloat(item.state.split(',')[0]);
                                var lng =  parseFloat(item.state.split(',')[1]);

                                if (isNaN(lat) || isNaN(lng)) {
                                    continue;
                                }
                                
                                var precipItem = OHService.getItem(prefix + "_W");
                                var TTTItem = OHService.getItem(prefix + "_TTT");
                                var TTTbItem = OHService.getItem(prefix + "_TTTb");
                                var TTTuItem = OHService.getItem(prefix + "_TTTu");
                                var FItem = OHService.getItem(prefix + "_F");

                                vm.markers[item.name] = {
                                    lat: parseFloat(item.state.split(',')[0]),
                                    lng: parseFloat(item.state.split(',')[1]),
                                    //message: item.label,
                                    message: "<h2 style='color:#000'>" + name + "</h2>Zustand: " + SItem.transformedState + 
                                    "<br/>Niederschlagsart: " + precipItem.transformedState + 
                                    "<br/>Lufttemperatur: " + TTTItem.state + 
                                    "<br/>Belagstemperatur: " + TTTbItem.state + 
                                    "<br/>Untergrundtemperatur: " + TTTuItem.state + 
                                    "<br/>Funktionszustand: " + FItem.transformedState,
                                    icon: icon
                                };

                                /*if (accuracyItem && accuracyItem.type === 'Number' && parseFloat(accuracyItem.state) > 0) {
                                    vm.paths[item.name] = {
                                        type: 'circle',
                                        radius: parseFloat(accuracyItem.state),
                                        latlngs: vm.markers[item.name],
                                        color: icon.markerColor,
                                        weight: 2
                                    };
                                    accuracyStates[accuracyItem.name] = accuracyItem.state;
                                }*/

                            }
                        }

                        var markersArray = [];
                        angular.forEach(vm.markers, function (marker) {
                            markersArray.push(marker);
                        });
                        map.fitBounds(markersArray, { maxZoom: $scope.config.zoom || null });
            }
                });
            });
        }

        function activate() {
            if ($scope.config.center_lat && $scope.config.center_lng && $scope.config.zoom) {
                vm.center.lat = parseFloat($scope.config.center_lat);
                vm.center.lng = parseFloat($scope.config.center_lng);
                vm.center.zoom = parseFloat($scope.config.zoom);
            }

            var resizedHandler = $scope.$on('gridster-resized', onResized);
            $scope.$on('$destroy', resizedHandler);
            OHService.onUpdate($scope, null, updateValues);

            onResized();
        }
    }
})();
