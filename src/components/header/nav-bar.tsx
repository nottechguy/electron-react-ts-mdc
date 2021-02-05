import React, { Component } from 'react';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';

class NavBar extends Component {
    menuIconRef: React.RefObject<HTMLButtonElement>;

    constructor(props: object) {
        super(props);

        this.menuIconRef = React.createRef();
    }

    componentDidMount() {
        const iconButtonRipple = new MDCRipple(this.menuIconRef.current!);
        iconButtonRipple.unbounded = true;
    }

    componentDidUpdate() {}

    render() {
        return (
            <header className="mdc-top-app-bar">
                <div className="mdc-top-app-bar__row">
                    <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        <button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu" ref={this.menuIconRef}>menu</button>
                        <span className="mdc-top-app-bar__title">Page title example</span>
                    </section>
                    <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                        <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Favorite">favorite</button>
                        <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Search">search</button>
                        <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Options">more_vert</button>
                    </section>
                </div>
            </header>
        );
    }
}

export default NavBar;