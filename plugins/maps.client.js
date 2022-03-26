export default function (context, inject) {
  console.log("maps.client started...........");

  let isMapLoaded = false;
  let waiting = [];

  addScript();
  inject("maps", { showMap, makeAutoComplete });

  function initGoogleMap() {
    waiting.forEach((item) => {
      isMapLoaded = true;
      if (typeof item.fn === "function") {
        item.fn(...item.arguments);
      }
    });

    waiting = [];
  }

  function addScript() {
    const script = document.createElement("script");
    // script.src ="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU&libraries=places&callback=initGoogleMap";
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDkDD_tREr9fuTi7dGQharS79THbjMBDiU&libraries=places&callback=initGoogleMap";
    script.async = true;
    // script.skip = process.client && isMapLoaded;
    window.initGoogleMap = initGoogleMap;
    document.head.appendChild(script);
  }

  function makeAutoComplete(input) {
    if (!isMapLoaded) {
      waiting.push({
        fn: makeAutoComplete,
        arguments,
      });
      return;
    }

    // const center = { lat: 50.064192, lng: -130.605469 };
    // Create a bounding box with sides ~10km away from the center point
    //         const defaultBounds = {
    //             north: center.lat + 0.1,
    //             south: center.lat - 0.1,
    //             east: center.lng + 0.1,
    //             west: center.lng - 0.1,
    //         };
    // const options = {
    //     bounds: defaultBounds,
    //     componentRestrictions: { country: "us" },
    //     fields: ["address_components", "geometry", "icon", "name"],
    //     strictBounds: false,
    //     types: ["establishment"],
    // };
    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      types: ["(cities)"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      input.dispatchEvent(new CustomEvent("changedd", { detail: place }));
    });
  }

  function showMap(canvas, lat, lng, markers) {
    if (!isMapLoaded) {
      waiting.push({
        fn: showMap,
        arguments,
      });
      return;
    }
    const center = new window.google.maps.LatLng(lat, lng);

    const map = new google.maps.Map(canvas, {
      center: center,
      zoom: 18,
      disableDefaultUI:true,
      zoomControl:true,
      styles:[{
        featureType:'poi.business',
        elementType:'labels.icon',
        stylers:[{visibility:'off'}]
      }]
    });

    // The marker, positioned at Uluru
    if (!markers) {
      const position = new window.google.maps.LatLng(lat, lng);

      const marker = new google.maps.Marker({
        position: position,
        clickable:false,
        map: map,
      });
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((home) => {
      const position = new window.google.maps.LatLng(home.lat, home.lng);
      const marker = new google.maps.Marker({
        position: position,
        label: { text: `$${home.pricePerNight}`, className: `marker home-${home.id}` },
        icon: "https://maps.gstatic.com/mapfiles/transparent.png",
        clickable:false,
        map: map,
      });
      bounds.extend(position);
    });

    map.fitBounds(bounds);
  }
}
