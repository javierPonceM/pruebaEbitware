import request from 'request';
export default class MakeHttpRequest {
    private baseUrl: string;
    private port: string | number | undefined;
    constructor(baseUrl: string, port?: string | number) {
        this.baseUrl = baseUrl;
        this.port = port;
    }
    make(metodo: string, data: {}, path: string) {
        let options = {
            baseUrl: this.port ? `${this.baseUrl}:${this.port}` : this.baseUrl,
            uri: path,
            method: metodo,
            json:true,
            body: data

        }
        console.log(options)
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) reject(error);
                resolve(body);
            });

        });

    }
}



