module "apima" {
  source                           = "../modules/api_management_api"
  name                             = "${var.environment_prefix}-${var.app_name}"
  resource_group_name              = data.azurerm_resource_group.resource_group.name
  api_management_name              = data.azurerm_api_management.apim.name
  display_name                     = "${var.environment_prefix}-${var.app_name}"
  revision                         = 1
  path                             = var.environment_prefix
  protocols                        = ["https"]
  subscription_required            = false
  description                      = "${var.app_name} API."
  api_management_logger_name       = "apim-${local.short_location}-${var.environment_prefix}-logger"
  app_insights_id                  = data.azurerm_application_insights.app_insights.id
  app_insights_instrumentation_key = data.azurerm_application_insights.app_insights.instrumentation_key
}

module "api_operation" {
  source              = "../modules/api_operation"
  for_each            = local.api_definitions
  apima_name          = module.apima.name
  apim_name           = data.azurerm_api_management.apim.name
  resource_group_name = data.azurerm_resource_group.resource_group.name
  operation_id        = lookup(each.value, "operation_id", null)
  display_name        = lookup(each.value, "display_name", null)
  method              = lookup(each.value.policy.cors, "method", null)
  url_template        = lookup(each.value, "url_template", null)
  description         = lookup(each.value, "description", null)
  path_params         = lookup(each.value, "path_params", [])
  is_mock             = false
}

module "api_management_policy" {
  source              = "../modules/api_management_policy"
  for_each            = local.api_definitions
  apima_name          = module.apima.name
  apim_name           = data.azurerm_api_management.apim.name
  resource_group_name = data.azurerm_resource_group.resource_group.name
  operation_id        = lookup(each.value, "operation_id", null)
  xml_policy_file = templatefile("../modules/policy_documents/api_operation_policy.xml", {
    config = {
      backend_url          = lookup(local.api_backends, lookup(each.value.policy, "backend_url", ""), null),
      backend_id           = lookup(each.value.policy, "backend_id", null),
      cors_allowed_method  = lookup(each.value.policy.cors, "method", null),
      cors_allowed_headers = lookup(each.value.policy.cors, "headers", null),
      cors_exposed_headers = lookup(each.value.policy.cors, "expose_headers", null),
      cors_allowed_origins = coalescelist(
        lookup(each.value.policy.cors, "allowed_origins", []),
        [
          local.is_prod ? "https://my.bestinvest.co.uk" : "",
          local.is_staging ? "https://my.demo2.bestinvest.co.uk" : "",
          !local.is_prod ? "http://localhost:8000" : "",
          !local.is_prod ? module.front_end.web_endpoint : "",
          "https://${local.website_hostname}",
          local.is_dev ? "https://${module.front_end.web_host}" : "",
          local.is_not_dev ? "https://fd-gbl-${var.environment_prefix}-dh.azurefd.net" : "",
        ]
      ),
      allow-credentials    = lookup(each.value.policy.cors, "allow-credentials", false),
      headers              = lookup(each.value.policy, "set_header", null),
      outbound_headers     = lookup(each.value.policy, "outbound_headers", null),
      rewrite_url          = lookup(each.value.policy, "rewrite_url", null),
      variables            = lookup(each.value.policy, "set_variable", null),
      authentication-basic = lookup(each.value.policy, "authentication-basic", null)
    }
  })
  depends_on = [module.api_operation, module.function_app_projections]
}


module "api_operation_xplan" {
  source              = "../modules/api_operation"
  for_each            = local.xplan_api_definitions
  apima_name          = module.apima.name
  apim_name           = data.azurerm_api_management.apim.name
  resource_group_name = data.azurerm_resource_group.resource_group.name
  operation_id        = lookup(each.value, "operation_id", null)
  display_name        = lookup(each.value, "display_name", null)
  method              = lookup(each.value.policy.cors, "method", null)
  url_template        = lookup(each.value, "url_template", null)
  description         = lookup(each.value, "description", null)
  path_params         = lookup(each.value, "path_params", [])
  is_mock             = false
}

