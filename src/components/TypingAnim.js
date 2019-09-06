import Typed from 'typed.js';
import React from 'react';

export default class TypedReactDemo extends React.Component {
    componentDidMount() {
        const { strings } = this.props;
        const options = {
            strings: strings,
            typeSpeed: 20,
            backSpeed: 20,
            loop: true,
            loopCount: Infinity,
        };
        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        return (
            <div className="wrap">
                <div className="type-wrap">
                  <span
                      style={{ whiteSpace: 'pre' }}
                      ref={(el) => { this.el = el; }}
                  />
                </div>
            </div>
        );
    }
}
