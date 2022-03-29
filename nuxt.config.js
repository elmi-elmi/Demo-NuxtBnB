export default {
  components: true,

  head: {
    titleTemplate: "Mastering Nuxt %s",
    htmlAttrs: {
      lang: "en",
    },
    bodyAttrs: {
      class: "my-style",
    },
    meta: [
      {
        charset: "utf8",
      },
    ],
  },

  // router:{
  //     prefetchLinks:false,
  // },

  // plugins:[{src:'~/plugins/maps.client',mode:'client'}]
  plugins: ["~/plugins/maps.client", "~/plugins/dataApi", "~/plugins/auth.client"],

  modules:[],
  buildModules:['@nuxtjs/tailwindcss'],
  css:['~/assets/sass/app.scss'],
  build:{
    extractCSS:true,
    loader:{limit:0}
  },

  publicRuntimeConfig:{
    auth:{
      cookieName:'idToken',
      clientId:'633319737589-l3oh0dvq3bo360a92u4h0tjp5d9g6633.apps.googleusercontent.com',
    }
  },

  privateRuntimeConfig:{
  }

};
