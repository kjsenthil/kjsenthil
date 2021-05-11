resource "azurerm_resource_group" "resource_group" {
  name     = "rg-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  location = var.location
  tags     = merge(local.default_tags, var.tags)
}

resource "azurerm_storage_account" "artifact_storage" {
  count = var.environment_prefix == "staging" ? 1 : var.environment_prefix == "prod" ? 1 : 0

  name                = "st${local.short_location}tsw${var.environment_prefix}artifacts"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name

  account_replication_type = "LRS"
  account_tier             = "Standard"
  account_kind             = "Storage"

  tags = merge(var.tags, local.default_tags)
}

resource "azurerm_storage_container" "artifact_container" {
  count = var.environment_prefix == "staging" ? 1 : var.environment_prefix == "prod" ? 1 : 0
  name                 = var.environment_prefix
  storage_account_name = azurerm_storage_account.artifact_storage[0].name
}

resource "azurerm_storage_container" "test_artifact_container" {
  count = var.environment_prefix == "staging" ? 1 : var.environment_prefix == "prod" ? 1 : 0
  name                 = "tests"
  storage_account_name = azurerm_storage_account.artifact_storage[0].name
}
