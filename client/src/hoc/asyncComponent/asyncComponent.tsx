import React, {Component} from 'react';

const asyncComponent = (importComponent: any) => {
    return class extends Component {
        state = {
            component: null
        };

        componentDidMount(): void {
            importComponent()
                .then((cmp: any) => {
                    this.setState({component: cmp.default})
                })
        }

        render() {
            const C = this.state.component;
            // @ts-ignore
            return C ? <C {...this.props}/> : null
        }
    }
};

export default asyncComponent;
