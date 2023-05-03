document.addEventListener('DOMContentLoaded', () => {
	const body = document.querySelector('body')
	const stuckPopup = document.querySelector('.stuck')
	const stuckPopupCloses = document.querySelectorAll('.popup__close')
	const errorPopup = document.querySelector('.error-popup')
	const errorPopupClose = document.querySelector('.error-popup__close')
	const footer = document.querySelector('.footer')

	let counterVisiblePopup = 0

	let visiblePopup = function (element) {
		if (counterVisiblePopup === 0) {
			element.classList.add('popup-visible')
			body.classList.add('scroll-disabled')
			counterVisiblePopup++
		}
	}

	let visiblePopupOnTarget = function (target) {
		let targetPosition = {
				top: window.pageYOffset + target.getBoundingClientRect().top,
				bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
			},
			windowPosition = {
				top: window.pageYOffset,
				bottom: window.pageYOffset + document.documentElement.clientHeight,
			}

		if (targetPosition.top < windowPosition.bottom && counterVisiblePopup === 0) {
			counterVisiblePopup++
			stuckPopup.classList.add('popup-visible')
			body.classList.add('scroll-disabled')
		} else {
			return
		}
	}

	setTimeout(() => {
		visiblePopup(stuckPopup)
	}, 30000)

	window.addEventListener('scroll', () => {
		visiblePopupOnTarget(footer)
	})

	stuckPopupCloses.forEach((el) => {
		el.addEventListener('click', () => {
			stuckPopup.classList.remove('popup-visible')
			body.classList.remove('scroll-disabled')
		})
	})

	errorPopupClose.addEventListener('click', () => {
		errorPopup.classList.remove('popup-visible')
	})
})
