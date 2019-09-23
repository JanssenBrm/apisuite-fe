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



  local protocol = plugin_conf.sandbox_container_protocol
  local port = plugin_conf.sandbox_container_port
  local verify_ssl = not plugin_conf.https_ignore_ssl_verification

  local headers = ngx.req.get_headers()

  local organization_container = headers[plugin_conf.x_apisuite_organization_header]
  local stet_version = headers[plugin_conf.x_apisuite_stet_version_header]

  local proxyHeaders = {}
  local bypass = false
  for key, value in pairs(headers) do
    key = tostring(key)
    value = tostring(value)
    lowerKey = key:lower()

    local organization_header = plugin_conf.x_apisuite_organization_header:lower()
    local stet_header = plugin_conf.x_apisuite_stet_version_header:lower()

    -- Accept encoding header causes problems in the proxied response. Removed for now.
    if lowerKey ~= 'accept-encoding' then
      proxyHeaders[key] = value
    end

    if lowerKey == 'x-apisuite-scenario' then
	    bypass = true
    end
  end

  if bypass == true then
    return
  end

  local req_uri = ngx.var.request_uri
  local req_body

  if ngx.var.request_method == 'POST' or ngx.var.request_method == 'PUT' or ngx.var.request_method == 'PATCH' then
    ngx.req.read_body()
    req_body = ngx.req.get_body_data()
  end


  local sandbox_retry_timeout_in_seconds = 10
  if plugin_conf.sandbox_retry_timeout_in_seconds then
    sandbox_retry_timeout_in_seconds = plugin_conf.sandbox_retry_timeout_in_seconds
  end


  if not organization_container then
    ngx.status = ngx.HTTP_BAD_REQUEST
    ngx.say('Missing X-APISuite-Organization header')
    return ngx.exit(ngx.HTTP_BAD_REQUEST)
  end

  if not stet_version then
    ngx.status = ngx.HTTP_BAD_REQUEST
    ngx.say('Missing X-APISuite-Stet-Version header')
    return ngx.exit(ngx.HTTP_BAD_REQUEST)
  end

  local httpc = http.new()

  httpc:set_timeout(1000)


  local container_url = protocol .. "://" .. organization_container .. ":" .. port .. req_uri

  local res, err = httpc:request_uri(container_url, {
    method = ngx.var.request_method,
    ssl_verify = verify_ssl,
    body = req_body,
    headers = proxyHeaders,
  })

  if res then
    ngx.status = ngx.HTTP_OK
    ngx.header.content_type = "application/json; charset=utf-8"
    ngx.say(res.body)
    return ngx.exit(ngx.HTTP_OK)
  end

  if not res then

    httpc:set_timeout(10000)

    local manager_url = plugin_conf.container_manager_url .. plugin_conf.container_manager_spinup_action
    local res, err = httpc:request_uri(manager_url, {
      method = plugin_conf.container_manager_action_method,
      headers = {
        ["X-APISuite-Organization"] = organization_container,
        ["X-APISuite-Stet-Version"] = stet_version
      },
      ssl_verify = verify_ssl,
    })

    if not res then
      ngx.status = ngx.HTTP_SERVICE_UNAVAILABLE
      ngx.say("Failed to contact with the container manager")
      ngx.exit(ngx.HTTP_SERVICE_UNAVAILABLE)
    end


    httpc:set_timeout(2000)
    ngx.sleep(sandbox_retry_timeout_in_seconds)
    local fwd, fwderr = httpc:request_uri(container_url, {
      method = ngx.var.request_method,
      ssl_verify = verify_ssl,
      body = req_body,
      headers = proxyHeaders,
    })

    if not fwd then
      ngx.status = ngx.HTTP_SERVICE_UNAVAILABLE
      ngx.say("Error getting a result from the sandbox api")
      ngx.exit(ngx.HTTP_SERVICE_UNAVAILABLE)
    end

    ngx.status = ngx.HTTP_OK
    ngx.header.content_type = "application/json; charset=utf-8"
    ngx.say(fwd.body)

    return ngx.exit(ngx.HTTP_OK)

  end

  return
end

return _M
