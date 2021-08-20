resource "azurerm_api_management_named_value" "keyvault_baseurl" {
  name                = "keyvault-baseurl"
  resource_group_name = var.resource_group_name
  api_management_name = module.apim.name
  display_name        = "keyvault-baseurl"
  value               = module.key_vault.private_uri
}

resource "azurerm_api_management_named_value" "keyvault_secret_cache_duration" {
  name                = "keyvault-secret-cache-duration"
  resource_group_name = var.resource_group_name
  api_management_name = module.apim.name
  display_name        = "keyvault-secret-cache-duration"
  value               = 86400
}

resource "azurerm_api_management_named_value" "xplan_app_id" {
  name                = "xplan-app-id"
  resource_group_name = var.resource_group_name
  api_management_name = module.apim.name
  display_name        = "xplan-app-id"
  value               = var.xplan_app_id
}

resource "azurerm_api_management_named_value" "xplan_baseurl" {
  name                = "xplan-baseurl"
  resource_group_name = var.resource_group_name
  api_management_name = module.apim.name
  display_name        = "xplan-baseurl"
  value               = var.api_backends.xplan-api.url
}

