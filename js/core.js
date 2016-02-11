//核心日历算法（日期的计算都在这里）
;define([],function(){
	//记录今天的数值
	var today = {};
	// 被选中的月
	var selectDay = {};
	var threeMonth = [];
	// 月份所对应的天(0-11)
	var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var me = {
		//更具time来生成天的 /年/月/日(默认获取当前日)
		init:function(time){
			if(!time){
				time = new Date();
				console.log("根据时间"+time+"生成日历");
			};
			today.year = time.getFullYear();
			today.month = time.getMonth();
			today.day = time.getDate();
			today.week = time.getDay();
			console.log("today",today);
			selectDay = today;
			console.log("Select Day",selectDay);
			me.generateThree();
		},
		// 判断是不是闰年(true是闰年,false不是闰年)
		isLeapYear:function(year){
			return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
		},
		// 根据月计算天数
	    calculateDays:function(year, month) {
		    var days = months[month]
		    // 2月比较特殊，非闰年28天，闰年29天，如2008年2月为29天
		    if ( 1 == month && me.isLeapYear(year)) {
		        days = 29
		    }
		    return days;
		},
		// 根据日期计算星期几
		calculateWeek:function(y,m,d){
			return new Date(y,m,d).getDay();
		},
		// 通过时date对象取当前的日期 年 月 日 周几
		getDay:function(date){
			return {
				year:date.getFullYear(),
				month:date.getMonth(),
				day:date.getDate(),
				week:date.getDay(),
			}
		},
		//上个月
		prevMonth:function(){
			if(selectDay.month != 0){
				selectDay.month--; 
			}else{
				selectDay.year --;
				selectDay.month = 11;
			}
		},
		getPrevMonth:function(year,month){
			if(month != 0){
				return {
					year:year,
					month:month-1
				}
			}else {
				return {
					year:year-1,
					month:11
				}	
			}
		},
		// 下个月
		nextMonth:function(){
			if(selectDay.month != 11){
				selectDay.month ++;
			}else{
				selectDay.year ++ ;
				selectDay.month = 0;
			}
		},
		getNextMonth:function(year,month){
			if(month != 11){
				return {
					year:year,
					month:month+1
				}
			}else {
				return {
					year:year+1,
					month:0
				}	
			}
		},
		//生成3个月的显示信息对象集合
		generateThree:function(){
			var prevMonth = me.getPrevMonth(selectDay.year,selectDay.month);
			var midMonth = {
				year:selectDay.year,
				month:selectDay.month
			}
			var nextMonth = me.getNextMonth(selectDay.year,selectDay.month);
			threeMonth.push(prevMonth);
			threeMonth.push(midMonth);
			threeMonth.push(nextMonth);
			me.generateOther();
			console.log("上一个月，当前月，下一个月",threeMonth);
		},
		generateNext:function(cb){
			var month = me.getNextMonth(threeMonth[2].year,threeMonth[2].month);
			threeMonth.push(month);
			threeMonth.shift();
			me.generateOther();
			console.log("上一个月，当前月，下一个月",threeMonth);
			cb && cb(); 
		},
		generatePrev:function(cb){
			var month = me.getPrevMonth(threeMonth[0].year,threeMonth[0].month);
			threeMonth.unshift(month);
			threeMonth.pop();
			me.generateOther();
			console.log("上一个月，当前月，下一个月",threeMonth);
			cb && cb();
		},
		//生成公用部分
		generateOther:function(){
			for(var i in threeMonth){
				var m = threeMonth[i].month;
				var y = threeMonth[i].year;
				threeMonth[i].maxDay = me.calculateDays(y,m);
				threeMonth[i].firstWeek = me.calculateWeek(y,m,1);
			}
		},
		//get set 实例方法
		//当前天
		getToday:function(){
			return  today;
		},
		setToday:function(_today){
			toady = _today;
		},
		//选中的日期
		getSelectDay:function(){
			return selectDay;
		},
		setSelectDay:function(_selectDay){
			selectDay = _selectDay;
		},
		//获取要显示的三个月
		getThreeMonth:function(){
			return threeMonth;
		},
		setThreeMonth:function(_threeMonth){
			threeMonth = _threeMonth;
		}
	};
	return me;
});