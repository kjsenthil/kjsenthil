resource "azurerm_cdn_profile" "this" {
  name                = var.name
  location            = "Global"
  resource_group_name = var.resource_group_name
  sku                 = "Standard_Microsoft"

  tags = var.tags
}
