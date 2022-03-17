export default function (context, inject) {
    console.log('dataApi started...........')
    inject('dataApi', {getHome, getReviewByHomeId});
    const appId = 'JXK9WC90S0';
    const apiKey = '010bc370d2dcd9c251e72617c59455ee';

    const headers = {
        "X-Algolia-API-Key": apiKey,
        "X-Algolia-Application-Id": appId
    }

    /*
        curl -X GET \
         -H "X-Algolia-API-Key: ${API_KEY}" \
         -H "X-Algolia-Application-Id: ${APPLICATION_ID}" \
        "https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/contacts/myID?attributes=email,name"
    */
    async function getHome(homeId) {
        try {
            console.log('try gethome')
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {headers}));
        } catch (err) {
            console.log('catch gethome');
            return getErrorResponse(err)
        }
    }

    async function getReviewByHomeId(homeId) {
        try {
            console.log('getReview')
            // return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/facets/${homeId}/query`, {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    hitsPerPage: 6,
                    attributesToHighlight: [],
                })
            }));

        } catch (err) {
            getErrorResponse(err)
        }
    }

    async function unWrap(response) {
        const json = await response.json();
        const {ok, status, statusText} = response;
        return {
            json,
            ok,
            status,
            statusText
        }
    }

    function getErrorResponse(error) {
        console.log('inner error')
        return {
            ok: false,
            status: 500, //mean internal error
            statusText: error.message
        }
    }

}