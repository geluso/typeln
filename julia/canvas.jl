using Gtk, Graphics
c = @GtkCanvas()
win = GtkWindow(c, "Canvas", 400, 200, resizable=true)
@guarded draw(c) do widget
  ctx = getgc(c)
  h = height(c)
  w = width(c)

  println(h, "x", w)

  # Paint red rectangle
  rectangle(ctx, 0, 0, w, h/2)
  set_source_rgb(ctx, 1, 0, 0)
  fill(ctx)

  # Paint blue rectangle
  rectangle(ctx, 0, 3h/4, w, h/4)
  set_source_rgb(ctx, 0, 0, 1)
  fill(ctx)

  # green rect
  rectangle(ctx, w/4, h/4, w/2, h/2)
  set_source_rgb(ctx, 0, 1, 0)
  stroke(ctx)
end

show(c)

is_pressing = false
x_down = -1
y_down = -1
x_pos = -1
y_pos = -1
x_up = -1
y_up = -1

function report_state(label)
  println(label, is_pressing, x_down, y_down, x_pos, y_pos, x_up, y_up)
end

c.mouse.button1press = @guarded (widget, event) -> begin
  global is_pressing = true
  global x_down = event.x
  global y_down = event.y
  report_state("press")
end

c.mouse.motion = @guarded (widget, event) -> begin
  println(typeof(event.x))
  global x_pos = event.x
  global y_pos = event.y
  report_state("move")
end

c.mouse.button1release = @guarded (widget, event) -> begin
  global is_pressing = false
  global x_down = event.x
  global y_down = event.y
  report_state("release")
end

if !isinteractive()
  cc = Condition()
  signal_connect(win, :destroy) do widget
    notify(cc)
  end
  wait(cc)
end
