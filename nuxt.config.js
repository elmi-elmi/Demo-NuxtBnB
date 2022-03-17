export default{
    components:true,

    head:{
        titleTemplate:"Mastering Nuxt %s",
        htmlAttrs:{
            lang:'en'
        },
        bodyAttrs:{
            class:"my-style"
        },
        meta:[{
            charset:"utf8"
        }]
    },

    // router:{
    //     prefetchLinks:false,
    // },

    // plugins:[{src:'~/plugins/maps.client',mode:'client'}]
    plugins:['~/plugins/maps.client', '~/plugins/dataApi']


}