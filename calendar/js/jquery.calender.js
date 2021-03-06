/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-03-30 17:42:42
 * @version $Id$
 */

(function($){
	$.fn.calender = function(opt){
		opt = $.extend({}, $.fn.calender.defaults, opt);
		var _this = $(this);

		return this.each(function(index, el) {
			new Calender(_this, opt);
		});;
	};
	$.fn.calender.defaults = {
		week: ['一', '二', '三', '四', '五', '六', '日']
	};

	function Calender(el, opt){
		this.el = el;
		this.opt = opt;
		this.year = opt.year || new Date().getFullYear();
		this.month = opt.month || new Date().getMonth() + 1;
		this.date = opt.date || new Date().getDate()
		this.init();
	};

	Calender.prototype = {
		init: function(){
			this.renderTmpl();
			this.eventHandler();
		},
		getDays: function(year, month){
			var _date = new Date(year, month, 0);
			return _date.getDate();
		},
		getFirstDay: function(year, month){
			var _date = new Date(year, month-1, 1);
			return _date.getDay() == 0 ? 7 : _date.getDay();
		},
		getCurDate: function(){
			var _date = {
				year: new Date().getFullYear(),
				month: new Date().getMonth()+1,
				date: new Date().getDate()
			};
			return _date;
		},
		isCurDate: function(year, month, date){
			var curDate = this.getCurDate();
			return curDate.year == year && curDate.month == month && curDate.date == date && true;
		},
		renderTmpl: function(){
			var tmpl = '';
			tmpl += this.renderPannelTmpl();
			tmpl += this.renderItemsTmpl();
			this.el.html(tmpl);
		},
		renderPannelTmpl: function(){
			var tmpl = '<div class="calender-pannel">';
			tmpl += '<a class="calender-prev-year" href="javascript:;">上一年</a>';
			tmpl += '<span class="calender-year">'+this.year+'</span>';
			tmpl += '<a class="calender-next-year" href="javascript:;">下一年</a>';
			tmpl += '<a class="calender-prev-month" href="javascript:;">上一月</a>';
			tmpl += '<span class="calender-month">'+this.month+'</span>';
			tmpl += '<a class="calender-next-month" href="javascript:;">下一月</a>';
			tmpl += '</div>';
			return tmpl;
		},
		renderItemsTmpl: function(){
			var tmpl = '<div class="calender-items">';
			tmpl += this.renderWeekTmpl();
            tmpl += '<ol>';

            tmpl += this.renderPrevTmpl();
            tmpl += this.renderCurTmpl();
            tmpl += this.renderNextTmpl();

			tmpl += '</ol>';
			tmpl += '</div>';

			return tmpl;
		},
		renderPrevTmpl: function(){
			var tmpl = '';
			var className = '';
			var days = this.getDays(this.year, this.month);
			var prevDays = this.getDays(this.year, this.month-1);
			var firstDay = this.getFirstDay(this.year, this.month);

			for (var i = prevDays - (firstDay - 1) + 1; i <= prevDays; i++) {
        		if ( this.isCurDate(this.year, this.month-1, i) ){
	    			className = 'calender-today';
	    		}else{
	    			className = '';
	    		}
            	tmpl += '<li class="calender-cross '+className+'">'+i+'</li>';
            }
            return tmpl;
		},
		renderCurTmpl: function(){
			var tmpl = '';
			var className = '';
			var days = this.getDays(this.year, this.month);

			for (var i = 1; i <= days; i++) {
	        	if ( this.isCurDate(this.year, this.month, i) ){
	    			className = 'calender-today';
	    		}else{
	    			className = '';
	    		}
            	tmpl += '<li class="'+className+'">'+i+'</li>';
            }
            return tmpl;
		},
		renderNextTmpl: function(){
			var tmpl = '';
			var className = '';
			var days = this.getDays(this.year, this.month);
			var firstDay = this.getFirstDay(this.year, this.month);
			
			for (var i = 1; i <= 42 - ( days + ( firstDay - 1 ) ); i++) {
	        	if ( this.isCurDate(this.year, this.month+1, i) ){
	    			className = 'calender-today';
	    		}else{
	    			className = '';
	    		}
            	tmpl += '<li class="calender-cross '+className+'">'+i+'</li>';
            }
            return tmpl;
		},
		renderWeekTmpl: function(){
			var tmpl = '<ul>';
			for (var i = 0, len = this.opt.week.length; i < len; i++) {
				tmpl += '<li>'+this.opt.week[i]+'</li>';
			}
            tmpl += '</ul>';
			return tmpl;
		},
		eventHandler: function(){
			var _this = this;
			this.el.on('click', '.calender-next-year', function(){
				_this.year += 1;
				_this.renderTmpl();
			});
			this.el.on('click', '.calender-prev-year', function(){
				if(_this.year <= 1900){
					return false;
				}
				_this.year -= 1;
				_this.renderTmpl();
			});
			this.el.on('click', '.calender-next-month', function(){
				if(_this.month == 12){
					_this.year += 1;
					_this.month -= 11;
				}else{
					_this.month += 1;
				}
				_this.renderTmpl();
			});
			this.el.on('click', '.calender-prev-month', function(){
				if(_this.month == 1){
					_this.year -= 1;
					_this.month += 11;
				}else{
					_this.month -= 1;
				}
				_this.renderTmpl();
			});
		}
	}
})(jQuery);