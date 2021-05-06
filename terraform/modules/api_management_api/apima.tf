resource "azurerm_api_management_api" "api" {
  name                  = var.name
  resource_group_name   = var.resource_group_name
  api_management_name   = var.api_management_name
  revision              = var.revision
  display_name          = var.name
  path                  = var.path
  protocols             = var.protocols
  subscription_required = var.subscription_required
  description           = var.description
}