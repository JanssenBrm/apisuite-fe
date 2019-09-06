-- If you're not sure your plugin is executing, uncomment the line below and restart Kong
-- then it will throw an error which indicates the plugin is being loaded at least.

--assert(ngx.get_phase() == "timer", "The world is coming to an end!")


-- Grab pluginname from module name
local plugin_name = ({...})[1]:match("^kong%.plugins%.([^%.]+)")

-- load the base plugin object and create a subclass
local plugin = require("kong.plugins.base_plugin"):extend()
local access = require("kong.plugins." .. plugin_name .. ".access")

-- constructor
function plugin:new()
  plugin.super.new(self, plugin_name)
end

---[[ runs in the 'rewrite_by_lua_block' (from version 0.10.2+)
-- IMPORTANT: during the `rewrite` phase neither the `api` nor the `consumer` will have
-- been identified, hence this handler will only be executed if the plugin is 
-- configured as a global plugin!
function plugin:access(plugin_conf)
  plugin.super.access(self)
  access.execute(plugin_conf)
end --]]

-- set the plugin priority, which determines plugin execution order
plugin.PRIORITY = 9998 -- High Priority!

-- return our plugin object
return plugin
