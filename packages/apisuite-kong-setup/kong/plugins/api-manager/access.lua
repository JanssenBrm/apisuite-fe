local http = require "resty.http"
local json = require "cjson.safe"
local singletons = require "kong.singletons"

local _M = {}

function split(s, delimiter)
  result = {};
  for match in (s..delimiter):gmatch("(.-)"..delimiter) do
      table.insert(result, match);
  end
  return result;
end

local function has_value (tab, val)
  for index, value in ipairs(tab) do
      if value == val then
          return true
      end
  end

  return false
end

function getBrandFromHost(host, allowed_brands, default_brand) 
  local subhosts = {}

  for i in string.gmatch(host, "%w+") do
    table.insert(subhosts, i)
  end

  local index = #subhosts - 1

  local b = subhosts[index]

  if not allowed_brands then
    return default_brand
  end

  if not b then
    return default_brand
  end

  if has_value(allowed_brands, b) then
    return b
  else
    return default_brand
  end

  return default_brand

end

function _M.execute(plugin_conf)
  local p = split(ngx.var.request_uri, "?")[1]
  local m = ngx.var.request_method

  -- IF THE BASE URL (for example api.sandbox) is not part of the host, then 
  -- this means that it is not a request to the sandbox, therefore we need to
  -- carry on with the request and ignore the rest of the code
  if not string.find(ngx.var.host, plugin_conf.products_base_url) then
    return
  end

  local brd = getBrandFromHost(ngx.var.host, plugin_conf.allowed_brands, plugin_conf.default_brand)

  local b = {
    path = p,
    method = m,
    brand = brd,
  }

  local api_manager_service = plugin_conf.api_manager_service

  local httpc = http.new()

  local res, err = httpc:request_uri(api_manager_service, {
    method = "POST",
    ssl_verify = false,
    body = json.encode(b),
  })

  if not res then
    ngx.status = ngx.HTTP_BAD_REQUEST
    ngx.say("API MANAGER WAS UNABLE TO PROCESS YOUR REQUEST.")
    ngx.exit(ngx.HTTP_BAD_REQUEST)
  end

  local res_status = res.status

  if res_status == 404 then
    ngx.status = res_status
    ngx.say("API MANAGER COULD NOT FIND THE REQUESTED API.")
    ngx.exit(res_status)
  end

  local data = json.decode(res.body)

  if not data then
    ngx.status = ngx.HTTP_BAD_REQUEST
    ngx.say("API MANAGER WAS UNABLE TO PROCESS YOUR REQUEST.")
    ngx.exit(ngx.HTTP_BAD_REQUEST)
  end

  if data.quarantine == true then
    ngx.status = plugin_conf.quarantine_http_code
    ngx.say(plugin_conf.quarantine_http_message)
    ngx.exit(plugin_conf.quarantine_http_code)
  end

  if data.visibility.lower() == "private" or data.visibility.lower() == "internal" then 
    ngx.status = plugin_conf.visibility_http_code
    ngx.say(plugin_conf.visibility_http_message)
    ngx.exit(plugin_conf.visibility_http_code)
  end

  return

end

return _M
