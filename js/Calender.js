;define(["./core","text!../Tpl/simpleCalender.html","asevented"],function(C,tpl,asevented){
	var render = _.template(tpl);
	var _hook;
	var body;
	//选中的天
	var clickDay;
	var me = {
		//传入时间 time 钩子 hook
		init:function(opt){
			C.init(opt.time);
			clickDay = C.getToday().year+"/"+C.getToday().month+"/"+C.getToday().day;
			me.trigger("click-day",clickDay);
			_hook = $(opt.hook);
			//单例获得最大的效率
			if(opt.body){
				body = opt.body;
			}else{
				body = $("body");
			}
			me.addEventListen();
			var d = me.dataToHandel();
			console.log("这是要显示的3个月",d);
			me.handel({d:d});
		},
		//得到渲染的数据
		dataToHandel:function(){
			var d1 = C.getThreeMonth();
			return d1;
		},
		handel:function(data){
			var html = render(data);
			_hook.html(html);
			$("[data-day='"+clickDay+"']").addClass("ble-ui-calender-select");
		},
		//加入监听事件
		addEventListen:function(){
			//点击选中事件
			body.on("click",".ble-ui-calender-day",function(){
				var d = $(this).attr("data-day");
				if(!d){
					return;
				}
				console.log("选择了日期",d);
				clickDay = d;
				$(".ble-ui-calender-select").removeClass('ble-ui-calender-select');
				$(this).addClass("ble-ui-calender-select");
				me.trigger("click-day",d);
			});
			//滑动事件
			(function(){
				var DeviceWidth = document.body.offsetWidth; 
				var startX,
					startY,
					endX,
					endY,
					distanceX,
					distanceY,
					touchMoveX = 0,
					speed = 10,
					isMoving = false;

				var afterMove = function(s){
					me.handel({d:C.getThreeMonth()});
					_hook.css("left",0);
					isMoving = false;
					clearInterval(s);
				};
				// mX;
				// 安卓swipeLeft事件不支持，这样弄就可以了
				_hook.bind('touchstart', function(event) {
					event.preventDefault();
					if(isMoving){return};
					console.log("touchStart")
					count = 0;
					touchMoveX = 0;
					//每次开始点击时清零
					startX = event.targetTouches[0].clientX;    
					startY = event.targetTouches[0].clientY;
				}).bind('touchmove', function(event) {
					event.preventDefault();
					if(isMoving){return};
					console.log("touchmove",isMoving);
					endX = event.changedTouches[0].clientX;
					touchMoveX = endX-startX;
					_hook.css("left",touchMoveX);
					count++;
				}).bind('touchend', function(event) {
					event.preventDefault();
					if(isMoving){return};
					console.log("touchend");
					isMoving = true;
					endX = event.changedTouches[0].clientX;
					endY = event.changedTouches[0].clientY;
					distanceX = Math.abs(startX - endX);
					distanceY = Math.abs(startY - endY);
					var m1 = touchMoveX;
					var m2;
					if (distanceX > distanceY) {
						if(startX - endX > 30){
							m2 = -DeviceWidth;
							var s = setInterval(function(){
								if(m2<m1){
									m1 -= speed;
									if(m2>m1){
										m2 = m1;
									}
									_hook.css("left",m1);
								}else{
									me.nextMonth();
									afterMove(s);
								}
							},30);
						}else if(startX - endX < -30){
							m2 = DeviceWidth;
							var s = setInterval(function(){
								if(m2 > m1){
									m1 += speed;
									if(m2<m1){
										m2 = m1;
									}
									_hook.css("left",m1);
								}else{
									me.prevMonth();
									afterMove(s);
								}
							},30);
						}else{
							_hook.css("left",0);
							isMoving = false;
						}
					}else{
						isMoving = false;
					}
				});
			})();	
		},
		//下个月
		nextMonth:function(){
			C.generateNext();
		},
		// 上个月
		prevMonth:function(){
			C.generatePrev();
		}
	};
	asevented.call(me);
	return me;
});