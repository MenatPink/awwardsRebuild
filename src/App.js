import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import gsap from 'gsap';
import './styles/App.scss';

//Components
import Header from './components/Header';
import Navigation from './components/Navigation';

//Pages
import Home from './pages/Home';
import CaseStudies from './pages/CaseStudies';
import Approach from './pages/Approach';
import Services from './pages/Services';
import About from './pages/About';

//Routes

const routes = [
	{
		path: '/',
		name: 'Home',
		Component: Home,
	},
	{
		path: '/case-studies',
		name: 'Case Studies',
		Component: CaseStudies,
	},
	{
		path: '/approach',
		name: 'Approach',
		Component: Approach,
	},
	{
		path: '/services',
		name: 'Services',
		Component: Services,
	},
	{
		path: '/about-us',
		name: 'About Us',
		Component: About,
	},
];

const debounce = (fn, ms) => {
	let timer;
	return () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = null;
			fn.apply()
		}, ms);
	};
};

const App = () => {
	//Preventing flash from happening
	gsap.to('body', 0, { css: { visibility: 'visible' } });
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});

	useEffect(() => {
		let vh = dimensions.height * 0.01;
		console.log(vh)
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		const debouncedHandleResize = debounce(
			function handleResize() {
				console.log(dimensions)
				setDimensions({
					height: window.innerHeight,
					width: window.innerWidth,
				});
		}, 1000);

		window.addEventListener('resize', debouncedHandleResize);

		return () => {
			window.removeEventListener('resize', debouncedHandleResize);
		};
	});

	return (
		<>
			<Header />
			{/* {console.log(dimensions)} */}
			<div className="App">
				{routes.map(({ path, Component }) => (
					<Route key={path} exact path={path}>
						<Component />
					</Route>
				))}
			</div>
			<Navigation />
		</>
	);
};

export default App;
