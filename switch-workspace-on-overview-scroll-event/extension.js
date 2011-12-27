with(imports.ui.main.overview) {

let button_release_event;
let scroll_event;

function on_button_release_event(actor, event) {
	if(event.get_button() != 1) return
	hide()
}

function on_scroll_event(actor, event) {
	with(_workspacesDisplay) {
		if(_controls.hover) return
		_onScrollEvent(actor, event)
	}
}

function init() {}

function enable() {
	button_release_event = _group.connect('button-release-event', on_button_release_event)
	scroll_event = _group.connect('scroll-event', on_scroll_event)
}

function disable() {
	_group.disconnect(button_release_event)
	_group.disconnect(scroll_event)
}

}
