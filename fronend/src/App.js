import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WebFont from 'webfontloader';

import Header from './components/layout/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/layout/Footer/Footer';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js';
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.js';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ProtectedRoute from './components/Route/ProtectedRoute';

function App() {
	const { isAuthenticated, user } = useSelector((state) => state.user);
	useEffect(() => {
		WebFont.load({
			google: {
				families: ['Roboto', 'Droid Sans', 'Chilanka'],
			},
		});

		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<Header />
			{isAuthenticated && <UserOptions user={user} />}
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/product/:id' component={ProductDetails} />
				<Route exact path='/products' component={Products} />
				<Route exact path='/products/:keyword' component={Products} />
				<Route exact path='/search' component={Search} />
				<Route exact path='/login' component={LoginSignUp} />
				<ProtectedRoute exact path='/account' component={Profile} />
				<ProtectedRoute exact path='/me/update' component={UpdateProfile} />
				<ProtectedRoute
					exact
					path='/password/update'
					component={UpdatePassword}
				/>
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
