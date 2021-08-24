resource "azurerm_resource_group" "resource_group" {
  name     = "rg-${local.short_location}-${var.environment_prefix}-${var.app_name}"
  location = var.location
  tags     = merge(local.default_tags, var.tags)
}

resource "azurerm_storage_account" "artifact_storage" {
  count = local.is_development_env ? 0 : 1

  name                = "st${local.short_location}tsw${var.environment_prefix}artifacts"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name

  account_replication_type = "LRS"
  account_tier             = "Standard"
  account_kind             = "Storage"
  min_tls_version          = "TLS1_2"

  tags = merge(var.tags, local.default_tags)
}

resource "azurerm_storage_container" "artifact_container" {
  count = local.is_development_env ? 0 : 1

  name                 = var.environment_prefix
  storage_account_name = azurerm_storage_account.artifact_storage[0].name
}

resource "azurerm_storage_container" "test_artifact_container" {
  count = local.is_development_env ? 0 : 1

  name                 = "tests"
  storage_account_name = azurerm_storage_account.artifact_storage[0].name
}
