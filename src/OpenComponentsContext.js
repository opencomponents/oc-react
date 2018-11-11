import React from 'react';

import { OCContext } from "./OCContext";

export class OpenComponentsContext extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: {}
        };
    }
    createContext() {
        const {clientOc, baseUrl, lang, prefetchedComponents = {}} = this.props;
        return {
            oc: clientOc,
            baseUrl,
            lang,
            getElements: (key) => this.state.elements[key],
            getHtml: (key) => prefetchedComponents[key],
            saveElements: (key, els) => this.setState((pState) => {
                return {...pState, elements: {...pState.elements, [key]: els}};
            }),
        };
    }
    
    render() {
        const { baseUrl } = this.props;
        return <OCContext.Provider value={this.createContext()}>
            {this.props.children}
        </OCContext.Provider>;
    }
}