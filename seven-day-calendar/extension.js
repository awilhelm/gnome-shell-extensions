with(imports.ui.calendar.EventsList) {

let hooks = {}

function init() {
	hooks.orig = prototype._showToday
	prototype._showToday = function() {
		hooks.before.call(this)
		hooks.orig.call(this)
		hooks.after.call(this)
	}

	enable()
}

function enable() {
	let week_start

	hooks.before = function() {
		week_start = this._weekStart
		this._weekStart = new Date().getDay()
	}

	hooks.after = function() {
		this._weekStart = week_start
	}
}

function disable() {
	hooks.before = function() {}
	hooks.after = function() {}
}

}
