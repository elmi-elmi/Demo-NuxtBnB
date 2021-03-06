export default function (context, inject) {
  console.log("dataApi started...........");
  inject("dataApi", {
    getHome,
    getReviewByHomeId,
    getUserByHomeId,
    getHomeByLocation,
  });

  const appId = "JXK9WC90S0";
  const apiKey = "010bc370d2dcd9c251e72617c59455ee";

  const headers = {
    "X-Algolia-API-Key": apiKey,
    "X-Algolia-Application-Id": appId,
  };

  async function getHomeByLocation(lat, lng, aroundRadius = 1500) {
    try {
      console.log("getHomeByLocation");
      return unWrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            aroundLatLng: `${lat}, ${lng}`,
            aroundRadius: aroundRadius,
            hitsPerPage: 10,
            attributesToHighlight: [],
          }),
        })
      );
    } catch (err) {
      return getErrorResponse(err);
    }
  }

  async function getUserByHomeId(homeId) {
    try {
      return unWrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
          method: "POST",
          headers,
          body: JSON.stringify({ filters: `homeId:${homeId}` }),
        })
      );
    } catch (err) {
      return getErrorResponse(err);
    }
  }

  async function getHome(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
          { method: "GET", headers }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getReviewByHomeId(homeId) {
    try {
      console.log("getReview");
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/reviews/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              filters: `homeId:${homeId}`,
              hitsPerPage: 6,
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (err) {
      return getErrorResponse(err);
    }
  }

  async function unWrap(response) {
    try {
      console.log("unWrap.......");
      const json = await response.json();
      const { ok, status, statusText } = response;
      return {
        json,
        ok,
        status,
        statusText,
      };
    } catch (err) {
      return getErrorResponse(err);
    }
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500, //mean internal error
      statusText: error.message,
    };
  }
}
