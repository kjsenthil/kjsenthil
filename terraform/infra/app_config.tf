resource "azurerm_app_configuration" "app_config" {
  name                = "appconf-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location            = data.azurerm_resource_group.resource_group.location
  sku                 = "standard"

  tags = merge(var.tags, local.default_tags)
}
