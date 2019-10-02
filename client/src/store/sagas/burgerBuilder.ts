import axios from "../../axios-orders";
import {fetchIngredientsFailed, setIngredients} from "../actions/burgerBuilder";

export function* initIngredientsSaga() {
    const response = yield axios.get('/ingredients.json');
        try {

        }
            dispatch(setIngredients(response.data))
        catch(error => {
            dispatch(fetchIngredientsFailed())
        });
}
