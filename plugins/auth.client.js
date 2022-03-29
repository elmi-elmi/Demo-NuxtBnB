export default function({$config}){
    console.log('auth --------------')
    addScript();

    function addScript(){
        const script = document.createElement('script');
        script.src = "https://apis.google.com/js/platform.js?onload=initAuth" ;
        script.async = true;
        script.defer = true;
        window.initAuth = init;
        document.head.appendChild(script)
    }

    function init(){
            window.gapi.load('auth2', async function(){
                const auth2 = window.gapi.auth2.init({
                    client_id:$config.auth.clientId
                })
            })

            window.gapi.signin2.render('googleButton',{
                onsuccess:parseuser
            })
    }

    function parseuser(user){
        const profile = user.getBasicProfile()
        console.log('name: -->', profile.getName())
        console.log('image url: -->', profile.getImageUrl())
    }
}