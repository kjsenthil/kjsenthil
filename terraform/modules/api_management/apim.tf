resource "azurerm_api_management" "api" {
  name                = var.name
  resource_group_name = var.resource_group_name
  location            = var.location
  publisher_name      = var.publisher_name
  publisher_email     = var.publisher_email
  sku_name            = var.api_management_sku_name
  tags                = merge(map("tf_module_path", "./terraform/modules/api_management"), var.tags)

  virtual_network_type = "External"
  virtual_network_configuration {
    subnet_id = var.external_subnet_id
  }

  lifecycle {
    prevent_destroy = false
  }
}
