var box1 = document.getElementById('box1');
var box2 = document.getElementById('box2');
var canClick = true;
box2.onclick = function() {
	if(canClick === true) {
		canClik = false;
		var randomnumber = Math.floor(Math.random() * 100);
		var grade;
		if(randomnumber < 5) {
			grade = {
				code: 1,
				text: "一等奖:免单4999元"
			};
		} else if(randomnumber < 15) {
			grade = {
				code: 2,
				text: "二等奖:免单50元"
			};
		} else if(randomnumber < 25) {
			grade = {
				code: 3,
				text: "三等奖:免单10元"
			};
		} else if(randomnumber < 35) {
			grade = {
				code: 4,
				text: "四等奖:免单5元"
			};
		} else if(randomnumber < 45) {
			grade = {
				code: 5,
				text: "五等奖:免分期，服务费"
			};
		} else if(randomnumber < 55) {
			grade = {
				code: 6,
				text: "七等奖:提高白条额度"
			};
		} else {
			grade = {
				code: 7,
				text: "未中奖，继续加油"
			};
		}
		console.log(grade);
		var rotary = 30 + (360 / 7) * (grade.code - 1);
		box1.style.transition = 'all 3s';
		box1.style.transform = 'rotate(' + (rotary+ 360 * 3) + 'deg)';

		setTimeout(function() {
			box1.style.transition = 'all 0s';
			box1.style.transform = 'rotate(' + rotary + 'deg)';
			alert(grade.text);
			canClick = true;
		}, 3000);
	}
}