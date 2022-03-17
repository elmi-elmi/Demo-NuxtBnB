export default function (context, inject) {
    console.log('dataApi started...........')
    inject('dataApi', {getHome, getReviewByHomeId});

    const appId = "JXK9WC90S0";
    const apiKey = "010bc370d2dcd9c251e72617c59455ee";

    const headers = {
        "X-Algolia-API-Key": apiKey,
        "X-Algolia-Application-Id": appId
    }


    async function getHome(homeId) {
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {method:'GET',headers}))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getReviewByHomeId(homeId) {
        try {
            console.log('getReview')
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
           return getErrorResponse(err)
        }
    }

    // async function unWrap(response) {
    //     console.log('unwrap.....')
    //     console.log(response)
    //     const json = await response.json();
    //     const {ok, status, statusText} = response;
    //     console.log(ok,status)
    //     return {
    //         json,
    //         ok,
    //         status,
    //         statusText
    //     }
    // }
    async function unWrap(response) {
        try{console.log('unWrap.......')
            console.log(response.ok)
            console.log(response.status)
            console.log(response.statusText)
            const json = await response.json()
            console.log('json')
            console.log(json)
            const {ok, status, statusText} = response
            return {
                json,
                ok,
                status,
                statusText,
            }}catch(err){
            console.log('here******')
            return getErrorResponse(err)

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