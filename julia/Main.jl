using Revise
using Gtk, Graphics

Revise.includet("./Canvas.jl")
Revise.includet("./KeyLocations.jl")

aa = init_canvas()
c = aa[1]
win = aa[2]

show(c)

if !isinteractive()
  cc = Condition()
  signal_connect(win, :destroy) do widget
    notify(cc)
  end
  wait(cc)
end
