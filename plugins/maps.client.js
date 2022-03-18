export default function (context, inject) {
    console.log("maps.client started...........");

    let mapLoaded = false;
    let mapWaiting = null;

    addScript();
    inject("maps", {showMap});

    function initMap() {
        mapLoaded = true;
        if (mapWaiting) {
            const {canvas, lat, lng} = mapWaiting;
            renderMap(canvas, lat, lng);
            mapWaiting = null;
        }
    }

    function addScript() {
        const script = document.createElement("script");
        script.src =
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU&callback=initMap";
        script.async = true;
        // script.skip = process.client && mapLoaded;
        window.initMap = initMap;
        document.head.appendChild(script);
    }

    function showMap(canvas, lat, lng) {
        if (mapLoaded) renderMap(canvas, lat, lng);
        else mapWaiting = {canvas, lat, lng};
    }

    function renderMap(canvas, lat, lng) {
        const uluru = {lat, lng};
        const map = new google.maps.Map(canvas, {
            center: uluru,
            zoom: 8,
        });

        // The marker, positioned at Uluru
        const marker = new google.maps.Marker({
            position: uluru,
            map: map,
        });
    }
}
