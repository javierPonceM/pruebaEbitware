const globalConfig = {
    dataForRequest: {
        baseUrl: process.env.urlForRequest || 'http://187.188.122.85',
        port: process.env.port || '8091',
        pathCliente: process.env.pathCliente || '/NutriNET/Cliente'
    },
    dbConection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'javier',
        password: process.env.DB_PASSW || 'uami2123008919',
        db: process.env.DB_DB || 'TEST',
        port: process.env.DB_PORT || 3306,
        connectionString: `mysql://${process.env.DB_USER || 'javier'}:${process.env.DB_PASSW || 'uami2123008919'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`
    }
}
export default globalConfig;