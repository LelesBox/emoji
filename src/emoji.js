var handlers = {
	creatDOMHandler: function (evt) {
		event = EventUtil.getEvent(event);
		var elemt = EventUtil.getTarget(event);
		var imgArr = ["ico_emoji0032", "ico_emoji0001", "ico_emoji0007", "ico_emoji0004", "ico_emoji0008", "ico_emoji0002", "ico_emoji0011", "ico_emoji0009", "ico_emoji0013", "ico_emoji0012", "ico_emoji0014", "ico_emoji0006", "ico_emoji0015", "ico_emoji0017", "ico_emoji0018", "ico_emoji0005", "ico_emoji0016", "ico_emoji0010", "ico_emoji0020", "ico_emoji0019", "ico_emoji0021", "ico_emoji0022", "ico_emoji0023", "ico_emoji0025", "ico_emoji0028", "ico_emoji0026", "ico_emoji0030", "ico_emoji0029", "ico_emoji0031", "ico_emoji0034", "ico_emoji0003", "ico_emoji0033", "ico_emoji0035", "ico_emoji0037", "ico_emoji0036", "ico_emoji0038", "ico_emoji0039", "ico_emoji0040", "ico_emoji0041", "ico_emoji0042", "ico_emoji0043", "ico_emoji0044", "ico_emoji0045", "ico_emoji0046", "ico_emoji0048", "ico_emoji0050", "ico_emoji0049", "ico_emoji0051", "ico_emoji0027", "ico_emoji0052", "ico_emoji0024", "ico_emoji0057", "ico_emoji0054", "ico_emoji0053", "ico_emoji0059", "ico_emoji0056", "ico_emoji0058", "ico_emoji0061", "ico_emoji0060", "ico_emoji0055"]
		if (elemt.offsetLeft > 300) {
			var obj = {
				x: elemt.offsetLeft - 300 + 10 + (Math.sqrt(200) / 2) + (elemt.clientWidth / 2),
				y: elemt.offsetTop + elemt.clientHeight + 10,
			}
			createDOM(obj.x, obj.y, "left", imgArr);
		} else {
			var obj = {
				x: elemt.offsetLeft - 10 - (Math.sqrt(200) / 2) + (elemt.clientWidth / 2),
				y: elemt.offsetTop + elemt.clientHeight + 10,
			}
			createDOM(obj.x, obj.y, "right", imgArr);
		}
	},
	documentClick: function (evt) {
		var emoji = document.getElementById("emoji");
		var event = EventUtil.getEvent(evt);
		var target = EventUtil.getTarget(event);
		if (emoji && !(target == tapElemt)) {
			var ex = event.clientX;
			var ey = event.clientY;
			var emx = emoji.offsetLeft;
			var emy = emoji.offsetTop;
			if (ex > emx && ex < emx + 300 & ey > emy && ey < emy + emoji.clientHeight) { } else {
				destory();
			}
		}
		console.log("tap document")
	}
}
var tapElemt;

function createEmoji(id,callback){
	
}
// 绑定点击事件，捕获xy坐标
function emojiInit(id) {
	tapElemt = typeof id === "string" ? document.getElementById(id) : id;
	EventUtil.addHandler(tapElemt, "click", handlers.creatDOMHandler);
}

function createDOM(x, y, orient, imgarr) {
	var handler = function (evt) {
		var event = EventUtil.getEvent(evt);
		console.log(event.clientX + " " + event.clientY);
	}
	// 如果当前不存在则创建一个
	var emoji = document.getElementById("emoji");
	if (!emoji) {
		var body = document.getElementsByTagName("body")[0];
		// 背景，让点击该背景后emoji表情消失
		emoji = document.createElement("div");
		emoji.setAttribute("id", "emoji");
		emoji.innerHTML = "<div id='emoji-container'>" + "<div id='emoji-triangle'>" + "</div>" + "<div id='emoji-content'>" + "<ul class='emoji-ul clearfix'>" + repeateli(imgarr) + "</ul>" + "</div>" + "</div>";
		body.appendChild(emoji);
		//注册document事件监听鼠标点击事件看是否点击中了emoji选项框，否则框消失
		EventUtil.addHandler(document, "click", handlers.documentClick);
		// 注册事件，点击图标
		var emojiul = document.getElementsByClassName("emoji-ul")[0];
		EventUtil.addHandler(emojiul, "click", function (evt) {
			event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);
			EventUtil.stopPropagation(event);
			console.log(target.className);
		});
	}

	emoji.style.left = x + "px";
	emoji.style.top = y + "px";
	var triangle = document.getElementById("emoji-triangle");
	if (orient == "left") {
		classFactory.replaceClass(triangle, "triangle-left", "triangle-right");
	} else {
		classFactory.replaceClass(triangle, "triangle-right", "triangle-left");
	}
}

function destory() {
	var emoji = document.getElementById("emoji");
	if (emoji) {
		EventUtil.removeHandler(document, "click", handlers.documentClick);
		var body = document.getElementsByTagName("body")[0];
		body.removeChild(emoji);
	}
}

// 事件系统,事件委托
var EventUtil = {
	addHandler: function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	removeHandler: function (element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	getEvent: function (event) {
		return event ? event : window.event;
	},
	getTarget: function (event) {
		return event.target || event.srcElement;
	},
	preventDefault: function (event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	stopPropagation: function (event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};

function setStyle(el, objCss) {
	for (var css in objCss) {
		el.style[css] = objCss[css];
	}
}

function repeateli(imgArr) {
	var str = "";
	for (var i = 0; i < imgArr.length; i++) {
		str += "<li class='" + imgArr[i] + "'></li>";
	}
	return str;
}

// 对元素类的增删改
var classFactory = new (function () {
	var that = this;
	that.getClass = function (ele) {
		return ele.className.replace(/\s+/, " ").split(" ");
	};
	that.hasClass = function (ele, cls) {
		return -1 < (" " + ele.className + " ").indexOf(" " + cls + " ");
	};
	that.addClass = function (ele, cls) {
		if (!that.hasClass(ele, cls)) {
			ele.className += " " + cls;
		}
		return that;
	};
	that.removeClass = function (ele, cls) {
		if (that.hasClass(ele, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			ele.className = ele.className.replace(reg, " ");
		}
		return that;
	};
	that.clearClass = function (ele, cls) {
		ele.className = "";
		return that;
	};
	that.replaceClass = function (ele, newcls, oldcls) {
		if (that.hasClass(ele, oldcls)) {
			that.removeClass(ele, oldcls).addClass(ele, newcls);
		} else {
			that.addClass(ele, newcls);
		}
		return that;
	}
})();
classFactory.constructor.prototype.test = function () {
	return this.getClass;
}