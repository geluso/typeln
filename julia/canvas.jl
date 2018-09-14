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

function init_canvas()
  c = @GtkCanvas()
  win = GtkWindow(c, "Canvas", 676, 232, resizable=true)

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

  @guarded draw(c) do widget
    do_draw(c)
  end

  return [c, win]
end

function getr()
  return .5
end

function do_draw(c)
  ctx = getgc(c)
  h = height(c)
  w = width(c)

  println(h, "x", w)

  rectangle(ctx, 0, 0, w, h)
  set_source_rgb(ctx, getr(), getr(), getr())
  fill(ctx)

  aa = get_locations()
  locations = aa[1]
  percent_width = aa[2]

  size = w * percent_width * 2
  for key in locations
    xx = get(key, "x", 0) * w
    yy = get(key, "y", 0) * h

    println(key)
    println("xx: ", xx)
    println("yy: ", yy)

    rectangle(ctx, xx, yy, size, size)
    set_source_rgb(ctx, 0, 0, 0)
    stroke(ctx)
  end
end
