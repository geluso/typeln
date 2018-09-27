using Revise

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
    @guarded draw(c) do widget
      Revise.revise()
      Base.invokelatest(do_draw, c)
    end
  end

  c.mouse.motion = @guarded (widget, event) -> begin
    global x_pos = event.x
    global y_pos = event.y
    report_state("move")
    @guarded draw(c) do widget
      Revise.revise()
      Base.invokelatest(do_draw, c)
    end
  end

  c.mouse.button1release = @guarded (widget, event) -> begin
    global is_pressing = false
    global x_down = event.x
    global y_down = event.y
    report_state("release")
    @guarded draw(c) do widget
      Revise.revise()
      Base.invokelatest(do_draw, c)
    end
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
  return .0
end

function do_draw(c)
  ctx = getgc(c)
  h = height(c)
  w = width(c)

  println(h, "x", w)
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
end
