module "cdn_profile" {
  source = "../modules/cdn_profile"

  name                = "cdn-gbl-${var.environment_prefix}-${var.app_name}"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  tags                = merge(var.tags, local.default_tags)
}
