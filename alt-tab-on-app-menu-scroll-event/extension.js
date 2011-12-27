with(imports.ui.main) {
with(imports.ui.main.panel._appMenu.actor) {
with(imports.gi.Clutter.ScrollDirection) {

let scroll_event;

function on_scroll_event(actor, event) {

	function insert(w) {
		windows.push(w.get_meta_window())
	}

	function compare(a, b) {
		let aa = a.get_workspace().index()
		let bb = b.get_workspace().index()
		let aaa = a.get_stable_sequence()
		let bbb = b.get_stable_sequence()
		return aa < bb ? -1 : aa > bb ? 1 : aaa < bbb ? -1 : 1
	}

	function step() {
		switch(event.get_scroll_direction()) {
			case UP:
			case LEFT:
				return -1
			case DOWN:
			case RIGHT:
				return 1
		}
	}

	let windows = []
	global.get_window_actors().forEach(insert)
	let n = windows.length
	let active_window = windows[n - 1]
	windows.sort(compare)
	let i = 0
	while(windows[i] != active_window) ++i
	activateWindow(windows[(i + step() + n) % n])
}

function init() {}

function enable() {
	scroll_event = connect('scroll-event', on_scroll_event)
}

function disable() {
	disconnect(scroll_event)
}

}}}
