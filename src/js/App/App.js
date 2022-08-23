import { CONTENT, ERRORSAVE, SHOWRESULT, BTNGENERATE, BTNSAVE, FIRST, SECONDFROM, SECONDTO, SETTINGS, OPENSETTINGS, CLOSESETTINGS, SHADOWBEHINDSETTINGS } from '../utils/root';

let multiply, digit, result;

class App {

    renderContent() {
        let htmlContent = '';

        htmlContent = `
		  <div class="content-website__container _container">
				<div class="website__digits" id="digits"></div>

				<div class="website__btns">
					<button class="btn website__btn btn--border">Generate</button>
					<button class="btn website__btn-result btn--green">Show result</button>
				</div
			</div>
		`;

        CONTENT.innerHTML = htmlContent;
    }

    renderErrorSave() {
        let htmlContent = '';

        htmlContent = `
			<div class="error-save">
				<p>❕ Please fill in the input fields</p>
			</div>
			`;

        ERRORSAVE.innerHTML = htmlContent;

        setTimeout(() => ERRORSAVE.innerHTML = '', 3000);
    }

    renderDigit() {

        const calcDigit = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const DIGIT = document.querySelector('#digits');

        if (FIRST.value == 2) {
            digit = calcDigit(10, 99);
        } else if (FIRST.value == 3) {
            digit = calcDigit(100, 999);
        } else if (FIRST.value == 4) {
            digit = calcDigit(1000, 9999);
        } else if (FIRST.value == '2-3') {
            digit = calcDigit(10, 999);
        } else if (FIRST.value == '2-4') {
            digit = calcDigit(10, 9999);
        } else if (FIRST.value == '3-4') {
            digit = calcDigit(100, 9999);
        }

        multiply = calcDigit(SECONDFROM.value, SECONDTO.value);

        let htmlContent = '';

        htmlContent = `
			<span>${digit}</span>
			<span>${multiply}</span>
			`;

        DIGIT.innerHTML = htmlContent;
    }

    renderResult() {
        result = digit * multiply;

        if (isNaN(result)) {
            result = 'Please click on the "Generate" button';
        };

        let htmlContent = '';

        htmlContent = `
		  	<div class="result">
		  		<p>${result}</p>
	  		</div>
			`;

        SHOWRESULT.innerHTML = htmlContent;

        setTimeout(() => SHOWRESULT.innerHTML = '', 3000);
    }

    eventListener() {
        BTNSAVE.addEventListener('click', () => {
            if (SECONDFROM.value !== '' && SECONDTO.value !== '') {
                this.renderContent();
            } else {
                this.renderErrorSave();
            }
        });

        document.body.addEventListener('click', () => {
            if (event.target.closest('.website__btn')) {
                this.renderDigit();
            } else if (event.target.closest('.website__btn-result')) {
                this.renderResult();
            }
        })

        OPENSETTINGS.addEventListener('click', () => {
            SETTINGS.classList.add('active');
            CLOSESETTINGS.classList.add('active');
            SHADOWBEHINDSETTINGS.classList.add('active');
        })

        CLOSESETTINGS.addEventListener('click', () => {
            SETTINGS.classList.remove('active');
            CLOSESETTINGS.classList.remove('active');
            SHADOWBEHINDSETTINGS.classList.remove('active');
        })
    }

};

export default new App();