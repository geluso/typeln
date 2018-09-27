using Revise

is_reporting_state = false
is_pressing = false
x_down = -1
y_down = -1
x_pos = -1
y_pos = -1
x_up = -1
y_up = -1
coords = []

function report_state(label)
  if is_reporting_state
    println(label, is_pressing, x_down, y_down, x_pos, y_pos, x_up, y_up)
  end
end

function handle_press(widget, event)
  global is_pressing = true
  global x_down = event.x
  global y_down = event.y

  push!(coords, [x_down, y_down])

  report_state("press")
  @guarded draw(c) do widget
    Revise.revise()
    Base.invokelatest(do_draw, c)
  end
end

function handle_move(widget, event)
  global x_pos = event.x
  global y_pos = event.y
  report_state("move")

  if is_pressing
    push!(coords, [x_pos, y_pos])
  end

  @guarded draw(c) do widget
    Revise.revise()
    Base.invokelatest(do_draw, c)
  end
end

function handle_up(widget, event)
  global is_pressing = false
  global x_down = event.x
  global y_down = event.y
  report_state("release")

  global coords = []

  @guarded draw(c) do widget
    Revise.revise()
    Base.invokelatest(do_draw, c)
  end
end

function init_canvas()
  c = @GtkCanvas()
  win = GtkWindow(c, "Canvas", 676, 232, resizable=true)

  c.mouse.button1press = @guarded (widget, event) -> begin
    handle_press(widget, event)
  end

  c.mouse.motion = @guarded (widget, event) -> begin
    handle_move(widget, event)
  end

  c.mouse.button1release = @guarded (widget, event) -> begin
    handle_up(widget, event)
  end

  @guarded draw(c) do widget
      Revise.revise()
      Base.invokelatest(do_draw, c)
  end

  return [c, win]
end

function getr()
  return .0
end

function getg()
  return .8
end

function getb()
  return .9
end

function do_draw(c)
  ctx = getgc(c)
  h = height(c)
  w = width(c)

  rectangle(ctx, 0, 0, w, h)

  Revise.revise()
  r = Base.invokelatest(getr)
  g = Base.invokelatest(getg)
  b = Base.invokelatest(getb)
  set_source_rgb(ctx, r, g, b)
  fill(ctx)

  aa = get_locations()
  locations = aa[1]
  percent_width = aa[2]

  size = w * percent_width * 2
  for key in locations
    xx = get(key, "x", 0) * w
    yy = get(key, "y", 0) * h

    rectangle(ctx, xx, yy, size, size)
    set_source_rgb(ctx, 0, 0, 0)
    stroke(ctx)
  end

  if length(coords) > 1
    move_to(ctx, coords[1][1], coords[1][2])
    for coord in coords 
      line_to(ctx, coord[1], coord[2])
    end
    stroke(ctx)
  end
end
