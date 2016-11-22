declare namespace angular.ui {

    interface IStateProvider {
        decorator(name: string, func: Function): any;
        state(name: string| IStateConfig, stateConfig?: IStateConfig): IStateProvider;
    }

    interface IStateConfig {
        template?: string | Function;

        templateUrl?: string | Function;

        templateProvider?: Function;

        controller?: string | Function;

        controllerProvider?: Function;

        controllerAs?: string;

        parent?: string | Object;

        resolve?: Object;

        url?: string;

        views?: Object;

        abstract?: boolean;

        onEnter?: Function;

        onExit?: Function;

        reloadOnSearch?: boolean;

        data?: Object;

        params?: Object;
    }

    interface IState {
        get(stateOrName?: string | Object, context?: string | Object): Object | Array<any>;
        go(to: string, params?: Object, options?: Object): any;
        href(stateOrName: string | Object, params?: Object, options?: Object): string;
        includes(stateOrName: string | Object, params?: Object, options?: Object): boolean;
        is(stateOrName: string | Object, params?: Object, options?: Object): boolean;
        reload(state?: string | Object): any;
        transitionTo(to: string, toParams?: Object, options?: Object): any;

        params: Object;
        current: Object;
        transition: Object;
    }
}