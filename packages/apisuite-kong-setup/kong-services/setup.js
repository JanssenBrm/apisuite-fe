const axios = require('axios')
const kongAdminUrl = process.env.KONG_ADMIN_URL || 'http://kong-api-gateway:8001'

const UPSERT_SERVICE = {
    path: '/services/',
    method: 'POST',
}


const createStaticServices = async ( ...payloads ) => {

    payloads.forEach(async (payload)=>{
        console.log(`Creating Kong Service: ${payload.service.name}`)
        const baseUrl = `${kongAdminUrl}${UPSERT_SERVICE.path}`
        console.log(baseUrl)
    
        let response
        try {
            response = await axios.post(`${baseUrl}`,
    
            payload.service) 
        } catch (e) {
            console.log(`[${payload.service.name}] already exists. Skipping this service configuration`)
            return
        }
        
    
        if (response && response.status === 201) {
            const serviceId = response.data.id
            console.log(`Creating route for kong service: ${payload.service.name}`)
            const {routeRes, routeErr} = 
                    await axios.post(`${baseUrl}${payload.service.name}/routes`, payload.route)
            

            if (payload.transform_plugin) {
                console.log(`Enabling Request Transform Advanced on this service`)
    
                const  {pluginRes, pluginErr} = 
                        await axios.post(`${baseUrl}${payload.service.name}/plugins`,{
                            name : "request-transformer-advanced",
                            config: {
                                replace: {
                                    uri: `${payload.service.path}/$(uri_captures.action)`
                                }
                            }
                        })
            }

        }
    })
}

const createDemoSandboxes = async (...payloads) => {

    payloads.forEach(async (payload) => {
        const baseUrl = `${kongAdminUrl}/upstreams/`
        createStaticServices(payload)

        console.log(`Creating Upstream for ${payload.service.name}`)
        let response
        try {

            response = await axios.post(`${baseUrl}`,payload.upstream)
            
            if (response  && response.status === 201) {

                payload.targets.forEach(async (target) => {
                    try {
                        const { res, err} = await axios.post(`${baseUrl}${payload.upstream.name}/targets/`, target)

                        if (err) {
                            console.log(`Error creating the upstream target ${target.url}`)
                        }    
                    } catch (error) {
                        console.log(error.message)
                    }
                    
                })
            }
        } catch (error) {
            console.log(error.message)
            return
        }
    })
}

const enableGlobalPlugins = async (...payloads) => {
payloads.forEach( async(payload) => {
        
    try {
        const {res, err} = await axios.post(`${kongAdminUrl}/plugins`, payload.plugin)
    } catch (error) {
     console.log(error.message) 
    }
})
}

const authServer = {
    service: {
        name: "openbank-auth-server",
        url: "http://openbank_auth_server:3000",
    },
    transform_plugin: true,
    route: {
        protocols: ['http', 'https'],
        methods: ['GET', 'POST', 'PUT'],
        paths: ['/auth-server/(?<action>.*)'],
        strip_path: false,
        preserve_host: false,
    }
}

const resourceServer = {
    service: {
        name: "openbank-resource-server",
        url: "http://openbank_resource_server:3000",
    },
    transform_plugin: true,
    route: {
        protocols: ['http', 'https'],
        methods: ['GET', 'POST', 'PUT'],
        paths: ['/resource-server/(?<action>.*)'],
        strip_path: false,
        preserve_host: false,
    }
}

const apiGenerator = {
    service: {
        name: "openbank-api-generator",
        url: "http://openbank_api_generator:3000",
    },
    transform_plugin: true,
    route: {
        protocols: ['http', 'https'],
        methods: ['GET', 'POST', 'PUT'],
        paths: ['/generator/(?<action>.*)'],
        strip_path: false,
        preserve_host: false,
    }
}

const containerManager = {
    service: {
        name: "openbank-container-manager",
        url: "http://openbank_container_manager:3000",
    },
    transform_plugin: true,
    route: {
        protocols: ['http', 'https'],
        methods: ['GET', 'POST', 'PUT'],
        paths: ['/manager/(?<action>.*)'],
        strip_path: false,
        preserve_host: false,
    }
}

const demoOrg = {
    service: {
        name: "openbank-demo-org",
        url: "http://openbank_demo_org:3000",
    },
    transform_plugin: false,
    route: {
        protocols: ["http", "https"],
        methods: ["GET", "POST", "PUT"],
        paths: ['/accounts'],
        strip_path: false,
        preserve_host: false,
        hosts: ["openbank_demo_org"]
    },
    upstream: {
        name: "openbank_demo_org",
        slots: 10,
        healthchecks : {

            active: {
                timeout : 1,
                http_path:"/health",
                healthy: {
                    interval: 5,
                    successes: 1,
                    http_statuses: [404,200,302]
                },
                unhealthy: {
                    http_failures: 1,
                    http_statuses: [502,503],
                    tcp_failures: 1,
                    timeouts: 1,
                    interval: 5,
                }
            }
        }
    },
    targets: [
        {
            target: "openbank_demo_org:3000",
            weight: 1000
        },
        {
            target: "openbank_container_manager:3000",
            weight: 1
        },

    ]
}

const headerUpstreamPlugin = { 
    plugin : {
        name: 'header-upstream',
        config: {
            source_header: 'X-OpenBank-Organization',
            target_header: 'Host'
        }
    }
}

createStaticServices(authServer, resourceServer, apiGenerator, containerManager)

createDemoSandboxes(demoOrg)



enableGlobalPlugins(headerUpstreamPlugin)