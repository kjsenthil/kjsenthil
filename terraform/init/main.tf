resource "azurerm_resource_group" "resource_group" {
  name     = "rg-${local.short_location}-${var.environment}-tfstates-dh"
  location = var.location
  tags     = local.default_tags
}

resource "azurerm_storage_account" "storage_account" {
  name                     = "st${local.short_location}tsw${var.environment}tfstatesdh"
  resource_group_name      = azurerm_resource_group.resource_group.name
  location                 = azurerm_resource_group.resource_group.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
  tags                     = local.default_tags
}

resource "azurerm_storage_container" "container" {
  for_each = var.containers
  name                  = each.key
  storage_account_name  = azurerm_storage_account.storage_account.name
  container_access_type = "private"
}
