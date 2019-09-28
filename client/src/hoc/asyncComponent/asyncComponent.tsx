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
            const С = this.state.component;
            return С ? <C {...this.props}/> : null
        }
    }
};

export default asyncComponent;
