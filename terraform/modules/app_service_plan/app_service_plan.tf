resource "azurerm_app_service_plan" "asp" {
  name                = var.name
  resource_group_name = var.resource_group_name
  location            = var.location
  kind                = var.kind
  reserved            = var.reserved
  tags                = merge(map("tf_module_path", "./terraform/modules/app_service_plan"), var.tags)
  sku {
    tier = var.tier
    size = var.size
  }
}
