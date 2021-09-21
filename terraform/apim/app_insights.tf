resource "azurerm_application_insights" "app_insights" {
  name                = "ai-${local.short_location}-${var.environment_prefix}-dh"
  resource_group_name = var.resource_group_name
  location            = var.location
  application_type    = "other"
  retention_in_days   = lookup(local.log_retention, var.environment_prefix)
  tags                = merge(var.tags, local.default_tags)
}