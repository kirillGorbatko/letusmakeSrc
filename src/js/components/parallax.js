/* eslint-disable no-inner-declarations, no-undef */
export function parallaxInit() {
	const parallax = document.querySelector('.hero_section');

	if (parallax) {
		const sun = parallax.querySelector('.hero_section_sun__in');
		const cloud = parallax.querySelector('.hero_section_cloud__in');

		// Odds
		const forSun = 30;
		const forCloud = 7;

		// Animations speed
		const speed = 0.02;

		let positionX = 0;
		let positionY = 0;
		let coordXpercent = 0;
		let coordYpercent = 0;

		function setMouseParallaxStyle() {
			const distX = coordXpercent - positionX;
			const distY = coordYpercent - positionY;

			positionX += (distX * speed);
			positionY += (distY * speed);

			sun.style.cssText = `transform: translate(${positionX / forSun}%,${positionY / forSun}%)`;
			cloud.style.cssText = `transform: translate(${positionX / forCloud}%,${positionY / forCloud}%)`;

			requestAnimationFrame(setMouseParallaxStyle);
		}

		setMouseParallaxStyle();

		parallax.addEventListener('mousemove', (e) => {
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			const coordX = e.pageX - (parallaxWidth / 2);
			const coordY = e.pageY - (parallaxHeight / 2);

			coordXpercent = (coordX / parallaxWidth) * 100;
			coordYpercent = (coordY / parallaxHeight) * 100;
		});

		let thresHoldSets = [];
		for (let i = 0; i <= 1.0; i += 0.005) {
			thresHoldSets.push(i);
		}

		function setParallaxItemsStyle(scrollTopPercent) {
			sun.parentElement.style.cssText = `transform: translate(0%,-${scrollTopPercent / 12}%);`;
			cloud.parentElement.style.cssText = `transform: translate(0%,-${scrollTopPercent / 2}%);`;
		}

		const callback = (entries, observer) => {
			const scrollTopPercent = (window.pageYOffset / parallax.offsetHeight) * 100;
			setParallaxItemsStyle(scrollTopPercent);
		};

		const observer = new IntersectionObserver(callback, {
			threshold: thresHoldSets,
		});

		observer.observe(document.querySelector('.work_section'));
	}
}
