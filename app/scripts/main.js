/*global moment*/
/*global google*/
/*global _*/

(function () {
    'use strict';

    var map,
        currentTimezone;

    function updateTime() {
        var time = moment();
        if (currentTimezone) {
            time.tz(currentTimezone);
        }
        $('#current-time').text(time.toString());
    }

    function initialize() {
        updateTime();
        setInterval(updateTime, 1000);
        var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoomControl: false,
            zoom: 2
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        $.getJSON('bower_components/moment-timezone/moment-timezone.json', function (json) {
            moment.tz.add(json);
            _.each(json.meta, function (data, olsonName) {
                var marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(data.lat, data.lon),
                    title: olsonName
                });
                google.maps.event.addListener(marker, 'click', function() {
                    var title = marker.getTitle();
                    currentTimezone = title;
                    updateTime();
                    $('#current-timezone').text(title);
                });
            });
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
}());