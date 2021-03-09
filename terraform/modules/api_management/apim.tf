resource "azurerm_api_management" "api" {
  name                = format("%s-%s-mgmt", var.environment, var.api_management_name)
  resource_group_name = var.resource_group_name
  location            = var.location
  publisher_name      = var.publisher_name
  publisher_email     = var.publisher_email
  sku_name            = var.api_management_sku_name
}