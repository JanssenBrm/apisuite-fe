
return {
  no_consumer = true, -- this plugin is available on APIs as well as on Consumers,
  fields = {
    x_apisuite_scenario_header = { type = "string", required = true},
    scenario_manager_service = { type = "string", required = true },
  },
  self_check = function(schema, plugin_t, dao, is_updating)
    -- perform any custom verification
    return true
  end
}
