// ------------------- imports
import { documentReady, pageLoad } from 'utils';
// ------------------- imports###
import * as scroll from 'components/scroll';

// ------------------  import components
import { menuInit } from 'components/functions';
import { parallaxInit } from 'components/parallax';

// ------------------  import components###

// -------------------  global variables

const readyFunc = () => {
	menuInit();
	parallaxInit();
};

const loadFunc = () => {
	console.log('page load');
};

documentReady(() => {
	readyFunc();
});

pageLoad(() => {
	loadFunc();
});
