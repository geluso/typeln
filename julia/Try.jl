using Revise

Revise.includet("./Example.jl")
while true
  hello(9)
  Revise.revise()
end
