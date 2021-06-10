resource "azurerm_application_insights" "app_insights" {
  name                = "ai-${local.short_location}-${var.environment_prefix}-dh-apim"
  resource_group_name = var.resource_group_name
  location            = var.location
  application_type    = "other"
  tags                = merge(var.tags, local.default_tags)
}