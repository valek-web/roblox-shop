document.addEventListener('DOMContentLoaded', () => {
	const statistics = document.querySelector('.statistics')
	const statisticsOnline = document.querySelector('.statistics_online')
	const statisticsAvailable = document.querySelector('.statistics_available')
	const statisticsSold = document.querySelector('.statistics_sold')
	const statisticsBuy = document.querySelector('.statistics_buy')

	const randomNumber = function (min, max) {
		let number = min - 0.5 + Math.random() * (max - min - 1)
		return Math.round(number)
	}

	const randomTime = function (min, max) {
		let time = min - 0.5 + Math.random() * (max - min - 1)
		return Math.round(time) * 1000
	}

	const randomSign = function () {
		let sign = Math.random()
		return Math.round(sign)
	}

	function convertationNumber(number) {
		return number.toString().replace(/\s/g, '').slice(0, -2)
	}

	function convertationString(string) {
		return string.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ') + ' R$'
	}

	// function calculatorRandomStepOnlain(randomTime) {
	//     let timerId = setTimeout(function step() {
	//         if (Boolean(randomSign())) {
	//             if (Number(statisticsOnline.innerHTML) < 23) {
	//                 statisticsOnline.innerHTML = Number(statisticsOnline.innerHTML) + randomNumber(1, 7);
	//             }
	//             if (Number(statisticsOnline.innerHTML) > 120) {
	//                 statisticsOnline.innerHTML = Number(statisticsOnline.innerHTML) - randomNumber(1, 4);
	//             }
	//             statisticsOnline.innerHTML = Number(statisticsOnline.innerHTML) + randomNumber(1, 4);
	//         } else {
	//             statisticsOnline.innerHTML = Number(statisticsOnline.innerHTML) - randomNumber(1, 5);
	//         }
	//     timerId = setTimeout(step, randomTime(1, 10));
	//     }, randomTime(1, 10));
	//     return () => { clearTimeout(timerId) }
	// }

	// calculatorRandomStepOnlain(randomTime);

	let counterStartRunningNumbers = 0

	const runningNumbers = function (elem, time, step) {
		let result = 0
		let number = elem.innerHTML
		number = Number(convertationNumber(number))
		time = Math.round(time / (number / step))

		let interval = setInterval(() => {
			result = result + step

			if (result >= number) {
				clearInterval(interval)
			}

			elem.innerHTML = convertationString(result)
		}, time)
	}

	let startRunningNumbers = function (target) {
		let targetPosition = {
				top: window.pageYOffset + target.getBoundingClientRect().top,
				bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
			},
			windowPosition = {
				top: window.pageYOffset,
				bottom: window.pageYOffset + document.documentElement.clientHeight,
			}

		if (targetPosition.top < windowPosition.bottom && counterStartRunningNumbers === 0) {
			// runningNumbers(statisticsAvailable, 1000, 1021)
			runningNumbers(statisticsSold, 1000, 921)
			counterStartRunningNumbers++
		} else {
			return
		}
	}

	window.addEventListener('scroll', () => {
		startRunningNumbers(statistics)
	})
})
