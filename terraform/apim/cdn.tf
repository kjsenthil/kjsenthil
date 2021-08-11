//This will need to be removed once all the PRs using it have been closed down
module "cdn_profile" {
  source = "../modules/cdn_profile"

  name                = "cdn-gbl-${var.environment_prefix}-${var.app_name}"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  tags                = merge(var.tags, local.default_tags)
}

resource "azurerm_cdn_profile" "website" {
  name                = "cdn-gbl-${var.environment_prefix}-${var.app_name}-web"
  location            = "Global"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  sku                 = "Standard_Microsoft"
  tags                = merge(var.tags, local.default_tags)
}

resource "azurerm_cdn_profile" "storybook" {
  name                = "cdn-gbl-${var.environment_prefix}-${var.app_name}-sb"
  location            = "Global"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  sku                 = "Standard_Microsoft"
  tags                = merge(var.tags, local.default_tags)
}
