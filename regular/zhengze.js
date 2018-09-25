function isId(str) {
	var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][0-9])|30|31)\d{3}[0-9Xx]$/;
	return reg.test(str);
}
function isChinese(str) {
	var reg = /^[\u4E00-\u9FA5]{2,5}$/;
	return reg.test(str);
}
function isPohneCode(str) {
	var reg = /^1(3|4|5|7|8)\d{9}$/;
	return reg.test(str);
}
function isEmailAddress(str) {
	var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$ /;
	return reg.test(str);
}
function isQQNumber(str) {
	var reg = /^[1-9][0-9]{4,14}$/;
	return reg.test(str);
}

function fun1() {
	if (!isId(document.getElementById("sfz").value)) {
		alert("身份證號碼是18位数字");
		document.getElementById("sfz").focus();
		return false;
	}

	if (!isChinese(document.getElementById("xm").value)) {
		alert("姓名必须填写中文");
		document.getElementById("xm").focus();
		return false;
	}

	if (!isPhoneCode(document.getElementById("dhhm").value)) {
		alert("電話號碼错误");
		document.getElementById("dhhm").focus();
		return false;
	}

	if (!isEmailAddress(document.getElementById("yxdzl").value)) {
		alert("郵箱地址不對");
		document.getElementById("yxdz").focus();
		return false;
	}

	if (!isQQNumber(document.getElementById("qqhm").value)) {
		alert("QQ賬號錯誤");
		document.getElementById("qqhm").focus();
		return false;
	}

	/*运行到这里说明验证通过返回true    submit提交按钮起作用提交表单*/
	alert("提交成功")
	return true;   // 这边设置禁止提交，实际项目需要改为 true
}