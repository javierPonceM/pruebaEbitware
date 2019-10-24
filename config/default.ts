const globalConfig = {
    dataForRequest:{
       baseUrl: process.env.urlForRequest || 'http://187.188.122.85',
       port: process.env.port || '8091',
       pathCliente:  process.env.pathCliente || '/NutriNET/Cliente'
    }
}
export default globalConfig;