import { Observable } from 'rxjs/Observable';

export function createMockReduxStore(opts: any) {

    return {
        dispatch(action: any) {},
        configureStore () {},
        select() {
            return Observable.of(opts.storeData);
        }
    };
}
