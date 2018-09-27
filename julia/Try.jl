using Revise

Revise.includet("./Example.jl")
while true
  Base.invokelatest(hello, "world")
  Revise.revise()
end
