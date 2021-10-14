import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WebFont from 'webfontloader';

import Header from './components/layout/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/layout/Footer/Footer';
import ProductDetails from './components/Product/ProductDetails.js';
function App() {
	useEffect(() => {
		WebFont.load({
			google: {
				families: ['Roboto', 'Droid Sans', 'Chilanka'],
			},
		});
	}, []);

	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/product/:id' component={ProductDetails} />
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
