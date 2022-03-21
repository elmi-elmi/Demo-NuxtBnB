export default function (context, inject) {
    console.log("maps.client started...........");

    let isMapLoaded = false;
    let mapWaiting = [];

    addScript();
    inject("maps", {showMap});

    function initGoogleMap() {
        // isMapLoaded = true;
        // if (mapWaiting) {
        //     const {canvas, lat, lng} = mapWaiting;
        //     renderMap(canvas, lat, lng);
        //     mapWaiting = null;
        // }
        mapWaiting.forEach(item=>{
            isMapLoaded = true;
            if(typeof item.fn === 'function') {
                item.fn(...item.arguments)
            }
        })
    }

    function addScript() {
        const script = document.createElement("script");
        script.src =
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU&callback=initGoogleMap";
        script.async = true;
        // script.skip = process.client && isMapLoaded;
        window.initGoogleMap = initGoogleMap;
        document.head.appendChild(script);
    }

    function showMap(canvas, lat, lng) {
        // if (isMapLoaded) renderMap(canvas, lat, lng);
        // else mapWaiting = {canvas, lat, lng};
        if(!isMapLoaded){
            mapWaiting.push({
                fn:showMap,
                arguments
            })
            return
        }
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

    // function renderMap(canvas, lat, lng) {
    //     const uluru = {lat, lng};
    //     const map = new google.maps.Map(canvas, {
    //         center: uluru,
    //         zoom: 8,
    //     });
    //
    //     // The marker, positioned at Uluru
    //     const marker = new google.maps.Marker({
    //         position: uluru,
    //         map: map,
    //     });
    // }
}
