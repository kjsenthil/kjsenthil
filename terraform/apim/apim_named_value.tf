resource "azurerm_api_management_named_value" "keyvault_baseurl" {
  name                = "keyvault-baseurl"
  resource_group_name = var.resource_group_name
  api_management_name = module.apim.name
  display_name        = "keyvault-baseurl"
  value               = module.key_vault.uri
}

resource "azurerm_api_management_named_value" "keyvault_secret_cache_duration" {
  name                = "keyvault-secret-cache-duration"
  resource_group_name = var.resource_group_name
  api_management_name = module.apim.name
  display_name        = "keyvault-secret-cache-duration"
  value               = 86400
}
