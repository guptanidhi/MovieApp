import Base from './components/Base.js';
import HomePage from './components/HomePage.js';
import LoginPage from './containers/LoginPage.js';
import RegisterPage from './containers/RegisterPage.js';
import DashboardPage from './containers/DashboardPage.js';
import FavouritePage from './containers/FavouritePage.js';
import Auth from './modules/Auth';

const routes = {
	component: Base,
	childRoutes:[
		{
			path: "/",
			getComponent: (location, callback) => {
				if(Auth.isUserAuthenticated()){
					callback(null, DashboardPage);
				}else{
					callback(null, HomePage);
				}				
			}	
		},
		{
			path: "/login",
			component: LoginPage
		},
		{
			path: "/register",
			component: RegisterPage
		},
		{
			path: "/favourite",
			// component: FavouritePage
			getComponent: (location, callback) => {
				if(Auth.isUserAuthenticated()){
					callback(null, FavouritePage);
				}else{
					callback(null, HomePage);
				}				
			}
		},
		{
			path: "/logout",
			onEnter: (nextState, replace) => {
				Auth.deauthenticateUser();
				// Change the current URL to /
				replace("/");
			}
		}
	]
}

export default routes;