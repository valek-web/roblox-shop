import IMask from 'imask'

// const apiUrl = 'https://localhost:3333'
const apiUrl = 'https://apirbx.com'

document.addEventListener('DOMContentLoaded', () => {
	const titleConversionSpent = document.querySelector('.feedback-conversion__title_spent')
	const titleConversionReceive = document.querySelector('.feedback-conversion__title_receive')
	const inputConversionSpent = document.querySelector('.form-data__spent')
	const inputConversionReceive = document.querySelector('.form-data__receive')
	const instructionsStepsButton = document.querySelector('.instruction-steps__button')

	let minSpent = +inputConversionSpent.dataset.min
	let minRecevie = +inputConversionReceive.dataset.min
	let maxSpent = +inputConversionSpent.dataset.max
	let maxRecevie = +inputConversionReceive.dataset.max
	const robuxCoeff = +inputConversionReceive.dataset.rate
	let price = null

	inputConversionSpent.addEventListener('input', (e) => {
		e.currentTarget.value = e.currentTarget.value.replace(/[^\.\d]/g, '')

		if (e.currentTarget.value.split('.').length - 1 > 1) {
			e.currentTarget.value = e.currentTarget.value.slice(0, -1)
		}

		if (e.currentTarget.value.includes('.')) {
			if (e.currentTarget.value.split('.')[1].length > 2) {
				e.currentTarget.value = e.currentTarget.value.slice(0, -1)
			}
		}

		if (Number(e.currentTarget.value) >= maxSpent) {
			e.currentTarget.value = maxSpent
		}

		if (Number(e.currentTarget.value) < -1) {
			e.currentTarget.value = 0
		}

		if (Number(e.currentTarget.value) === 0) {
			e.currentTarget.value = ''
		}

		if (e.currentTarget.value === '') {
			titleConversionSpent.innerHTML = '0 ₽'
			inputConversionReceive.value = e.currentTarget.value * robuxCoeff
		} else {
			titleConversionSpent.innerHTML = e.currentTarget.value + ' ₽'
			inputConversionReceive.value = (e.currentTarget.value * robuxCoeff).toFixed(0)
			titleConversionReceive.innerHTML =
				(e.currentTarget.value * robuxCoeff).toFixed(0) + ' R$'
			price = (e.currentTarget.value * robuxCoeff).toFixed(0)
		}
	})

	inputConversionReceive.addEventListener('input', (e) => {
		e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')

		if (Number(e.currentTarget.value) >= maxRecevie) {
			e.currentTarget.value = maxRecevie
		}

		if (Number(e.currentTarget.value) < -1) {
			e.currentTarget.value = 0
		}

		if (Number(e.currentTarget.value) === 0) {
			e.currentTarget.value = ''
		}

		if (e.currentTarget.value === '') {
			titleConversionReceive.innerHTML = '0 ₽'
			inputConversionSpent.value = e.currentTarget.value * robuxCoeff
		} else {
			titleConversionSpent.innerHTML = (e.currentTarget.value / robuxCoeff).toFixed(2) + ' ₽'
			inputConversionSpent.value = (e.currentTarget.value / robuxCoeff).toFixed(2)
			titleConversionReceive.innerHTML = e.currentTarget.value + ' R$'
			price = e.currentTarget.value
		}
	})

	const body = document.querySelector('body')
	const buttonFormSubmite = document.querySelector('.form-data__button')
	const buttonVipserverSubmite = document.querySelector('.vipserver-submit')
	const instructionGamepass = document.querySelector('.gamepass-popup')
	const instructionVipserver = document.querySelector('.vipserver-popup')
	const instructionsPopupsCloses = document.querySelectorAll('.popup-instruction__button_close')
	const simpleInstruction = document.querySelector('.simple-instruction')
	const instructionsPopupsPricesFull = document.querySelectorAll('.instruction-price__full')
	const instructionsPopupsPricesCommission = document.querySelectorAll(
		'.instruction-price__commission'
	)
	const instructionsPopupsPricesUser = document.querySelectorAll('.instruction-price__user')
	const errorPopup = document.querySelector('.error-popup')
	const errorPopupText = document.querySelector('.error-popup__text')
	const errorPopupLink = document.querySelector('.error-popup__link')
	const checkPopup = document.querySelector('.check-popup')
	const checkPopupClose = document.querySelector('.check-close')
	const checkContent = document.querySelector('.check-popup .content')
	const checkButton = document.querySelector('.check')

	checkButton.addEventListener('click', (e) => {
		e.preventDefault()

		if (name.value !== '') {
			body.classList.add('scroll-disabled')
			checkPopup.classList.add('popup-visible')

			// TODO вынести проверку покупок
			fetch(`${apiUrl}/order/check/${name.value}`)
				.then((res) => res.json())
				.then((json) => {
					if (json.length) {
						const table = document.createElement('table')
						const rowhead = document.createElement('tr')
						const dateTh = document.createElement('th')
						dateTh.innerHTML = 'Дата'
						const robuxTh = document.createElement('th')
						robuxTh.innerHTML = 'Робуксы'
						rowhead.insertAdjacentElement('beforeend', dateTh)
						rowhead.insertAdjacentElement('beforeend', robuxTh)
						table.insertAdjacentElement('beforeend', rowhead)

						json.forEach((el) => {
							const rowbody = document.createElement('tr')
							const dateTd = document.createElement('td')
							dateTd.innerHTML = new Date(el.dateCreated).toLocaleString()
							const robuxTd = document.createElement('td')
							robuxTd.innerHTML = el.robux
							rowbody.insertAdjacentElement('beforeend', dateTd)
							rowbody.insertAdjacentElement('beforeend', robuxTd)
							table.insertAdjacentElement('beforeend', rowbody)
						})

						checkContent.insertAdjacentElement('afterbegin', table)
					} else {
						checkContent.innerHTML = '<h3>У вас пока нет покупок</h3>'
					}
				})
				.catch(() => {
					checkContent.innerHTML = '<h3>Не удалось получить данные</h3>'
				})
		}
	})

	checkPopupClose.addEventListener('click', () => {
		body.classList.remove('scroll-disabled')
		checkPopup.classList.remove('popup-visible')
		checkContent.innerHTML = ''
	})

	instructionsPopupsCloses.forEach((el) => {
		el.addEventListener('click', () => {
			instructionGamepass.classList.remove('popup-instruction-visible')
			instructionVipserver.classList.remove('popup-instruction-visible')
			body.classList.remove('scroll-disabled')
		})
	})

	simpleInstruction.addEventListener('click', () => {
		block1.classList.remove('block_none')
		block2.classList.add('block_none')
		block3.classList.add('block_none')
		block4.classList.add('block_none')
		button4.classList.remove('block_none')
		button5.classList.add('block_none')
		button1.classList.remove('block_none')
		button2.classList.add('block_none')
		button7.classList.remove('block_none')
		button8.classList.add('block_none')
	})

	const form = document.getElementById('form')
	const name = document.querySelector('.input-name')
	const number = document.querySelector('.input-number')

	let placeId = null
	let universeId = null
	let productId = null
	let userId = null

	function formAddError(input) {
		input.classList.add('error')
	}

	function formRemoveError(input) {
		input.classList.remove('error')
	}

	function disabledButton(button) {
		button.firstChild.style.display = 'none'
		button.setAttribute('disabled', 'disabled')
		button.lastChild.classList.add('loader-active')
	}

	function inclusionButton(button) {
		button.firstChild.style.display = 'block'
		button.removeAttribute('disabled')
		button.lastChild.classList.remove('loader-active')
	}

	function emailTest(input) {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value)
	}

	function nameTest(input) {
		return /^[A-Za-z0-9][A-Za-z0-9_]{2,19}$/.test(input.value)
	}

	function numberTest(input) {
		return /^[0-9]|\.|,{1,6}$/.test(Number(input.value))
	}

	name.addEventListener('input', (e) => {
		let inputValue = e.currentTarget

		if (inputValue.value !== '') {
			checkButton.removeAttribute('disabled')
		} else {
			checkButton.setAttribute('disabled', true)
		}

		if (nameTest(inputValue)) {
			if (inputValue.classList.contains('error')) {
				inputValue.classList.remove('error')
				inputValue.nextSibling.nextSibling.classList.remove('form-data__message_active')
			}
		}
	})

	number.addEventListener('input', (e) => {
		let inputValue = e.currentTarget

		if (numberTest(inputValue)) {
			if (inputValue.classList.contains('error')) {
				inputValue.classList.remove('error')
				inputValue.nextSibling.nextSibling.nextSibling.nextSibling.classList.remove(
					'form-data__message_active'
				)
			}
		}
	})

	async function getPlacesIdByNickname(nickname) {
		const url = `${apiUrl}/roblox/places/${nickname}`
		try {
			const res = await fetch(url)
			return await res.json()
		} catch (error) {
			return false
		}
	}

	async function getGamePass(universeId) {
		const url = `${apiUrl}/roblox/gamepass/${universeId}`
		try {
			const res = await fetch(url)
			return await res.json()
		} catch (error) {
			return false
		}
	}

	function formValidate(form) {
		let error = 0
		let formReq = document.querySelectorAll('.required')

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index]
			formRemoveError(input)

			if (input.classList.contains('input-email')) {
				if (!emailTest(input)) {
					formAddError(input)
					error++
				}
			}

			if (input.classList.contains('input-name')) {
				if (!nameTest(input)) {
					formAddError(input)
					input.nextSibling.nextSibling.classList.add('form-data__message_active')
					error++
				}
			}

			if (input.classList.contains('input-number')) {
				if (
					!numberTest(input) ||
					Number(input.value) < minSpent ||
					Number(input.value) > maxSpent
				) {
					formAddError(input)
					input.nextSibling.nextSibling.nextSibling.nextSibling.classList.add(
						'form-data__message_active'
					)
					error++
				}
			}
		}
		return error
	}



	const submitGamePass = document.querySelector('.gamepass-submit')
	const errorMes = document.querySelector('.error-mes')

	/* СОЗДАНИЕ ЗАКАЗА */

	// submitGamePass.addEventListener('click', async () => {
	// 	disabledButton(submitGamePass)
	// 	try {
	// 		let res = await fetch(apiUrl + '/order/create', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({
	// 				universeId,
	// 				placeId,
	// 				nickname: name.value,
	// 				spent: +inputConversionSpent.value,
	// 				recive: +inputConversionReceive.value,
	// 			}),
	// 		})
	// 		res = await res.json()
	// 		if (res.error) {
	// 			errorPopup.classList.add('popup-visible')
	// 			errorPopupText.innerHTML = res.message
	// 			errorPopupLink.addEventListener('click', (event) => {
	// 				event.preventDefault()
	// 				const win = window.open(
	// 					`https://www.roblox.com/develop?Page=game-passes`,
	// 					'_target'
	// 				)
	// 				win.focus()
	// 			})
	// 			inclusionButton(submitGamePass)
	// 		}
	// 		if (res.link) {
	// 			document.location.href = res.link
	// 		}
	// 	} catch (e) {
	// 		console.log(e)
	// 		errorMes.textContent = 'Ошибка подключения к серверу'
	// 		inclusionButton(submitGamePass)
	// 	}
	// })

	const button = document.getElementById('button')
	const blocker = document.getElementById('blocker')
	const erorr = document.getElementById('error')
	const block_wrap = document.getElementById('block_wrap')

	const block1 = document.getElementById('block_wrapper1')
	const block2 = document.getElementById('block_wrapper2')
	const block2_1 = document.getElementById('block_wrapper2_1')
	const block2_2 = document.getElementById('block_wrapper2_2')
	const block3 = document.getElementById('block_wrapper3')
	const block3_1 = document.getElementById('block_wrapper3_1')
	const block3_2 = document.getElementById('block_wrapper3_2')
	const block4 = document.getElementById('block_wrapper4')

	const button1 = document.getElementById('button1')
	const button2 = document.getElementById('button2')
	const button3 = document.getElementById('button3')
	const button4 = document.getElementById('button4')
	const button5 = document.getElementById('button5')
	const button6 = document.getElementById('button6')
	const button7 = document.getElementById('button7')
	const button8 = document.getElementById('button8')

	const priceSpan = document.querySelector('.price')

	const error1 = document.querySelector('#error1')
	const error2 = document.querySelector('#error2')
	const error3 = document.querySelector('#error3')
	const placehold4 = document.getElementById('placehold4')
	const commission = document.querySelector('.commission-none')
	const error_price = document.querySelector('.error-price')

	function formSendHandler(e) {
		e.preventDefault()
		const error = formValidate(form)

		if (error === 0) {
			const nickname = name.value
			disabledButton(buttonFormSubmite)

			getPlacesIdByNickname(nickname).then((info) => {
				if (info.userId) {
					blockSelectGamePassBtn()
					const placeItemsContainer = document.querySelector('.place-items')
					placeItemsContainer.innerHTML = ''
					placeId = null

					info.places.forEach((place) => {
						const item = document.createElement('div')

						item.classList.add('placeItem')
						item.dataset.userId = info.userId
						item.dataset.placeId = place.rootPlace.id
						item.dataset.universeId = place.id
						item.innerHTML = place.name

						item.addEventListener('click', (e) => {
							const allItems = document.querySelectorAll('.placeItem')
							allItems.forEach((i) => i.classList.remove('item_active'))
							e.target.classList.toggle('item_active')
							placeId = +e.target.dataset.placeId
							unblockSelectGamePassBtn()
						})

						placeItemsContainer.appendChild(item)
					})

					instructionGamepass.classList.add('popup-instruction-visible')
					body.classList.add('scroll-disabled')
				} else if (info.message == 'Плейсы не найдены') {
					console.log(info)
					block1.classList.add("block_none")
					block4.classList.remove("block_none")
					instructionGamepass.classList.add('popup-instruction-visible')
				} else {
					formAddError(name)
					name.nextSibling.nextSibling.classList.add('form-data__message_active')
				}

				inclusionButton(buttonFormSubmite)
			})

			instructionsPopupsPricesFull.forEach((el) => {
				el.innerHTML = Math.round(Number(inputConversionReceive.value) / 0.7) + '&nbsp;R$'
			})

			instructionsPopupsPricesCommission.forEach((el) => {
				el.innerHTML =
					Math.round(Number(inputConversionReceive.value) / 0.7) -
					Math.round(Number(inputConversionReceive.value))
			})

			instructionsPopupsPricesUser.forEach((el) => {
				el.innerHTML = Math.round(Number(inputConversionReceive.value))
			})
		}
	}

	form.addEventListener('submit', formSendHandler)

	function unblockSelectGamePassBtn() {
		blocker.classList.add('notActive')
		button.classList.add('active')
	}
	function blockSelectGamePassBtn() {
		blocker.classList.remove('notActive')
		button.classList.remove('active')
	}
	window.btnOnclickErorr = function btnOnclickErorr() {
		erorr.classList.add('erorr_active')
		setTimeout(() => {
			erorr.classList.remove('erorr_active')
		}, 3000)
	}
	window.closeBnt = function closeBnt() {
		block_wrap.classList.add('closeBlock')
	}

	window.onClickbutton1 = function onClickbutton1() {
		getPlacesIdByNickname(name.value).then((res) => {
			universeId = res.places[0].id
			placehold4.innerHTML = ((price / 100) * 142.855).toFixed(0)
			commission.innerHTML = price
			error_price.innerHTML = ((price / 100) * 142.855).toFixed(0)
			priceSpan.innerHTML = `${((price / 100) * 142.855).toFixed(0)} R$`
			console.log(res)
			getGamePass(universeId).then((res) => {
				console.log(res)

				if (!res.error) {
					productId = res.id
					block1.classList.add('block_none')
					block2.classList.add('block_none')
					block3.classList.remove('block_none')
					timeout()
					setInterval(timeout, 5500)
					
					if (res.price == ((price / 100) * 142.855).toFixed(0)) {
						button4.classList.add('block_none')
						button5.classList.remove('block_none')
					}

					return
				}

				block1.classList.add('block_none')
				block2.classList.remove('block_none')
			})


		})

		blocker.classList.remove('notActive')
		button.classList.remove('active')

		setTimeout(() => {
			interval()
		}, 1000)
		setInterval(() => {
			interval()
		}, 4000)
	}

	window.onClickbutton2 = function onClickbutton2() {
		getPlacesIdByNickname(name.value).then((res) => {
			universeId = res.places[0].id
			window.open(
				`https://create.roblox.com/dashboard/creations/experiences/${universeId}/passes/create`
			)
			placehold4.innerHTML = ((price / 100) * 142.855).toFixed(0)
			commission.innerHTML = price
			error_price.innerHTML = ((price / 100) * 142.855).toFixed(0)
			priceSpan.innerHTML = `${((price / 100) * 142.855).toFixed(0)} R$`
			button1.classList.add('block_none')
			button2.classList.remove('block_none')
		})
	}

	window.onClickbutton3 = function onClickbutton3() {
		button2.classList.add('block_none')
		button3.classList.remove('block_none')
	}

	window.onClickbutton4 = function onClickbutton4() {
		getGamePass(universeId).then((res) => {
			if (!res.error) {
				productId = res.id
				block2.classList.add('block_none')
				block3.classList.remove('block_none')
				timeout()
				setInterval(timeout, 5500)
				return
			}

			error1.classList.add('erorr_active')
			setTimeout(() => {
				error1.classList.remove('erorr_active')
			}, 3000)
			button1.classList.remove('block_none')
			button2.classList.add('block_none')
		})
	}
	window.onClickbutton5 = function onClickbutton5() {
		timeout()
		setInterval(timeout, 5500)
		window.open(
			`https://create.roblox.com/dashboard/creations/experiences/${universeId}/passes/${productId}/sales`
		)
		button4.classList.add('block_none')
		button5.classList.remove('block_none')
	}
	window.onClickbutton6 = function onClickbutton6() {
		getGamePass(universeId).then(async (res) => {
			const priceWithCommision = ((price / 100) * 142.855).toFixed(0)

			if (res.price == priceWithCommision) {
				
				timeout()
				setInterval(timeout, 5500)

				try {
					let res = await fetch(apiUrl + '/order/create', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							universeId,
							placeId,
							nickname: name.value,
							spent: +inputConversionSpent.value,
							recive: +inputConversionReceive.value,
						}),
					})
					res = await res.json()
					if (res.error) {
						errorPopup.classList.add('popup-visible')
						errorPopupText.innerHTML = res.message
						errorPopupLink.addEventListener('click', (event) => {
							event.preventDefault()
							const win = window.open(
								`https://www.roblox.com/develop?Page=game-passes`,
								'_target'
							)
							win.focus()
							button5.classList.add('block_none')
							button6.classList.remove('block_none')
						})
						inclusionButton(submitGamePass)
					}
					if (res.link) {
						document.location.href = res.link
					}

				} catch (e) {
					console.log(e)
					errorMes.textContent = 'Ошибка подключения к серверу'
					inclusionButton(submitGamePass)
				}

				return
			}
			error2.classList.add('erorr_active')
			setTimeout(() => {
				error2.classList.remove('erorr_active')
			}, 3000)
			button4.classList.remove('block_none')
			button5.classList.add('block_none')
		})
	}
	window.onClickbutton8 = function onClickbutton8() {
		window.open(
			`https://create.roblox.com/dashboard/creations`
		)
		setTimeout(() => {
			button7.classList.add('block_none')
			button8.classList.remove('block_none')
		}, 500)
	}
	window.onClickbutton9 = function onClickbutton9() {
		getPlacesIdByNickname(name.value).then(res => {
			console.log(res)
			if (res.message == 'Плейсы не найдены') {
				console.log(res)
				error3.classList.add('erorr_active')
				setTimeout(() => {
					error3.classList.remove('erorr_active')
				}, 3000)
				button7.classList.remove('block_none')
				button8.classList.add('block_none')

			} else {
				button7.classList.add('block_none')
				button8.classList.add('block_none')
				block4.classList.add('block_none')
				block1.classList.remove('block_none')

				const error = formValidate(form)

				if (error === 0) {
					disabledButton(buttonFormSubmite)

					blockSelectGamePassBtn()
					const placeItemsContainer = document.querySelector('.place-items')
					placeItemsContainer.innerHTML = ''
					placeId = null

					res.places.forEach((place) => {
						const item = document.createElement('div')

						item.classList.add('placeItem')
						item.dataset.userId = res.userId
						item.dataset.placeId = place.rootPlace.id
						item.dataset.universeId = place.id
						item.innerHTML = place.name

						item.addEventListener('click', (e) => {
							const allItems = document.querySelectorAll('.placeItem')
							allItems.forEach((i) => i.classList.remove('item_active'))
							e.target.classList.toggle('item_active')
							placeId = +e.target.dataset.placeId
							unblockSelectGamePassBtn()
						})

						placeItemsContainer.appendChild(item)
					})

					instructionGamepass.classList.add('popup-instruction-visible')
					body.classList.add('scroll-disabled')

					inclusionButton(buttonFormSubmite)
				}

				instructionsPopupsPricesFull.forEach((el) => {
					el.innerHTML = Math.round(Number(inputConversionReceive.value) / 0.7) + '&nbsp;R$'
				})
	
				instructionsPopupsPricesCommission.forEach((el) => {
					el.innerHTML =
						Math.round(Number(inputConversionReceive.value) / 0.7) -
						Math.round(Number(inputConversionReceive.value))
				})
	
				instructionsPopupsPricesUser.forEach((el) => {
					el.innerHTML = Math.round(Number(inputConversionReceive.value))
				})
			}
		})
	}

	// app.js
	let lableBtn = document.getElementById('lableBtn')
	let secBtn = document.getElementById('secBtn')
	let placehold1 = document.getElementById('placehold1')
	let placehold2 = document.getElementById('placehold2')

	function pulseBtn() {
		lableBtn.classList.toggle('animation_lable')
	}
	function addValue() {
		placehold1.classList.toggle('placegolder-notActive')
		placehold2.classList.toggle('place_notActive')
	}
	function pulseSecBtn() {
		secBtn.classList.toggle('animationButtons')
	}

	function interval() {
		setTimeout(pulseBtn, 0)
		setTimeout(addValue, 1000)
		setTimeout(pulseSecBtn, 2500)
	}

	// app3.js
	let switcher = document.getElementById('switcher')
	let secBtnRob = document.getElementById('secBtnRob')
	let span1 = document.getElementById('span1')
	let span2 = document.getElementById('span2')
	let placehold3 = document.getElementById('placehold3')

	function timeout() {
		setTimeout(() => {
			switcher.classList.toggle('switch-on')
		}, 500)
		setTimeout(() => {
			span1.classList.toggle('notActive-span')
			span2.classList.toggle('active-span')
			placehold3.classList.toggle('placegolder-notActive')
			placehold4.classList.toggle('place_notActive')
		}, 2500)
		setTimeout(() => {
			secBtnRob.classList.toggle('active2')
		}, 2500)
		setTimeout(() => {
			secBtnRob.classList.toggle('animationButtons')
		}, 4500)
	}
})
