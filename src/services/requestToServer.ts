import MakeHttpRequest from '../utils/request';
import {get} from 'config';

let urlServer:string = get('dataForRequest.baseUrl');
let portServer:string|number= get('dataForRequest.port');
let pathCliente:string = get('dataForRequest.pathCliente')
let GET:string = 'GET';
let POST:string = 'POST';
let PUT:string = 'PUT';


const request = new MakeHttpRequest(urlServer,portServer);
export async function makeGet(){
    let response;
    try {
        response = await request.make(GET,{},pathCliente);
        return response;
    } catch (error) {
        console.error(error);
        return new Error('error in http request get')
    }
}
export async function makePost(data: {}){
    let response;
    try {
        response = await request.make(POST,data,pathCliente);
        return response;
    } catch (error) {
        console.error(error);
        return new Error('error in http request post')
    }
}

export async function makePut(data: {}, numCliente:number){
    let response;
    try {
        response = await request.make(PUT,data,`${pathCliente}/${numCliente}`);
        return response;
    } catch (error) {
        console.error(error);
        return new Error('error in http request put')
    }
}