module "apima" {
  source                = "../modules/api_management_api"
  name                  = "${var.environment_prefix}-${var.app_name}"
  resource_group_name   = data.azurerm_resource_group.resource_group.name
  api_management_name   = data.azurerm_api_management.apim.name
  display_name          = "${var.environment_prefix}-${var.app_name}"
  revision              = 1
  path                  = var.environment_prefix
  protocols             = ["https"]
  subscription_required = false
  description           = "${var.app_name} API."
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
      backend_url          = lookup(local.api_backends, lookup(each.value.policy, "backend_url", null), null),
      cors_allowed_method  = lookup(each.value.policy.cors, "method", null),
      cors_allowed_headers = lookup(each.value.policy.cors, "headers", null),
      cors_exposed_headers = lookup(each.value.policy.cors, "expose_headers", null),
      cors_allowed_origins = coalescelist(lookup(each.value.policy.cors, "allowed_origins", []), ["http://localhost:8000", module.static_website_storage_account.primary_web_endpoint]),
      allow-credentials    = lookup(each.value.policy.cors, "allow-credentials", false),
      headers              = lookup(each.value.policy, "set_header", null),
      outbound_headers     = lookup(each.value.policy, "outbound_headers", null),
      rewrite_url          = lookup(each.value.policy, "rewrite_url", null)
    }
  })
  depends_on = [module.api_operation, module.function_app_projections]
}

module "static_website_storage_account" {
  source                   = "../modules/static_website_storage_account"
  storage_account_name     = "st${local.short_location}tsw${var.environment_prefix}dh"
  resource_group_name      = data.azurerm_resource_group.resource_group.name
  location                 = data.azurerm_resource_group.resource_group.location
  account_kind             = "StorageV2"
  account_replication_type = "GRS"
  account_tier             = "Standard"
  tags                     = local.default_tags
}

module "storybook_storage_account" {
  count                    = var.environment_prefix == "staging" ? 0 : 1
  source                   = "../modules/static_website_storage_account"
  storage_account_name     = "st${local.short_location}tsw${var.environment_prefix}dhsb"
  resource_group_name      = data.azurerm_resource_group.resource_group.name
  location                 = data.azurerm_resource_group.resource_group.location
  account_kind             = "StorageV2"
  account_replication_type = "GRS"
  account_tier             = "Standard"
  tags                     = local.default_tags
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
  source                 = "../modules/function_app_node"
  resource_group_name    = data.azurerm_resource_group.resource_group.name
  location               = data.azurerm_resource_group.resource_group.location
  app_service_plan_id    = module.api_functions_asp.id
  name                   = "fun-${local.short_location}-${var.environment_prefix}-${var.app_name}-projections"
  storage_account_prefix = "st${local.short_location}tsw${var.environment_prefix}"
  app_code_path          = var.projections_function_app_code_path
  os_type                = "linux"
  node_version           = "12.9"
  subnet_id              = data.azurerm_subnet.apim_subnet.id
  tags                   = local.default_tags
}
