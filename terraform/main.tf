resource "azurerm_resource_group" "webapp" {
  name     = var.resource_group_name
  location = var.location
}