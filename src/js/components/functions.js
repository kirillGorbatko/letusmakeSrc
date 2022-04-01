let bodyLockStatus = true;

export const bodyLock = (delay = 500) => {
	let body = document.querySelector('body');
	if (bodyLockStatus) {
		let $lockPadding = document.querySelectorAll('.lockPadding');
		$lockPadding.forEach(el => {
			const element = el;
			element.style.paddingRight = `${window.innerWidth - document.querySelector('.wrapper').offsetWidth}px`;
		});

		body.style.paddingRight = `${window.innerWidth - document.querySelector('.wrapper').offsetWidth}px`;
		document.documentElement.classList.add('pageLock');

		bodyLockStatus = false;
		setTimeout(() => {
			bodyLockStatus = true;
		}, delay);
	}
};

export const bodyUnlock = (delay = 500) => {
	let body = document.querySelector('body');
	if (bodyLockStatus) {
		let $lockPadding = document.querySelectorAll('.lockPadding');
		setTimeout(() => {
			$lockPadding.forEach(el => {
				const element = el;
				element.style.paddingRight = '0px';
			});
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove('pageLock');
		}, delay);
		bodyLockStatus = false;
		setTimeout(() => {
			bodyLockStatus = true;
		}, delay);
	}
};

export const bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('pageLock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
};

export function menuInit() {
	let iconMenu = document.querySelector('.iconMenu');
	if (iconMenu) {
		iconMenu.addEventListener('click', (e) => {
			if (bodyLockStatus) {
				bodyLockToggle();
				document.documentElement.classList.toggle('menuOpen');
			}
		});
	}
}

export function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove('menuOpen');
}

export function uniqArray(array) {
	return array.filter((item, index, self) => {
		return self.indexOf(item) === index;
	});
}
