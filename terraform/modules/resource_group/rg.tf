resource "azurerm_resource_group" "resource_group" {
  name     = format("%s-%s-rg", var.environment, var.resource_group_name)
  location = var.location
}