import { PhotoSet } from '../damage-evaluation/damage-evaluation.service';

export class Job {
    id: number;
    imagePairs: PhotoSet[];
    address: {
        addressLine1: string,
        addressLine2: string,
        city: string;
        state: string;
        postalCode: number;
    };
    topBid: {
        contractorId: number;
        amount: number;
    };
}