module "api_management_policy_xplan" {
  source              = "../modules/api_management_policy"
  for_each            = local.xplan_api_definitions
  apima_name          = module.apima.name
  apim_name           = data.azurerm_api_management.apim.name
  resource_group_name = data.azurerm_resource_group.resource_group.name
  operation_id        = lookup(each.value, "operation_id", null)
  xml_policy_file = templatefile("../modules/policy_documents/api_operation_policy_xplan.xml", {
    config = {
      backend_url          = lookup(local.api_backends, lookup(each.value.policy, "backend_url", ""), null),
      backend_id           = lookup(each.value.policy, "backend_id", null),
      cors_allowed_method  = lookup(each.value.policy.cors, "method", null),
      cors_allowed_headers = lookup(each.value.policy.cors, "headers", null),
      cors_exposed_headers = lookup(each.value.policy.cors, "expose_headers", null),
      cors_allowed_origins = coalescelist(
        lookup(each.value.policy.cors, "allowed_origins", []),
        [
          !local.is_prod ? "http://localhost:8000" : "",
          !local.is_prod ? module.front_end.web_endpoint : "",
          "https://${local.website_hostname}",
          local.is_dev ? "https://${module.front_end.web_host}" : "",
          local.is_not_dev ? "https://fd-gbl-${var.environment_prefix}-dh.azurefd.net" : "",
        ]
      ),
      allow-credentials    = lookup(each.value.policy.cors, "allow-credentials", false),
      headers              = lookup(each.value.policy, "set_header", null),
      outbound_headers     = lookup(each.value.policy, "outbound_headers", null),
      rewrite_url          = lookup(each.value.policy, "rewrite_url", null),
      variables            = lookup(each.value.policy, "set_variable", null),
      authentication-basic = lookup(each.value.policy, "authentication-basic", null),
      validate_request     = lookup(each.value.policy, "validate_request", null),
      validate_request_url = replace(lookup(lookup(each.value.policy, "validate_request", {}), "url", ""), "{{function-app-baseurl}}", local.api_backends.projections_function_app),
      body                 = lookup(each.value.policy, "body", null)
    }
  })
  depends_on = [module.api_operation, module.function_app_projections]
}

module "myaccounts_apis_requiring_guest_login" {
  source              = "../modules/api_operation"
  for_each            = local.myaccount_endpoints_requiring_guest_auth
  apima_name          = module.apima.name
  apim_name           = data.azurerm_api_management.apim.name
  resource_group_name = data.azurerm_resource_group.resource_group.name
  operation_id        = lookup(each.value, "operation_id", null)
  display_name        = lookup(each.value, "display_name", null)
  method              = lookup(each.value.policy.cors, "method", null)
  url_template        = lookup(each.value, "url_template", null)
  description         = lookup(each.value, "description", null)
  path_params         = lookup(each.value, "path_params", [])
  is_mock             = false
}


module "myaccounts_apis_requiring_guest_login_policy" {
  source              = "../modules/api_management_policy"
  for_each            = local.myaccount_endpoints_requiring_guest_auth
  apima_name          = module.apima.name
  apim_name           = data.azurerm_api_management.apim.name
  resource_group_name = data.azurerm_resource_group.resource_group.name
  operation_id        = lookup(each.value, "operation_id", null)
  xml_policy_file = templatefile("../modules/policy_documents/myaccount_guest_auth_flow.xml", {
    config = {
      backend_url = lookup(local.api_backends, lookup(each.value.policy, "backend_url", ""), null),
      backend_id  = lookup(each.value.policy, "backend_id", null),
      rewrite_uri = lookup(each.value, "url_template", null),
      auth_url    = "${local.apim_base_url}/Auth/token"
    }
  })
  depends_on = [module.myaccounts_apis_requiring_guest_login]
}

module "front_end" {
  source                   = "../modules/static_website_with_cdn"
  storage_account_name     = "st${local.short_location}tsw${var.environment_prefix}dh"
  resource_group_name      = data.azurerm_resource_group.resource_group.name
  location                 = data.azurerm_resource_group.resource_group.location
  account_kind             = "StorageV2"
  account_replication_type = "GRS"
  account_tier             = "Standard"
  cdn_profile_name         = var.cdn_profile_website_name
  dns_resource_group_name  = var.dns_resource_group_name

  csp_allowed_script_sources = "'self' 'unsafe-inline' *.tiqcdn.com *.tealiumiq.com *.googletagmanager.com *.hotjar.com *.google-analytics.com"
  csp_allowed_style_sources  = "'self' 'unsafe-inline'"

  tags = merge(var.tags, local.default_tags)
}

module "storybook" {
  count                    = !local.is_prod ? 1 : 0
  source                   = "../modules/static_website_with_cdn"
  storage_account_name     = "st${local.short_location}tsw${var.environment_prefix}dhsb"
  resource_group_name      = data.azurerm_resource_group.resource_group.name
  location                 = data.azurerm_resource_group.resource_group.location
  account_kind             = "StorageV2"
  account_replication_type = "GRS"
  account_tier             = "Standard"
  cdn_profile_name         = var.cdn_profile_storybook_name

  csp_allowed_script_sources = "'self' 'unsafe-inline' 'unsafe-eval' *.tiqcdn.com *.tealiumiq.com *.googletagmanager.com *.hotjar.com *.google-analytics.com"
  csp_allowed_style_sources  = "'self' 'unsafe-inline'"

  tags = merge(var.tags, local.default_tags)
}

module "api_functions_asp" {
  source              = "../modules/app_service_plan"
  name                = "asp-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location            = data.azurerm_resource_group.resource_group.location
  kind                = "FunctionApp"
  tier                = "Dynamic"
  size                = "Y1"
  reserved            = true
  tags                = local.default_tags
}

