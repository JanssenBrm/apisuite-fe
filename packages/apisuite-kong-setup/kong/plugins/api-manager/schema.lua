
return {
  no_consumer = true, -- this plugin is available on APIs as well as on Consumers,
  fields = {
    allowed_brands = { type = "array", default = {"bnpparibasfortis", "hellobank", "fintro"} },
    default_brand = { type = "string", default = "bnpparibasfortis"},
    api_manager_service = { type = "string", required = true },
    products_base_url = { type = "string", required = true },
    quarantine_http_code = { type = "number", default = 423},
    quarantine_http_message = { type = "string", default = "The Requested API is marked as Quarantined."},
    visibility_http_code = { type = "number", default = 423},
    visibility_http_message = { type = "string", default = "The Requested API is marked as not Public."},
  },
  self_check = function(schema, plugin_t, dao, is_updating)
    -- perform any custom verification
    return true
  end
}
