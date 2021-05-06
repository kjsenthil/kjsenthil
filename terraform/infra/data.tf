data "azurerm_resource_group" "resource_group" {
  name = var.resource_group_name
}

data "azurerm_api_management" "apim" {
  name                = var.apim_name
  resource_group_name = data.azurerm_resource_group.resource_group.name
}
