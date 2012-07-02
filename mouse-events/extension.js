const Mainloop = imports.mainloop
const Main = imports.ui.main
const SD = imports.gi.Clutter.ScrollDirection

let events = []

function init()
{
}

function enable()
{
	let windows = []
	let timeout

	function clear()
	{
		windows = []
	}

	function switch_window(actor, event)
	{
		Mainloop.source_remove(timeout)
		timeout = Mainloop.timeout_add(3000, clear)

		if(!windows.length)
		{
			function insert(actor)
			{
				windows.push(actor.get_meta_window())
			}

			global.get_window_actors().forEach(insert)
			windows.reverse()
		}

		switch(event.get_scroll_direction())
		{
			case SD.UP:
			case SD.LEFT:
			{
				windows.unshift(windows.pop())
			}
			break
			case SD.DOWN:
			case SD.RIGHT:
			{
				windows.push(windows.shift())
			}
		}

		Main.activateWindow(windows[0])
	}

	function switch_workspace(actor, event)
	{
		if(Main.overview._workspacesDisplay._controls.hover) return
		Main.overview._workspacesDisplay._onScrollEvent(actor, event)
		Main.wm._workspaceSwitcherPopup.actor.hide()
	}

	function hide_overview(actor, event)
	{
		if(event.get_button() != 1) return
		Main.overview.hide()
	}

	function connect(actor, name, value)
	{
		events.push([actor, actor.connect(name, value)])
	}

	connect(Main.overview._group, 'button-release-event', hide_overview)
	connect(Main.overview._group, 'scroll-event', switch_workspace)
	connect(Main.panel._activities, 'scroll-event', switch_workspace)
	connect(Main.panel._activities, 'scroll-event', clear)
	connect(Main.panel._appMenu.actor, 'scroll-event', switch_window)
}

function disable()
{
	function disconnect(pair)
	{
		pair[0].disconnect(pair[1])
	}

	events.forEach(disconnect)
}
