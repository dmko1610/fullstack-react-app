import React, {Component} from "react";
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button';
import {Ingredient} from "../../../containers/BurgerBuilder/BurgerBuilder";

interface Props {
    ingredients: Ingredient,
    price: number,
    purchaseCancelled: any,
    purchaseContinued: any
}

class OrderSummary extends Component<Props> {
    componentDidUpdate(): void {
        console.log('[OrderSummary] did update');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map((igKey: string) => {
                // @ts-ignore
                return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>
                    :{(this.props.ingredients as any)[igKey]}
                </li>;
            });
        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger"
                        clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success"
                        clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxiliary>
        );
    }
}

export default OrderSummary;
