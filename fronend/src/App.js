import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WebFont from 'webfontloader';

import Header from './components/layout/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/layout/Footer/Footer';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.js';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ProtectedRoute from './components/Route/ProtectedRoute';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword.js';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

function App() {
	const { isAuthenticated, user } = useSelector((state) => state.user);

	const [stripeApiKey, setStripeApiKey] = useState('');

	async function getStripeApiKey() {
		const { data } = await axios.get('/api/v1/stripeapikey');

		setStripeApiKey(data.stripeApiKey);
	}

	useEffect(() => {
		WebFont.load({
			google: {
				families: ['Roboto', 'Droid Sans', 'Chilanka'],
			},
		});

		store.dispatch(loadUser());

		getStripeApiKey();
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
			<Route exact path='/password/forgot' component={ForgotPassword} />
			<Route exact path='/password/reset/:token' component={ResetPassword} />
			<Route exact path='/cart' component={Cart} />
			<ProtectedRoute exact path='/shipping' component={Shipping} />

			<ProtectedRoute exact path='/order/confirm' component={ConfirmOrder} />

			{stripeApiKey && (
				<Elements stripe={loadStripe(stripeApiKey)}>
					<ProtectedRoute exact path='/process/payment' component={Payment} />
				</Elements>
			)}
			<ProtectedRoute exact path='/success' component={OrderSuccess} />
			<Footer />
		</Router>
	);
}

export default App;
