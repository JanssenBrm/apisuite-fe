local responses = require "kong.tools.responses"
local http = require "resty.http"
local singletons = require "kong.singletons"

local _M = {}

function starts_with(str, start)
  return str:sub(1, #start) == start
end

function has_value(tbl, val)

  for idx, value in ipairs(tbl) do
    if value == val then
      return true
    end 
  end

  return false
end

function _M.execute(plugin_conf)
  local headers = ngx.req.get_headers()

  local scenario_manager = headers[plugin_conf.x_openbank_scenario_header]
  local scenario_manager_service = plugin_conf.scenario_manager_service
  
  if not scenario_manager then
    return
  end

  local proxyHeaders = {}

  for key, value in pairs(headers) do
    key = tostring(key)
    value = tostring(value)
    lowerKey = key:lower()

    -- Accept encoding header causes problems in the proxied response. Removed for now.
    if lowerKey ~= 'accept-encoding' then
      proxyHeaders[key] = value
    end

  end

  local req_uri = ngx.var.request_uri
  local req_body
  
  if ngx.var.request_method == 'POST' or ngx.var.request_method == 'PUT' or ngx.var.request_method == 'PATCH' then
    ngx.req.read_body()
    req_body = ngx.req.get_body_data()
  end

  local httpc = http.new()
  local res, err = httpc:request_uri(scenario_manager_service .. req_uri, {
    method = ngx.var.request_method,
    ssl_verify = false,
    body = req_body,
    headers = proxyHeaders,
  })

  if res then
    
    if res.headers[plugin_conf.x_openbank_scenario_header] == -1 then
      ngx.header[plugin_conf.x_openbank_scenario_header] = nil
      return
    end
    
    if res.status == 404 then
      if res.body == nil or res.body == '' then
        return
      end
    end

    ngx.status = res.status
    ngx.header.content_type = "application/json; charset=utf-8"
    ngx.say(res.body)
    return ngx.exit(ngx.HTTP_OK)
  end

  return
end

return _M
