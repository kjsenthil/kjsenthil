// NSG Logs
resource "azurerm_storage_account" "nsg_logs" {
  name                     = "st${local.short_location}tsw${var.environment_prefix}dhnsglogs"
  resource_group_name      = data.azurerm_resource_group.resource_group.name
  location                 = data.azurerm_resource_group.resource_group.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
  min_tls_version          = "TLS1_2"
  tags                     = merge(var.tags, local.default_tags)
}

resource "azurerm_log_analytics_workspace" "log_analytics" {
  name                = "loganalytics${local.short_location}tsw${var.environment_prefix}dh"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location            = data.azurerm_resource_group.resource_group.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_network_watcher" "network_watcher" {
  count               = var.environment_prefix == "prod" || var.environment_prefix == "staging" ? 1 : 0
  name                = "nw${local.short_location}tsw${var.environment_prefix}dh"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location            = data.azurerm_resource_group.resource_group.location
}

resource "azurerm_network_watcher_flow_log" "nsg_flow_log" {
  count                = var.environment_prefix == "prod" || var.environment_prefix == "staging" ? 1 : 0
  network_watcher_name = azurerm_network_watcher.network_watcher[0].name
  resource_group_name  = data.azurerm_resource_group.resource_group.name

  network_security_group_id = azurerm_network_security_group.apim_security_group.id
  storage_account_id        = azurerm_storage_account.nsg_logs.id
  enabled                   = true

  retention_policy {
    enabled = true
    days    = 7
  }

  traffic_analytics {
    enabled               = true
    workspace_id          = azurerm_log_analytics_workspace.log_analytics.workspace_id
    workspace_region      = azurerm_log_analytics_workspace.log_analytics.location
    workspace_resource_id = azurerm_log_analytics_workspace.log_analytics.id
    interval_in_minutes   = 10
  }
}
