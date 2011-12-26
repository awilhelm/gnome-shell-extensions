with(imports.ui.main) {

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
		with(imports.gi.Clutter.ScrollDirection) {
			switch(event.get_scroll_direction()) {
				case UP:
				case LEFT:
					return -1
				case DOWN:
				case RIGHT:
					return 1
			}
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

function init() {
	enable()
}

function enable() {
	panel._appMenu.actor.connect('scroll-event', on_scroll_event)
}

function disable() {
	panel._appMenu.actor.disconnect('scroll-event', on_scroll_event)
}

}
