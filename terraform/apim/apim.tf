module "apim" {
  source                  = "../modules/api_management"
  name                    = "apim-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  resource_group_name     = data.azurerm_resource_group.resource_group.name
  location                = data.azurerm_resource_group.resource_group.location
  api_management_sku_name = "Developer_1"
  external_subnet_id      = azurerm_subnet.apim_external_subnet.id
  tags                    = merge(local.default_tags, var.tags)
}
