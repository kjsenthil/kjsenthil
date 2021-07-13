data "azurerm_resource_group" "resource_group" {
  name = var.resource_group_name
}

data "azurerm_api_management" "apim" {
  name                = var.apim_name
  resource_group_name = data.azurerm_resource_group.resource_group.name
}

data "azurerm_virtual_network" "apim_vnet" {
  name                = var.apim_vnet_name
  resource_group_name = data.azurerm_resource_group.resource_group.name
}

data "azurerm_subnet" "apim_subnet" {
  name                 = var.apim_subnet_name
  resource_group_name  = data.azurerm_resource_group.resource_group.name
  virtual_network_name = data.azurerm_virtual_network.apim_vnet.name
}

data "azurerm_application_insights" "app_insights" {
  name                = var.app_insights_name
  resource_group_name = data.azurerm_resource_group.resource_group.name
}
