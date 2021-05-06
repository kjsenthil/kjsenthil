data "azurerm_api_management" "dev_apim" {
  name                = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.dev_resource_group.name
}