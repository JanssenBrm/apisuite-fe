
return {
  no_consumer = true, -- this plugin is available on APIs as well as on Consumers,
  fields = {
    x_openbank_organization_header = { type = "string", required = true},
    x_openbank_stet_version_header = { type = "string", required = true},
    sandbox_container_protocol = { type = "string", required = false, enum = { "http", "https"} , default = "https"},
    sandbox_container_port = { type = "number", required = false, default = 3000},
    sandbox_container_health_check_path = { type = "string", required = true},
    container_manager_url = { type = "string", required = true},
    container_manager_spinup_action = { type = "string", required = true},
    container_manager_action_method = { type = "string", required = true},
    sandbox_retry_timeout_in_seconds = { type = "number", required = false },
    https_ignore_ssl_verification = { type= "boolean", required = true, default = false },
    fail_on_brand_missing = { type = "boolean",required = false, default = false},
    default_brand = { type = "string", required = false, default = "bnppf"},
  },
  self_check = function(schema, plugin_t, dao, is_updating)
    -- perform any custom verification
    return true
  end
}
