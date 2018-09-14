import JSON

function get_locations()
  jj = JSON.parse(String(read("key_locations.json")))
  percent_width = get(jj, "percent_width", Float64) / 100.0
  locations = get(jj, "locations", [])
  return [locations, percent_width]
end
