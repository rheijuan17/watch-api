import { Injectable } from '@nestjs/common';
import { Watch } from 'src/models/watch.model';
const { v4: uuid } = require('uuid');

@Injectable()
export class WatchService {
    private watches = [
        {
            id: 1,
            name: 'WATCH 1',
            brand: 'GARMIN',
            referenceNumber: '37cc9dce-f384-4491-961f-04bf64ec7bea'
        },
        {
            id: 2,
            name: 'WATCH 2',
            brand: 'GARMIN',
            referenceNumber: '808528b1-8943-420c-bb2b-2d6c7c76311f'
        },
        {
            id: 3,
            name: 'WATCH 3',
            brand: 'NIKE',
            referenceNumber: 'aee72166-7b30-421a-aafd-8712794c2d12'
        },
        {
            id: 4,
            name: 'WATCH 4',
            brand: 'ADIDAS',
            referenceNumber: 'c31273e0-8636-48e1-a229-91275808fd57'
        }
    ]

    getAll(brand?: string) {
        if (brand) {
            return this.watches.filter(watch => watch.brand === brand);
        }

        return this.watches;
    }

    get(id: string) {
        const watch = this.watches.find(watch => watch.referenceNumber === id);

        return watch;
    }

    create(watch: Watch) {
        const id = uuid();
        const { name, brand } = watch

        return { id, name, brand };
    }

    update(watchUpdate: { name: string, brand: string }) {
        return { name: watchUpdate.name, brand: watchUpdate.brand };
    }
}
