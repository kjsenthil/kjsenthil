resource "azurerm_resource_group" "resource_group" {
  for_each = var.config
  name     = "rg-ukw-${var.environment}-${each.value.resource_group_name}-dh"
  location = local.location
  tags     = local.default_tags
}

resource "azurerm_storage_account" "storage_account" {
  for_each                 = { for k, v in var.config : k => v if v["storage_account_name"] != "" }
  name                     = "stukwtsw${var.environment}${each.value.storage_account_name}dh"
  resource_group_name      = azurerm_resource_group.resource_group[each.key].name
  location                 = azurerm_resource_group.resource_group[each.key].location
  account_tier             = "Standard"
  account_replication_type = "GRS"
  tags                     = local.default_tags
}

resource "azurerm_storage_container" "container" {
  count                 = length([for k, v in var.config : v["containers"] if length(v["containers"]) > 0][0])
  name                  = [for k, v in var.config : v["containers"] if length(v["containers"]) > 0][0][count.index]
  storage_account_name  = azurerm_storage_account.storage_account[[for k, v in { for k, v in var.config : k => v["containers"] if length(v["containers"]) > 0 } : k][0]].name
  container_access_type = "private"
}