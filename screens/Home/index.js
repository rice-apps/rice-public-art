import { createStackNavigator } from 'react-navigation-stack'
import ListScreen from './List.js';
import DetailsScreen from './Details.js';

export default createStackNavigator({
    List: {
        screen: ListScreen,
    },    
    Details: {
        screen: DetailsScreen,
    }
});