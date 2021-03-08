data "azurerm_api_management" "dev_apim" {
  name                = format("%s-%s-mgmt", local.environment, local.apim_name)
  resource_group_name = azurerm_resource_group.dev_resource_group.name
  depends_on          = [module.dev_apim]
}