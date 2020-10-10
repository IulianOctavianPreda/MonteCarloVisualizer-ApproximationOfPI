import { Distribution } from './../../models/distribution.model';

export interface ApiAction {
    name: string;
    action: (value: number) => Promise<Distribution>;
}