module "mocked_response_api_operation" {
  source              = "../modules/api_operation"
  apima_name          = module.apima.name
  apim_name           = data.azurerm_api_management.apim.name
  resource_group_name = data.azurerm_resource_group.resource_group.name
  operation_id        = "get-endpoints"
  display_name        = "get-endpoints"
  method              = "GET"
  url_template        = "/endpoints"
  description         = "Returns a JSON object with all the API endpoints."
  path_params         = []
  is_mock             = true
  mock_sample         = jsonencode(local.api_endpoints)
  depends_on          = [module.api_operation]
}

module "mocked_response_api_operation_policy" {
  source              = "../modules/api_management_policy"
  apima_name          = module.apima.name
  apim_name           = data.azurerm_api_management.apim.name
  resource_group_name = data.azurerm_resource_group.resource_group.name
  operation_id        = module.mocked_response_api_operation.operation_id
  xml_policy_file     = file("../modules/policy_documents/api_operation_mocked_response_policy.xml")
  depends_on          = [module.mocked_response_api_operation]
}

module "function_app_projections" {
  source                           = "../modules/function_app_node"
  resource_group_name              = data.azurerm_resource_group.resource_group.name
  location                         = data.azurerm_resource_group.resource_group.location
  app_service_plan_id              = module.api_functions_asp.id
  name                             = "fun-${local.short_location}-${var.environment_prefix}-${var.app_name}-projections"
  storage_account_prefix           = "st${local.short_location}tsw${var.environment_prefix}"
  app_code_path                    = var.projections_function_app_code_path
  os_type                          = "linux"
  node_version                     = "12.9"
  subnet_id                        = data.azurerm_subnet.apim_subnet.id
  app_insights_instrumentation_key = data.azurerm_application_insights.app_insights.instrumentation_key
  tags                             = local.default_tags
}

module "function_app_features" {
  count                            = local.is_not_dev ? 1 : 0
  source                           = "../modules/function_app_node"
  resource_group_name              = data.azurerm_resource_group.resource_group.name
  location                         = data.azurerm_resource_group.resource_group.location
  app_service_plan_id              = module.api_functions_asp.id
  name                             = "fun-${local.short_location}-${var.environment_prefix}-${var.app_name}-features"
  storage_account_prefix           = "st${local.short_location}tsw${var.environment_prefix}"
  app_code_path                    = var.features_function_app_code_path
  os_type                          = "linux"
  node_version                     = "12.9"
  subnet_id                        = data.azurerm_subnet.apim_subnet.id
  app_insights_instrumentation_key = data.azurerm_application_insights.app_insights.instrumentation_key
  app_settings = {
    APP_CONFIG_INSTANCE_URL     = azurerm_app_configuration.app_config[0].endpoint
    APP_CONFIG_READ_ONLY_KEY_ID = azurerm_app_configuration.app_config[0].primary_read_key[0].id
    APP_CONFIG_READ_ONLY_SECRET = azurerm_app_configuration.app_config[0].primary_read_key[0].secret
  }
  tags = local.default_tags
}

module "function_app_returns" {
  source                           = "../modules/function_app_node"
  resource_group_name              = data.azurerm_resource_group.resource_group.name
  location                         = data.azurerm_resource_group.resource_group.location
  app_service_plan_id              = module.api_functions_asp.id
  name                             = "fun-${local.short_location}-${var.environment_prefix}-${var.app_name}-returns"
  storage_account_prefix           = "st${local.short_location}tsw${var.environment_prefix}"
  app_code_path                    = var.returns_function_app_code_path
  os_type                          = "linux"
  node_version                     = "12.9"
  subnet_id                        = data.azurerm_subnet.apim_subnet.id
  app_insights_instrumentation_key = data.azurerm_application_insights.app_insights.instrumentation_key
  tags                             = local.default_tags
}

resource "azurerm_dashboard" "application_metrics_dashboard" {
  count               = local.is_not_dev ? 1 : 0
  name                = "${var.environment_prefix}-${var.app_name}-application-metrics-dashboard"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location            = data.azurerm_resource_group.resource_group.location
  tags                = local.default_tags
  dashboard_properties = templatefile("../modules/dashboard_schema/dashboard-schema.json",
    {
      apim_name      = data.azurerm_api_management.apim.name,
      apim_id        = data.azurerm_api_management.apim.id,
      ai_id          = data.azurerm_application_insights.app_insights.id,
      ai_name        = data.azurerm_application_insights.app_insights.name,
      cdn_web_id     = data.azurerm_cdn_profile.cdn_profile_website.id
      cdn_web_name   = var.cdn_profile_website_name
      dashboard_name = "${var.environment_prefix}-${var.app_name}-application-metrics-dashboard"
  })
}
