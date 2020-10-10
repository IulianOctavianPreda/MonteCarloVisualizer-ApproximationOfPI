import axios, { AxiosRequestConfig } from 'axios';

import { environment } from '../env.config';
import { Distribution } from './../models/distribution.model';

export class MonteCarloApi {
    public static config: AxiosRequestConfig = {
        headers: { 'Access-Control-Allow-Origin': '*' },
        baseURL: environment.baseUrl
    };
    public static getPositiveDistribution(numberOfPoints: number): Promise<Distribution> {
        return axios.get(`/positive/${numberOfPoints}`, this.config);
    }

    public static getWholeDistribution(numberOfPoints: number): Promise<Distribution> {
        return axios.get(`/whole/${numberOfPoints}`, this.config);
    }
}
