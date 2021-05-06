resource "azurerm_resource_group" "resource_group" {
  name     = "rg-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  location = var.location
  tags     = merge(local.default_tags, var.tags)
}
