import React, { Fragment } from 'react';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../layout/MetaData';
import './Home.css';
import Product from './Product.js';

const product = {
	name: 'Blue T-shirt',
	images: [{ url: 'https://i.ibb.co/L9ZNsVF/S2.jpg' }],
	price: '$50',
	_id: 'shirt-01',
};

const Home = () => {
	return (
		<Fragment>
			<MetaData title='DREAM SHOP' />
			<div className='banner'>
				<p>Welcome to Dream Shop</p>
				<h1>FIND AMAZING PRODUCTS BELOW</h1>

				<a href='#container'>
					<button>
						Scroll <CgMouse />
					</button>
				</a>
			</div>

			<h2 className='homeHeading'>Featured Products</h2>
			<div className='container' id='container'>
				<Product product={product} />
				<Product product={product} />
				<Product product={product} />
				<Product product={product} />
				<Product product={product} />
				<Product product={product} />
				<Product product={product} />
				<Product product={product} />
			</div>
		</Fragment>
	);
};

export default Home;
