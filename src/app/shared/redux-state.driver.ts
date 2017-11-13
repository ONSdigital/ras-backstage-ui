import * as Immutable from 'immutable';

/**
 * Redux state driver
 */
export class State {

    private static stateTypePropertyMap: any = {

        /**
         * Required properties
         */
        '_containerType': {
            create: State.createContainer
        }
    };

    private static stateTypeMap: any = {

        'collection': {
            create: State.createCollection
        },
        'dictionary': {
            create: State.createDictionary
        }
    };

    public static create(metadata: Object) {
        return State.traverseMetadata(metadata);
    }

    public static addType(_type: string, config: { create: Function }) {

        if (State.stateTypeMap[_type]) {
            throw Error('state type ' + _type + ' already exists');
        }

        State.stateTypeMap[_type] = config;
    }

    /**
     * Add new item or merge existing item into collection
     * Example collection instance
     * const collection = {
     *   isFetching: false,
     *   items: List([])
     * }
     */
    public static updateCollection(collection: Immutable.Map<string, any>, uniqueKey: string, item: any) {

        /**
         * Validate is collection (isFetching and items properties exist)
         */

        const items = collection.get('items');

        return collection.set('items', items.withMutations((list: any) => {

            const existingItem = items.findEntry((currentItem: any) => currentItem[uniqueKey] === item[uniqueKey]);

            existingItem ?
                list.set(existingItem[0], Object.assign({}, existingItem[1], item)) :
                list.push(item);
        }));
    };

    public static updateDictionary(dictionary: Immutable.Map<string, any>, uniqueKey: string, val: any) {
        return dictionary.set(uniqueKey, val);
    }

    private static traverseMetadata(metadata: Object) {

        const isValid: Boolean = State.validateProperties(metadata);

        if (!isValid) {
            return;
        }

        const transformedProps: Object = {};

        Object.keys(metadata)
            /**
             * Filter out private properties
             */
            .filter((prop: string) => !/^_/.test(prop))
            .forEach((prop: string) => {
                const propVal = metadata[prop];
                const stateType = State.stateTypeMap[propVal];

                if (typeof propVal !== 'object' && !stateType) {
                    return;
                }

                if (typeof propVal === 'object') {
                    transformedProps[prop] = State.traverseMetadata(propVal);
                } else {

                    /**
                     * If value is a state type
                     */
                    if (stateType) {
                        transformedProps[prop] = stateType.create();
                    } else {
                        transformedProps[prop] = propVal;
                    }
                }
            });

        return metadata['_containerType'] ?
            State.createContainer(metadata['_containerType'], transformedProps) :
            transformedProps;
    }

    private static createContainer(_type: string, props: Object) {

        const containerType = State.stateTypeMap[_type];

        if (!containerType) {
            return;
        }

        return containerType.create(props);
    }

    private static createCollection(props: Object) {
        return State.createDictionary(Object.assign({
            isFetching: false,
            items: State.createList()
        }, props));
    }

    private static createDictionary(props: Object) {
        return Immutable.Map(Object.assign({}, props));
    }

    private static createList(items: Array<any> = []) {
        return Immutable.List(items);
    }

    private static validateProperties(props: Object) {

        let isValid: Boolean = true;

        /**
         * Validate required properties
         */
        Object.keys(this.stateTypePropertyMap).forEach((stateTypeProperty: string) => {
            const stateTypePropertyVal = this.stateTypePropertyMap[stateTypeProperty];

            if (stateTypePropertyVal.required && !props[stateTypeProperty]) {
                isValid = false;
                throw Error('Required metadata property ' + stateTypeProperty + ' missing');
            }
        });

        return isValid;
    }
}

State.addType('stateMessage', {
    create(): StateMessageSchema {
        return null;
    }
});

export interface StateMessageSchema {
    notification: string;
    action: {
        label: string;
        link: string;
    };
}

export interface StateCollection<T> {
    isFetching: Boolean;
    items: Immutable.List<Array<T>>;
}
