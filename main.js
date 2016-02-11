;define(['./js/Calender.js'],function(calender){
	var me = {
		init:function(){
			console.log("程序开始运行");
			calender.on("click-day",function(d){
				console.warn("点击触发的事件，得到时间字符串",d);
			});
			calender.init({hook:".hanshao_calendar"});
		}
	};
	return me;
});